/**
 * Liquid Glass UI Plugin v1.2 (Scroll-Safe GPU Optimized)
 * Luz especular dinâmica leve sem filtros SVG de deslocamento ou reflows durante o scroll
 */
(function (window, document) {
  'use strict';

  const LiquidGlass = {
    init(selector = '.liquid-surface, .callout-pill, .photo-caption-bar, .visual-caption-badge') {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el.dataset.liquidBound) return;
        el.dataset.liquidBound = 'true';

        let rafId = null;
        el.addEventListener('mousemove', (e) => {
          // Evita getBoundingClientRect() enquanto a página está em rolagem ativa
          if (window.__lenis && window.__lenis.isScrolling) return;
          if (rafId) return;
          const clientX = e.clientX;
          const clientY = e.clientY;
          rafId = requestAnimationFrame(() => {
            rafId = null;
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--pill-mouse-x', `${clientX - rect.left}px`);
            el.style.setProperty('--pill-mouse-y', `${clientY - rect.top}px`);
          });
        }, { passive: true });

        el.addEventListener('mouseleave', () => {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          el.style.removeProperty('--pill-mouse-x');
          el.style.removeProperty('--pill-mouse-y');
        }, { passive: true });
      });
    }
  };

  window.LiquidGlass = LiquidGlass;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LiquidGlass.init());
  } else {
    LiquidGlass.init();
  }
})(window, document);
