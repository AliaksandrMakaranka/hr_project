export const preloadCriticalResources = () => {
  // Предзагрузка критических изображений
  const criticalImages = [
    '/images/logo.png',
    '/images/favicon.ico',
    // Добавьте другие критические изображения
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Предзагрузка критических шрифтов
  const criticalFonts = [
    '/fonts/main.woff2',
    // Добавьте другие критические шрифты
  ];

  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = font;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}; 