'use client';

import { useEffect, useRef } from 'react';

import cn from '@/lib/cn';

interface Vec {
  x: number;
  y: number;
  z: number;
}

interface BoxPrim {
  c: [number, number, number];
  h: [number, number, number];
  r: number;
  ang?: number;
  pivot?: [number, number, number];
}

// +y points DOWN on screen (syp = h/2 + y*R), so the shape is authored
// y-negated relative to how it reads visually: base slab, screen leaning
// back around a hinge pivot, and a shallow keyboard inset on the base.
const LAPTOP_PRIMS: BoxPrim[] = [
  { c: [0, 0.3, 0.22], h: [0.6, 0.025, 0.4], r: 0.02 },
  {
    c: [0, -0.42, 0],
    h: [0.6, 0.42, 0.015],
    r: 0.02,
    ang: -0.35,
    pivot: [0, 0.3, -0.18],
  },
  { c: [0, 0.26, 0.16], h: [0.45, 0.01, 0.18], r: 0.01 },
];

// The characters forming the cloud. A build-stable snippet of this very
// component's projection math (fn.toString() would change with minification).
const CHAR_SOURCE = `
  const cy = Math.cos(rotY), sy = Math.sin(rotY);
  const cx = Math.cos(rotX), sx = Math.sin(rotX);
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const x1 = p.x * cy - p.z * sy;
    const z1 = p.x * sy + p.z * cy;
    const y1 = p.y * cx - z1 * sx;
    const z2 = p.y * sx + z1 * cx;
    const persp = D / (D - z2);
    proj.push({ sxp: w / 2 + x1 * R * persp, syp: h / 2 + y1 * R * persp, z: z2 });
  }
  proj.sort((a, b) => a.z - b.z);
`;

// Pointer scatter field. Each character pushes off-axis by its own baked-in
// angle bias and strength, inside its own ragged field edge, so the gap the
// cursor opens never reads as a clean circle. The attack is three times
// faster than the release, which is what leaves a wake behind a moving
// pointer and makes the spread feel directional.
const REPEL_RADIUS_RATIO = 0.23; // × canvas CSS width
const REPEL_STRENGTH_RATIO = 0.2; // × canvas CSS width
const REPEL_CHAOS = 1;
const REPEL_WOBBLE = 1;
const REPEL_EASE_IN = 0.09;
const REPEL_EASE_OUT = 0.03;
const REPEL_FAN = 1.4; // ± radians of per-character angular bias
const REPEL_FALLOFF = 1.4;
const REPEL_SEED = 0x9E3779B9;

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toLocal(pr: BoxPrim, p: Vec): Vec {
  if (!pr.ang || !pr.pivot) {
    return p;
  }
  const py = p.y - pr.pivot[1];
  const pz = p.z - pr.pivot[2];
  const ca = Math.cos(pr.ang);
  const sa = Math.sin(pr.ang);
  return { x: p.x - pr.pivot[0], y: py * ca - pz * sa, z: py * sa + pz * ca };
}

function toWorld(pr: BoxPrim, p: Vec): Vec {
  if (!pr.ang || !pr.pivot) {
    return p;
  }
  const ca = Math.cos(pr.ang);
  const sa = Math.sin(pr.ang);
  return {
    x: p.x + pr.pivot[0],
    y: p.y * ca + p.z * sa + pr.pivot[1],
    z: -p.y * sa + p.z * ca + pr.pivot[2],
  };
}

function primSdf(pr: BoxPrim, wp: Vec) {
  const p = toLocal(pr, wp);
  const qx = Math.abs(p.x - pr.c[0]) - pr.h[0];
  const qy = Math.abs(p.y - pr.c[1]) - pr.h[1];
  const qz = Math.abs(p.z - pr.c[2]) - pr.h[2];
  return (
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0))
    + Math.min(Math.max(qx, Math.max(qy, qz)), 0)
    - pr.r
  );
}

function primArea(pr: BoxPrim) {
  return 8 * (pr.h[0] * pr.h[1] + pr.h[1] * pr.h[2] + pr.h[0] * pr.h[2]);
}

function primSample(pr: BoxPrim, rnd: () => number): Vec {
  const fa = [pr.h[1] * pr.h[2], pr.h[0] * pr.h[2], pr.h[0] * pr.h[1]];
  const tot = 2 * (fa[0] + fa[1] + fa[2]);
  let w = rnd() * tot;
  let ax = 0;
  while (w > 2 * fa[ax] && ax < 2) {
    w -= 2 * fa[ax];
    ax++;
  }
  const sgn = rnd() < 0.5 ? -1 : 1;
  const o = [
    (rnd() * 2 - 1) * pr.h[0],
    (rnd() * 2 - 1) * pr.h[1],
    (rnd() * 2 - 1) * pr.h[2],
  ];
  o[ax] = sgn * (pr.h[ax] + pr.r);
  return toWorld(pr, {
    x: pr.c[0] + o[0],
    y: pr.c[1] + o[1],
    z: pr.c[2] + o[2],
  });
}

function normalizePts(out: Vec[]) {
  let minX = 1e9;
  let maxX = -1e9;
  let minY = 1e9;
  let maxY = -1e9;
  let minZ = 1e9;
  let maxZ = -1e9;
  for (const p of out) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
    minZ = Math.min(minZ, p.z);
    maxZ = Math.max(maxZ, p.z);
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  let maxR = 0.0001;
  for (const p of out) {
    p.x -= cx;
    p.y -= cy;
    p.z -= cz;
    maxR = Math.max(maxR, Math.hypot(p.x, p.y, p.z));
  }
  for (const p of out) {
    p.x /= maxR;
    p.y /= maxR;
    p.z /= maxR;
  }
  return out;
}

function samplePoints(prims: BoxPrim[], n: number) {
  const rnd = mulberry32(1337);
  const areas = prims.map(primArea);
  const total = areas.reduce((s, a) => s + a, 0);
  const out: Vec[] = [];
  let guard = 0;
  while (out.length < n && guard < n * 20) {
    guard++;
    let pick = rnd() * total;
    let idx = 0;
    while (pick > areas[idx] && idx < prims.length - 1) {
      pick -= areas[idx];
      idx++;
    }
    const p = primSample(prims[idx], rnd);
    let dmin = 1e9;
    for (const pr of prims) {
      dmin = Math.min(dmin, primSdf(pr, p));
    }
    // keep only points on the outer surface of the union
    if (dmin > -0.02) {
      out.push(p);
    }
  }
  return normalizePts(out);
}

interface CodeLaptopProps {
  'className'?: string;
  'points'?: number;
  'baseFontSize'?: number;
  'speed'?: number;
  'aria-label'?: string;
}

export default function CodeLaptop({
  className,
  points = 1300,
  baseFontSize = 13,
  speed = 0.004,
  'aria-label': ariaLabel,
}: CodeLaptopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    const chars = CHAR_SOURCE.replace(/\s+/g, '').split('');
    // `samplePoints` consumes its own seeded stream by rejection sampling, so
    // the per-character scatter traits draw from a separate one.
    const rndRepel = mulberry32(REPEL_SEED);
    const pts = samplePoints(LAPTOP_PRIMS, points).map((p, i) => ({
      ...p,
      c: chars[i % chars.length],
      a1: rndRepel() * 2 - 1, // angle bias
      m1: 0.5 + rndRepel(), // push magnitude
      m2: rndRepel(), // ragged field edge
      ph: rndRepel() * 6.283, // wobble phase
      rx: 0, // screen-space offset, persists across frames
      ry: 0,
    }));

    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Tokens are bare HSL triplets, so fill styles must be composed with
    // hsl(); reading from documentElement, where next/font sets --font-mono.
    let colPrimary = '#000';
    let colAccent = '#7c3aed';
    let monoFont = 'monospace';
    const refreshColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const fg = cs.getPropertyValue('--foreground').trim();
      const pm = cs.getPropertyValue('--primary').trim();
      const mono = cs.getPropertyValue('--font-mono').trim();
      if (fg) {
        colPrimary = `hsl(${fg})`;
      }
      if (pm) {
        colAccent = `hsl(${pm})`;
      }
      if (mono) {
        monoFont = mono;
      }
    };
    refreshColors();

    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const D = 3.2;
    const punct = /[^A-Z0-9]/i;
    let rotY = 0.6;
    let rotX = 0.25;
    let velY = 0;
    let velX = 0;
    let dragging = false;
    let lastPX = 0;
    let lastPY = 0;
    let lastFont = '';
    let lastFill = '';
    let tNow = 0;
    let mx = -1e9;
    let my = -1e9;

    const drawScene = () => {
      const R = Math.min(W, H) * 0.45;
      const repelR = REPEL_RADIUS_RATIO * W;
      const repelK = REPEL_STRENGTH_RATIO * W;
      const repelOn = !rmQuery.matches;
      ctx.clearRect(0, 0, W, H);
      lastFont = '';
      lastFill = '';
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const proj = pts.map((p) => {
        const x1 = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y1 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const persp = D / (D - z2);
        let sxp = W / 2 + x1 * R * persp;
        let syp = H / 2 + y1 * R * persp;

        if (repelOn) {
          let tx = 0;
          let ty = 0;
          let ddx = sxp - mx;
          const ddy = syp - my;
          let d = Math.hypot(ddx, ddy);
          const rEff = repelR * (1 - 0.5 * REPEL_CHAOS * p.m2);
          if (d < rEff) {
            if (d < 0.001) {
              ddx = 1;
              d = 0.001;
            }
            const f = 1 - d / rEff;
            const ux = ddx / d;
            const uy = ddy / d;
            const ang = REPEL_CHAOS * p.a1 * REPEL_FAN;
            const ca = Math.cos(ang);
            const sa = Math.sin(ang);
            const push = repelK * f ** REPEL_FALLOFF * p.m1;
            tx = (ux * ca - uy * sa) * push;
            ty = (ux * sa + uy * ca) * push;
            const wb = REPEL_WOBBLE * repelK * 0.3 * f;
            tx += Math.sin(tNow * 0.0023 + p.ph) * wb;
            ty += Math.cos(tNow * 0.0019 + p.ph * 1.7) * wb;
          }
          const ease = tx !== 0 || ty !== 0 ? REPEL_EASE_IN : REPEL_EASE_OUT;
          p.rx += (tx - p.rx) * ease;
          p.ry += (ty - p.ry) * ease;
          sxp += p.rx;
          syp += p.ry;
        }

        return { sxp, syp, z: z2, c: p.c, k: persp };
      });
      proj.sort((a, b) => a.z - b.z);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const base = baseFontSize * (Math.min(W, H) / 640);
      for (const q of proj) {
        const fsz = Math.max(1.5, Math.round(base * q.k * 4) / 4);
        const fnt = `500 ${fsz}px ${monoFont}`;
        if (fnt !== lastFont) {
          ctx.font = fnt;
          lastFont = fnt;
        }
        const fil = punct.test(q.c) ? colAccent : colPrimary;
        if (fil !== lastFill) {
          ctx.fillStyle = fil;
          lastFill = fil;
        }
        ctx.fillText(q.c, q.sxp, q.syp);
      }
    };

    let visible = !document.hidden;
    let onScreen = true;
    let looping = false;
    let rafId = 0;

    const shouldLoop = () => visible && onScreen && !rmQuery.matches;
    const frame = (t: number) => {
      tNow = t;
      if (!shouldLoop()) {
        looping = false;
        return;
      }
      if (!dragging) {
        rotY += speed + velY;
        rotX += velX;
        velY *= 0.95;
        velX *= 0.95;
      }
      drawScene();
      rafId = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!looping && shouldLoop()) {
        looping = true;
        rafId = requestAnimationFrame(frame);
      }
      if (!shouldLoop()) {
        drawScene();
      }
    };

    const pointerDown = (px: number, py: number) => {
      dragging = true;
      lastPX = px;
      lastPY = py;
      canvas.style.cursor = 'grabbing';
    };
    const pointerMove = (px: number, py: number) => {
      if (!dragging) {
        return;
      }
      // inverted drag: the shape turns opposite to the pointer's travel
      velY = (lastPX - px) * 0.005;
      velX = (lastPY - py) * 0.005;
      rotY += velY;
      rotX += velX;
      lastPX = px;
      lastPY = py;
      if (!looping) {
        drawScene();
      }
    };
    const pointerUp = () => {
      dragging = false;
      canvas.style.cursor = 'grab';
    };

    const onMouseDown = (e: MouseEvent) => pointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => {
      // Tracked window-wide, and in canvas-local coordinates that go negative
      // outside it, so the field starts pushing just before the cursor lands.
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      pointerMove(e.clientX, e.clientY);
    };
    const onTouchStart = (e: TouchEvent) =>
      pointerDown(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) =>
      pointerMove(e.touches[0].clientX, e.touches[0].clientY);

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', pointerUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', pointerUp);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!looping) {
        drawScene();
      }
    });
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      refreshColors();
      if (!looping) {
        drawScene();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        start();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
      start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onMotionPrefChange = () => start();
    rmQuery.addEventListener('change', onMotionPrefChange);

    drawScene();
    start();

    return () => {
      cancelAnimationFrame(rafId);
      looping = false;
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      rmQuery.removeEventListener('change', onMotionPrefChange);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', pointerUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', pointerUp);
    };
  }, [points, baseFontSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'block size-full cursor-grab touch-none select-none',
        className,
      )}
    />
  );
}
