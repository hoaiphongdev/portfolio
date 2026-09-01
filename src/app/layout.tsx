import '@/styles/globals.css';

/**
 * The `[locale]` layout owns `<html>` and `<body>` so that `lang` reflects the
 * active locale. This root layout only exists so `app/not-found.tsx` has a
 * parent, and must therefore pass children straight through — emitting a second
 * `<html>`/`<body>` pair here would nest them and pin `lang` to a fixed value.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
