/**
 * PC & Mobile UX Suite Plugin v2.0 (High-Refresh 120Hz Scroll Optimized)
 * Inclui:
 * 1. Lenis Smooth Scroll Integration (100% contínuo no Desktop, sem interrupção em seções)
 * 2. Smart Scroll-Aware Bottom Bar (Restrito ao Mobile para zero reflow no Desktop)
 * 3. Touch Swipe Physics (Arrastar para o lado no Cardápio e Galeria do Salão)
 */
(function (window, document) {
  'use strict';

  function initSmoothScroll() {
    if (typeof window.Lenis === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const lenis = new window.Lenis({
      lerp: isMobile ? 0.12 : 0.105,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
      autoRaf: true,
      prevent: (node) => {
        if (!node || !node.closest) return false;
        // No Desktop, nenhuma seção vertical deve interromper o Lenis no wheel do mouse
        if (!isMobile) {
          return Boolean(node.closest('.mobile-nav-drawer'));
        }
        // No Mobile, apenas carrosséis horizontais explícitos e a gaveta usam scroll nativo isolado
        return Boolean(
          node.closest('.pillars-grid') ||
          node.closest('.menu-tabs-nav') ||
          node.closest('.mobile-nav-drawer')
        );
      }
    });

    // Conecta links de âncora (#cardapio, #espaco, etc.) ao Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -68 });
        }
      });
    });

    window.__lenis = lenis;
  }

  function initSmartMobileBar() {
    // Executa apenas em telas mobile (evita chamadas getBoundingClientRect no scroll do Desktop)
    const mqMobile = window.matchMedia('(max-width: 768px)');
    if (!mqMobile.matches) return;

    const mobileBar = document.querySelector('.mobile-liquid-bar');
    const heroSection = document.querySelector('.hero-section');
    const footerSection = document.querySelector('.site-footer');
    if (!mobileBar || !heroSection) return;

    let isCurrentlyVisible = false;
    let ticking = false;

    const updateBarVisibility = () => {
      ticking = false;
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const footerTop = footerSection ? footerSection.getBoundingClientRect().top : Infinity;
      const viewportH = window.innerHeight;

      const shouldShow = heroBottom < viewportH * 0.45 && footerTop > viewportH * 0.85;
      if (shouldShow !== isCurrentlyVisible) {
        isCurrentlyVisible = shouldShow;
        mobileBar.classList.toggle('is-visible', shouldShow);
      }
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateBarVisibility);
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    updateBarVisibility();
  }

  function initTouchSwipePhysics() {
    // 1. Swipe Horizontal entre Abas do Cardápio
    const panelsWrap = document.querySelector('.menu-tab-panels-wrap');
    const tabOrder = ['tab-assinatura', 'tab-espressos', 'tab-coados', 'tab-confeitaria', 'tab-ritual'];

    if (panelsWrap && typeof window.switchMenuTab === 'function') {
      let startX = 0;
      let startY = 0;

      panelsWrap.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      panelsWrap.addEventListener('touchend', (e) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;

        // Verifica se foi um swipe horizontal intencional
        if (Math.abs(diffX) > 65 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
          const activePanel = panelsWrap.querySelector('.menu-tab-panel.active');
          if (!activePanel) return;
          const currentIndex = tabOrder.indexOf(activePanel.id);
          if (currentIndex === -1) return;

          if (diffX < 0 && currentIndex < tabOrder.length - 1) {
            window.switchMenuTab(tabOrder[currentIndex + 1]);
          } else if (diffX > 0 && currentIndex > 0) {
            window.switchMenuTab(tabOrder[currentIndex - 1]);
          }
        }
      }, { passive: true });
    }

    // 2. Swipe Horizontal nas Fotos do Salão
    const spaceViewport = document.querySelector('.space-photo-viewport');
    if (spaceViewport && typeof window.activateSpace === 'function') {
      let startX = 0;
      let startY = 0;

      spaceViewport.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      spaceViewport.addEventListener('touchend', (e) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;

        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
          const slides = Array.from(spaceViewport.querySelectorAll('.space-photo-slide'));
          const activeIdx = slides.findIndex((s) => s.classList.contains('active'));
          if (activeIdx === -1) return;

          if (diffX < 0) {
            window.activateSpace((activeIdx + 1) % slides.length);
          } else {
            window.activateSpace((activeIdx - 1 + slides.length) % slides.length);
          }
        }
      }, { passive: true });
    }
  }

  function boot() {
    initSmoothScroll();
    initSmartMobileBar();
    initTouchSwipePhysics();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
