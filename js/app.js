/**
 * ==========================================
 * JOYFRUITS - MAIN APPLICATION
 * ==========================================
 * Sve JavaScript funkcionalnosti sajta
 */

// Glavna inicijalizacija nakon učitavanja sekcija
function initApp() {
  console.log('🎯 Initializing JoyFruits app...');
  
  initYear();
  initScrollProgress();
  initRevealAnimations();
  // initShutter(); // ПРИВРЕМЕНО ИСКЉУЧЕНО
  initSlider();
  initMobileMenu();
  init3DBottle();
  initSmoothScroll();
  initConfetti();
  initBottleImageFallback();
  initCountingAnimation();
  initNewsletter();
  initLazyVideos();
  initMediaOptimization();
  
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
  
  // Не чувамо у sessionStorage - приказујемо сваки пут
  // if (sessionStorage.getItem('shutterPlayed')) {
  //   shutter.remove();
  //   return;
  // }
  
  const panels = shutter.querySelectorAll('.shutter__panel');
  const lastPanel = panels[panels.length - 1];
  
  // Чекамо да се комплетно заврши анимација (3.5s укупно)
  setTimeout(() => {
    shutter.style.opacity = '0';
    shutter.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
      shutter.remove();
      // sessionStorage.setItem('shutterPlayed', '1');
    }, 500);
  }, 3500);
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
// Disabled - using custom product images instead
function initBottleImageFallback() {
  // Function disabled - keeping hero image as set in HTML
  console.log('✅ Using custom hero image');
  return;
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

// ============ NEWSLETTER FAKE SUBMIT ============
function initNewsletter() {
  const btn = document.getElementById('newsletterBtn');
  const input = document.getElementById('newsletterEmail');
  const form = document.getElementById('newsletterForm');
  const success = document.getElementById('newsletterSuccess');
  const label = document.getElementById('newsletterLabel');
  
  if (!btn || !input) return;
  
  btn.addEventListener('click', () => {
    const email = input.value.trim();
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      input.style.borderColor = '#FF8C00';
      input.placeholder = 'Please enter a valid email';
      setTimeout(() => {
        input.style.borderColor = '';
        input.placeholder = 'Your email';
      }, 2000);
      return;
    }
    
    // Show success message
    form.classList.add('hidden');
    label.classList.add('hidden');
    success.classList.remove('hidden');
    
    // Optional: Log email (you can collect these later)
    console.log('Newsletter signup:', email);
  });
  
  // Submit on Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      btn.click();
    }
  });
}

// ============ LAZY LOAD VIDEOS ============
function initLazyVideos() {
  const videos = document.querySelectorAll('video[preload="metadata"]');
  
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          // Load video when it comes into view
          if (video.readyState === 0) {
            video.load();
          }
          videoObserver.unobserve(video);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    videos.forEach(video => videoObserver.observe(video));
  } else {
    // Fallback for browsers without IntersectionObserver
    videos.forEach(video => video.load());
  }
}

// ============ MEDIA OPTIMIZATION ============
function initMediaOptimization() {
  // Optimize images with lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    }, { once: true });
  });
  
  // Pause videos when not in viewport
  const videos = document.querySelectorAll('video');
  if ('IntersectionObserver' in window) {
    const videoPlayObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    }, {
      threshold: 0.5
    });
    
    videos.forEach(video => {
      videoPlayObserver.observe(video);
      
      // Optimize video playback
      video.addEventListener('play', () => {
        videos.forEach(otherVideo => {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
          }
        });
      });
    });
  }
  
  // Preconnect to video sources
  const videoSources = new Set();
  videos.forEach(video => {
    const source = video.querySelector('source');
    if (source) {
      const url = new URL(source.src, window.location.href);
      videoSources.add(url.origin);
    }
  });
  
  // Add preconnect links for better performance
  videoSources.forEach(origin => {
    if (origin !== window.location.origin) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      document.head.appendChild(link);
    }
  });
  
  console.log('📹 Media optimization initialized');
}

// ============ SUPPRESS IMAGE ERRORS ============
window.addEventListener('error', (e) => {
  if (e.target && e.target.tagName === 'IMG') {
    e.preventDefault();
  }
}, true);
