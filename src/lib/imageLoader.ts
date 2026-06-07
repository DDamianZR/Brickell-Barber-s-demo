interface ImageLoaderProps {
  src: string;
  width?: number;
  quality?: number;
}

/**
 * Custom Next.js image loader para GitHub Pages.
 * Antepone el basePath a todas las imágenes locales para que
 * funcionen correctamente con output: 'export' y basePath configurado.
 */
export default function imageLoader({ src }: ImageLoaderProps): string {
  // Imágenes externas o data URIs — no modificar
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("//")) {
    return src;
  }
  // Imágenes locales: anteponer basePath
  return `/Brickell-Barber-s-demo${src}`;
}
