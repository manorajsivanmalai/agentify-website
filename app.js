// Agentify Web App Interactivity

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initProductCarousel();
  initFeaturesCarousel();
  initCopyAddress();
  initNavScroll();
  initMobileMenu();
});

// 1. Futuristic Background Canvas Particle Animation
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

// 2. Product Showcase Carousel Data & Logic
const productItems = [
  {
    title: "AGENT CREATION",
    paragraphs: [
      "This module is a developer-centric kit for custom AI agents to interact with smart contracts easily. De-composing the smart contract ecosystem and agent creation into simple building blocks and intuitive user interfaces.",
      "Eliminates the need for manual coding, making agent creation simple and accessible for both developers and non-technical users."
    ]
  },
  {
    title: "SMART CONTRACT AUTOMATION",
    paragraphs: [
      "Automate complex multi-step DeFi transactions, cross-chain yield farming, and governance voting using autonomous AI triggers.",
      "Ensures zero-downtime execution with cryptographically verified smart contract execution logic."
    ]
  },
  {
    title: "MARKETPLACE UI",
    paragraphs: [
      "Browse, hire, and integrate verified AI agents created by global developers with transparent performance analytics.",
      "Monetize custom agents instantly through tokenized subscriptions and revenue sharing."
    ]
  },
  {
    title: "CROSS-CHAIN ORACLE HUB",
    paragraphs: [
      "Real-time state verification and cross-chain messaging connecting EVM & non-EVM blockchains seamlessly.",
      "Provides low-latency decentralized data feeds tailored for AI-agent autonomous decision loops."
    ]
  }
];

function initProductCarousel() {
  let currentIndex = 0;
  const badgeEl = document.getElementById('product-title-badge');
  const containerEl = document.getElementById('product-description-container');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('prev-product-btn');
  const nextBtn = document.getElementById('next-product-btn');

  function updateSlide(index) {
    currentIndex = index;
    const data = productItems[currentIndex];

    if (badgeEl) badgeEl.textContent = data.title;
    if (containerEl) containerEl.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');

    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateSlide(idx));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + productItems.length) % productItems.length;
      updateSlide(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % productItems.length;
      updateSlide(newIndex);
    });
  }
}

// 3. Features Section Carousel for Mobile
function initFeaturesCarousel() {
  const featureCards = document.querySelectorAll('.features-grid .feature-card-wrap');
  const prevBtn = document.getElementById('prev-feature-btn');
  const nextBtn = document.getElementById('next-feature-btn');
  let currentFeatureIndex = 0;

  function renderFeatures() {
    if (window.innerWidth <= 768) {
      featureCards.forEach((card, index) => {
        if (index === currentFeatureIndex) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    } else {
      featureCards.forEach(card => {
        card.style.display = 'block';
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentFeatureIndex = (currentFeatureIndex - 1 + featureCards.length) % featureCards.length;
      renderFeatures();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentFeatureIndex = (currentFeatureIndex + 1) % featureCards.length;
      renderFeatures();
    });
  }

  window.addEventListener('resize', renderFeatures);
  renderFeatures();
}

// 4. Copy Contract Address
function initCopyAddress() {
  const copyBtn = document.getElementById('copy-btn');
  const fullAddress = "0x71F84c982390234a9B489230582030048293a9B4";
  const toast = document.getElementById('toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(fullAddress);
        showToast("Contract address copied to clipboard!");
      } catch (err) {
        showToast("Address: " + fullAddress);
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    const toastText = document.getElementById('toast-text');
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// 5. Smooth Nav Active Link Update on Scroll
function initNavScroll() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.frame-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 6. Mobile Menu Toggle Listener
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}
