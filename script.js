/* ===================================
   WHISPR – JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Menu Toggle ----------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add solid background on scroll
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(26, 14, 10, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(26, 14, 10, 0.85)';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ---------- Smooth Scroll for Nav Links ----------
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Intersection Observer – Fade In Animations ----------
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class to animatable elements
  const animElements = document.querySelectorAll(
    '.feature-card, .creator-card, .section-heading, .section-text, .cta-heading, .cta-text, .cta-buttons'
  );

  animElements.forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
  });

  // Inject animation styles
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .feature-card.fade-in { transition-delay: 0.1s; }
    .feature-card.fade-in:nth-child(2) { transition-delay: 0.2s; }
    .feature-card.fade-in:nth-child(3) { transition-delay: 0.3s; }
    .creator-card.fade-in { transition-delay: 0.1s; }
    .creator-card.fade-in:nth-child(2) { transition-delay: 0.2s; }
    .creator-card.fade-in:nth-child(3) { transition-delay: 0.3s; }
    .creator-card.fade-in:nth-child(4) { transition-delay: 0.4s; }
  `;
  document.head.appendChild(style);

  // ---------- Hero Text Animation on Load ----------
  const heroHeading = document.querySelector('.hero-heading');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const statsCard = document.querySelector('.stats-card');

  if (heroHeading) {
    heroHeading.style.opacity = '0';
    heroHeading.style.transform = 'translateY(40px)';
    heroHeading.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    setTimeout(() => {
      heroHeading.style.opacity = '1';
      heroHeading.style.transform = 'translateY(0)';
    }, 200);
  }

  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(30px)';
    heroSubtitle.style.transition = 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s';

    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 200);
  }

  if (statsCard) {
    statsCard.style.opacity = '0';
    statsCard.style.transform = 'translateY(40px) scale(0.95)';
    statsCard.style.transition = 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s';

    setTimeout(() => {
      statsCard.style.opacity = '1';
      statsCard.style.transform = 'translateY(0) scale(1)';
    }, 200);
  }

  // ---------- Counter Animation for 100K+ ----------
  const statsNumber = document.querySelector('.stats-number');
  if (statsNumber) {
    let counted = false;
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounter(statsNumber, 0, 100, 1500);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countObserver.observe(statsNumber);
  }

  function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);

      element.textContent = current + 'K+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

});

