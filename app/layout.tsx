import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Predicciones Deportivas',
  description: 'Predicciones de partidos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
