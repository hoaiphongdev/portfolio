/**
 * Color palette registry — the single source of truth for palette ids.
 *
 * Adding a palette:
 * 1. Add an entry here (preview = the palette's primary color per mode).
 * 2. Add a `[data-palette='<id>']` + `.dark[data-palette='<id>']` block pair
 *    in `src/styles/globals.css` (see the invariant comment there).
 * 3. Add `common.palette.<id>` to `locales/en.json` and `locales/vi.json`.
 */
export const PALETTE_STORAGE_KEY = 'palette';

export const DEFAULT_PALETTE = 'violet';

export const PALETTES = [
  {
    id: 'violet',
    preview: { light: 'hsl(262 83% 58%)', dark: 'hsl(255 92% 76%)' },
  },
  {
    id: 'sapphire',
    preview: { light: 'hsl(221 83% 45%)', dark: 'hsl(217 91% 70%)' },
  },
  {
    id: 'cyan',
    preview: { light: 'hsl(192 91% 30%)', dark: 'hsl(190 85% 62%)' },
  },
  {
    id: 'emerald',
    preview: { light: 'hsl(158 84% 28%)', dark: 'hsl(156 65% 60%)' },
  },
  {
    id: 'lime',
    preview: { light: 'hsl(84 74% 28%)', dark: 'hsl(84 70% 62%)' },
  },
  {
    id: 'amber',
    preview: { light: 'hsl(38 92% 42%)', dark: 'hsl(43 96% 62%)' },
  },
  {
    id: 'sunset',
    preview: { light: 'hsl(18 88% 42%)', dark: 'hsl(22 95% 65%)' },
  },
  {
    id: 'rose',
    preview: { light: 'hsl(347 77% 47%)', dark: 'hsl(350 90% 72%)' },
  },
  {
    id: 'orchid',
    preview: { light: 'hsl(293 72% 43%)', dark: 'hsl(291 80% 72%)' },
  },
  {
    id: 'graphite',
    preview: { light: 'hsl(240 6% 20%)', dark: 'hsl(240 6% 88%)' },
  },
] as const;

export type PaletteId = (typeof PALETTES)[number]['id'];

export function isPaletteId(value: unknown): value is PaletteId {
  return PALETTES.some(palette => palette.id === value);
}
