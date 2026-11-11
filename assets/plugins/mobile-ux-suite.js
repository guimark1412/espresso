/**
 * PC & Mobile UX Suite Plugin v1.0
 * Inclui:
 * 1. Lenis Smooth Scroll Integration
 * 2. Vanilla-Tilt 3D Cards & Glare (Desktop)
 * 3. Smart Scroll-Aware Bottom Bar (Evita colisão com botões do Hero no Mobile)
 * 4. Touch Swipe Physics (Arrastar para o lado no Cardápio e Galeria do Salão)
 * 5. Scroll Reveal Suave
 */
(function (window, document) {
  'use strict';

  function initSmoothScroll() {
    if (typeof window.Lenis === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const lenis = new window.Lenis({
      lerp: isMobile ? 0.11 : 0.09,
      duration: isMobile ? 1.0 : 1.1,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.12,
      touchMultiplier: 1.0,
      wheelMultiplier: 1,
      prevent: (node) => Boolean(
        node && node.closest && (
          node.closest('.pillars-grid') || 
          node.closest('.pillars-section') || 
          node.closest('.menu-tabs-bar') || 
          node.closest('.menu-tabs-nav') || 
          node.closest('.menu-tabs-sticky-wrap') || 
          node.closest('.menu-tab-panels-wrap') || 
          node.closest('.space-photo-viewport') || 
          node.closest('.mobile-nav-drawer')
        )
      )
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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

  function init3DTilt() {
    if (typeof window.VanillaTilt === 'undefined') return;
    // Aplica 3D Tilt apenas em dispositivos com mouse fino (PC/Desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const tiltTargets = document.querySelectorAll('.callout-pill, .visual-photo-frame, .notebook-card');
    if (tiltTargets.length > 0) {
      window.VanillaTilt.init(Array.from(tiltTargets), {
        max: 4,
        speed: 450,
        glare: true,
        'max-glare': 0.14,
        scale: 1.01
      });
    }
  }

  function initSmartMobileBar() {
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

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    // Anima apenas blocos verticais da página; nunca elementos de carrosséis horizontais (para não flutuarem durante o swipe no mobile)
    const revealEls = document.querySelectorAll('.editorial-item, .notebook-card, .space-trigger-card');
    revealEls.forEach((el) => {
      el.style.transition = 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        observer.observe(el);
      }
    });
  }

  function boot() {
    initSmoothScroll();
    init3DTilt();
    initSmartMobileBar();
    initTouchSwipePhysics();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
