/**
 * ==========================================
 * MANGO SPIRIT - MAIN APPLICATION
 * ==========================================
 * Sve JavaScript funkcionalnosti sajta
 */

// Glavna inicijalizacija nakon učitavanja sekcija
function initApp() {
  console.log('🎯 Initializing Mango Spirit app...');
  
  initYear();
  initScrollProgress();
  initRevealAnimations();
  initShutter();
  initSlider();
  initMobileMenu();
  init3DBottle();
  initSmoothScroll();
  initConfetti();
  initBottleImageFallback();
  initCountingAnimation();
  
  console.log('✅ App initialized successfully!');
}

// ============ YEAR ============
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============ SCROLL PROGRESS BAR ============
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight);
    progressBar.style.transform = `scaleX(${scrolled})`;
  }, { passive: true });
}

// ============ REVEAL ANIMATIONS ============
function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============ LOADING SHUTTER ============
function initShutter() {
  const shutter = document.getElementById('shutter');
  if (!shutter) return;
  
  if (sessionStorage.getItem('shutterPlayed')) {
    shutter.remove();
    return;
  }
  
  const panels = shutter.querySelectorAll('.shutter__panel');
  const lastPanel = panels[panels.length - 1];
  
  lastPanel.addEventListener('animationend', () => {
    shutter.remove();
    sessionStorage.setItem('shutterPlayed', '1');
  }, { once: true });
}

// ============ IMAGE SLIDER ============
function initSlider() {
  const slider = document.getElementById('voyageSlider');
  if (!slider) return;
  
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('voyageDots');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  
  let currentSlide = 0;
  let autoplayTimer = null;
  let isHovering = false;
  const AUTOPLAY_DELAY = 5000;
  
  // Initialize dots
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${index === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  function goToSlide(index) {
    const prevIndex = currentSlide;
    currentSlide = (index + slides.length) % slides.length;
    
    slides[prevIndex]?.classList.remove('is-active');
    slides[currentSlide]?.classList.add('is-active');
    
    const dots = dotsContainer?.querySelectorAll('.slider-dot');
    dots?.[prevIndex]?.classList.remove('is-active');
    dots?.[currentSlide]?.classList.add('is-active');
    
    if (!isHovering) restartAutoplay();
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }
  
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  slider.addEventListener('mouseenter', () => {
    isHovering = true;
    stopAutoplay();
  });
  
  slider.addEventListener('mouseleave', () => {
    isHovering = false;
    startAutoplay();
  });
  
  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
  
  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  slider.tabIndex = 0;
  
  // Start autoplay
  startAutoplay();
}

// ============ MOBILE MENU ============
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuLinks = mobileMenu?.querySelectorAll('a');
  
  function openMenu() {
    mobileMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  
  menuLinks?.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 300);
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMenu();
    }
  });
}

// ============ 3D BOTTLE EFFECT ============
function init3DBottle() {
  const bottleContainer = document.getElementById('bottleContainer');
  if (!bottleContainer) return;
  
  bottleContainer.addEventListener('mousemove', (e) => {
    const rect = bottleContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    const bottle = bottleContainer.querySelector('.bottle-3d');
    if (bottle) {
      bottle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
  });
  
  bottleContainer.addEventListener('mouseleave', () => {
    const bottle = bottleContainer.querySelector('.bottle-3d');
    if (bottle) {
      bottle.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============ CONFETTI EFFECT ============
function initConfetti() {
  const ctaBtn = document.getElementById('cta');
  if (!ctaBtn) return;
  
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9998';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  ctaBtn.addEventListener('click', (e) => {
    const rect = ctaBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createConfetti(x, y);
  });
  
  function createConfetti(x, y) {
    const colors = ['#D4AF37', '#B8860B', '#FF8C00', '#FFD700'];
    const particles = [];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 1.2) * 10,
        gravity: 0.25,
        alpha: 1,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    
    let frame = 0;
    
    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.99;
        p.rotation += p.rotationSpeed;
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        ctx.restore();
      });
      
      if (frame < 200) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    animate();
  }
}

// ============ BOTTLE IMAGE FALLBACK ============
function initBottleImageFallback() {
  const el = document.getElementById('bottleImg');
  if (!el) return;
  
  const candidates = [
    './Mango.png','./mango.png',
    './assets/bottles/Mango.png','./assets/bottles/mango.png',
    './assets/Mango.png','./assets/mango.png',
    '/Mango.png','/mango.png','/assets/bottles/Mango.png','/assets/Mango.png'
  ];
  
  const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(`<?xml version='1.0'?>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 900'>
    <defs>
        <linearGradient id='bottleGrad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%23FFE5B4'/>
          <stop offset='50%' stop-color='%23FFDAB9'/>
          <stop offset='100%' stop-color='%23F4A460'/>
      </linearGradient>
        <filter id='glow'><feGaussianBlur stdDeviation='4'/></filter>
    </defs>
      <rect x='80' y='60' width='240' height='720' rx='60' fill='url(%23bottleGrad)' stroke='%23D4AF37' stroke-width='3'/>
      <rect x='140' y='10' width='120' height='70' rx='15' fill='%23B8860B'/>
      <circle cx='200' cy='45' r='8' fill='%23FFD700'/>
      <text x='200' y='420' font-family='Playfair Display,serif' font-weight='700' font-size='72' text-anchor='middle' fill='%23FFFFFF' opacity='0.9'>M</text>
      <text x='200' y='520' font-family='Inter,sans-serif' font-weight='600' font-size='32' text-anchor='middle' fill='%23FFFFFF' opacity='0.85'>SPIRIT</text>
      <circle cx='200' cy='600' r='80' fill='none' stroke='%23FFFFFF' stroke-width='2' opacity='0.3'/>
  </svg>`);
  
  function tryNext(i) {
    if (i >= candidates.length) { 
      el.src = FALLBACK; 
      return; 
    }
    const test = new Image();
    test.onload = () => { el.src = candidates[i]; };
    test.onerror = () => tryNext(i + 1);
    test.src = candidates[i];
  }
  
  el.addEventListener('error', () => tryNext(1), { once: true });
  tryNext(0);
}

// ============ COUNTING ANIMATION (Stats) ============
function initCountingAnimation() {
  const stats = document.querySelectorAll('.text-3xl, .text-4xl');
  if (!stats.length) return;
  
  const animatedStats = new Set();
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats.has(entry.target)) {
        animatedStats.add(entry.target);
        animateNumber(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => {
    const text = stat.textContent.trim();
    // Detektuj samo brojeve (500+, 15+, 100%, 40%, 700ml)
    if (/^\d+[+%]?$|^\d+ml$/.test(text)) {
      observer.observe(stat);
    }
  });
}

function animateNumber(element) {
  const text = element.textContent.trim();
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  const hasMl = text.includes('ml');
  
  const targetNumber = parseInt(text.replace(/[+%ml]/g, ''));
  const duration = 2000; // 2 sekunde
  const frameRate = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameRate);
  const increment = targetNumber / totalFrames;
  
  let currentNumber = 0;
  let frame = 0;
  
  const counter = setInterval(() => {
    frame++;
    currentNumber += increment;
    
    if (frame >= totalFrames) {
      currentNumber = targetNumber;
      clearInterval(counter);
    }
    
    let displayValue = Math.floor(currentNumber);
    
    if (hasPlus) displayValue += '+';
    if (hasPercent) displayValue += '%';
    if (hasMl) displayValue += 'ml';
    
    element.textContent = displayValue;
  }, frameRate);
}

// ============ SUPPRESS IMAGE ERRORS ============
window.addEventListener('error', (e) => {
  if (e.target && e.target.tagName === 'IMG') {
    e.preventDefault();
  }
}, true);
