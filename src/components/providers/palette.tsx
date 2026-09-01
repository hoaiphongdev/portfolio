'use client';

import * as React from 'react';

import type { PaletteId } from '@/constants/palettes';
import {
  DEFAULT_PALETTE,
  isPaletteId,
  PALETTE_STORAGE_KEY,
} from '@/constants/palettes';

interface PaletteContextValue {
  palette: PaletteId;
  setPalette: (id: PaletteId) => void;
}

const PaletteContext = React.createContext<PaletteContextValue | null>(null);

function applyPaletteAttribute(id: PaletteId) {
  if (id === DEFAULT_PALETTE) {
    document.documentElement.removeAttribute('data-palette');
  } else {
    document.documentElement.setAttribute('data-palette', id);
  }
}

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = React.useState<PaletteId>(DEFAULT_PALETTE);

  // The inline script in the locale layout already applied the stored palette
  // before first paint; this only syncs React state (and sanitizes stale ids
  // left behind by removed palettes).
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(PALETTE_STORAGE_KEY);

      if (isPaletteId(stored)) {
        setPaletteState(stored);
      } else if (stored !== null) {
        localStorage.removeItem(PALETTE_STORAGE_KEY);
        document.documentElement.removeAttribute('data-palette');
      }
    } catch {
      // localStorage unavailable — keep the default palette.
    }
  }, []);

  const setPalette = React.useCallback((id: PaletteId) => {
    setPaletteState(id);
    applyPaletteAttribute(id);

    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, id);
    } catch {
      // Persistence is best-effort; the palette still applies for the session.
    }
  }, []);

  const value = React.useMemo(
    () => ({ palette, setPalette }),
    [palette, setPalette],
  );

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  );
}

export function usePalette(): PaletteContextValue {
  const context = React.useContext(PaletteContext);

  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }

  return context;
}
