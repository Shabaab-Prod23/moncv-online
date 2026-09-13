/**
 * CV DIGITAL CINÉMATIQUE & INTERACTIF — SOULEYMANE
 * Script Principal & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Curseur Lumineux (Desktop)
  initCursorGlow();

  // 2. Toile de Fond Animée (Particules & Réseau Cyber)
  initAmbientCanvas();

  // 3. Navigation Défilement & Scrollspy
  initNavigation();

  // 4. Compteurs Animés de Statistiques
  initCounters();

  // 5. Filtres des Compétences
  initSkillsFilter();

  // 6. Barres de Progression Animées
  initProgressBars();

  // 7. Actions de Copie & Notifications Toast
  initClipboard();

  // 8. Gestionnaire du Formulaire de Contact
  initContactForm();

  // 9. Impression / Exportation en PDF
  initPrintExport();
});

/* ==========================================================================
   1. CURSEUR LUMINEUX
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(renderGlow);
  }
  renderGlow();
}

/* ==========================================================================
   2. CANVAS DE PARTICULES & RÉSEAU CYBER-LUXE
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 25 : 55;
  const maxDistance = 140;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.8 + 0.8;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.color = Math.random() > 0.3 ? '0, 242, 254' : '246, 200, 120';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ==========================================================================
   3. NAVIGATION, HEADER SCROLL & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Effet d'en-tête transparent -> flouté au scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy actif
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Menu Mobile Toggle & Close
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  function openMobileMenu() {
    if (mobileToggle) mobileToggle.classList.add('open');
    if (mobileMenu) mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileToggle) mobileToggle.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }
}

/* ==========================================================================
   4. STATISTIQUES ANIMÉES AU DÉFILEMENT
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const timer = setInterval(() => {
          count += 1;
          entry.target.textContent = count;
          if (count >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
          }
        }, stepTime);

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   5. FILTRE DES COMPÉTENCES INTERACTIF
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Bouton actif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. ANIMATION DES BARRES DE PROGRESSION
   ========================================================================== */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  if (!progressBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => {
          entry.target.style.width = targetWidth;
        }, 100);
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   7. COPIE PRESSE-PAPIER & NOTIFICATIONS TOAST
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initClipboard() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailVal = document.getElementById('emailVal');

  function copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Email copié dans le presse-papier : ${text}`);
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(`Email copié : ${text}`);
  }

  if (copyEmailBtn && emailVal) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailVal.getAttribute('data-copy') || emailVal.textContent.trim();
      copyText(email);
    });

    emailVal.addEventListener('click', () => {
      const email = emailVal.getAttribute('data-copy') || emailVal.textContent.trim();
      copyText(email);
    });
  }
}

/* ==========================================================================
   8. FORMULAIRE DE CONTACT
   ========================================================================== */
function initContactForm() {
  window.handleFormSubmit = function() {
    const submitBtn = document.getElementById('submitFormBtn');
    const feedback = document.getElementById('formFeedback');
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('userName');

    if (!form || !submitBtn || !feedback) return;

    // Simulation d'envoi avec état de chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmission en cours...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Envoyer le Message</span> <i class="fa-solid fa-paper-plane"></i>`;
      
      const clientName = nameInput.value.trim() || "Cher Visiteur";
      feedback.className = "form-feedback success";
      feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Merci <strong>${clientName}</strong> ! Votre message a été simulé avec succès. Souleymane vous répondra dans les plus brefs délais.`;
      
      showToast("Message envoyé avec succès !");
      form.reset();
    }, 1200);
  };
}

/* ==========================================================================
   9. IMPRESSION & EXPORT PDF
   ========================================================================== */
function initPrintExport() {
  const printCvBtn = document.getElementById('printCvBtn');
  const heroPrintBtn = document.getElementById('heroPrintBtn');

  const handlePrint = () => {
    showToast("Préparation de la version imprimable du CV...");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  if (printCvBtn) printCvBtn.addEventListener('click', handlePrint);
  if (heroPrintBtn) heroPrintBtn.addEventListener('click', handlePrint);
}
