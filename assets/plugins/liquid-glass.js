/**
 * Liquid Glass UI Plugin v1.0
 * Efeito óptico de vidro líquido, refração SVG e luz especular dinâmica (PC & Mobile)
 */
(function (window, document) {
  'use strict';

  const LiquidGlass = {
    init(selector = '.liquid-surface, .callout-pill, .photo-caption-bar, .visual-caption-badge, .mobile-liquid-bar') {
      // Em celulares e telas sem mouse fino, evita filtros SVG pesados de deslocamento e cálculos de layout no touchmove
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      // Injeta o filtro SVG de refração óptica caso ainda não exista no DOM
      if (!document.getElementById('liquid-glass-svg-filter')) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'liquid-glass-svg-filter';
        svg.setAttribute('aria-hidden', 'true');
        svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;';
        svg.innerHTML = `
          <defs>
            <filter id="liquid-refraction-lens" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        `;
        document.body.appendChild(svg);
      }

      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el.dataset.liquidBound) return;
        el.dataset.liquidBound = 'true';

        const updateLight = (clientX, clientY) => {
          const rect = el.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          el.style.setProperty('--pill-mouse-x', `${x}px`);
          el.style.setProperty('--pill-mouse-y', `${y}px`);
        };

        el.addEventListener('mousemove', (e) => updateLight(e.clientX, e.clientY), { passive: true });
        el.addEventListener('mouseleave', () => {
          el.style.removeProperty('--pill-mouse-x');
          el.style.removeProperty('--pill-mouse-y');
        }, { passive: true });

        el.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches.length > 0) {
            updateLight(e.touches[0].clientX, e.touches[0].clientY);
          }
        }, { passive: true });

        el.addEventListener('touchend', () => {
          setTimeout(() => {
            el.style.removeProperty('--pill-mouse-x');
            el.style.removeProperty('--pill-mouse-y');
          }, 250);
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
