// ===== FAQ TOGGLE =====
function toggleFaq(id) {
  const item = document.getElementById(id);
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

// ===== SMOOTH SCROLL FOR ALL CTA BUTTONS =====
document.querySelectorAll('a[href="#buy-now"], a[href="#buyButton"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('buy-now').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// ===== SCROLL ANIMATION — Fade in sections on scroll =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animate class to elements
const animateEls = document.querySelectorAll(
  '.pain-card, .chapter-card, .testimonial-card, .faq-item, .who-yes, .who-no'
);

animateEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  observer.observe(el);
});

// When visible
const visibleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

animateEls.forEach(el => visibleObserver.observe(el));

// ===== COUNTDOWN TIMER (urgency) =====
function createCountdown() {
  // Set timer to end of day + some hours for urgency
  const stored = localStorage.getItem('aib_countdown');
  let endTime;
  if (stored) {
    endTime = parseInt(stored);
  } else {
    // 23 hours from now
    endTime = Date.now() + (23 * 60 * 60 * 1000);
    localStorage.setItem('aib_countdown', endTime);
  }

  // Inject countdown into urgency bar
  const urgencyBar = document.querySelector('.urgency-bar');
  if (!urgencyBar) return;

  const countdownSpan = document.createElement('span');
  countdownSpan.id = 'countdown-timer';
  countdownSpan.style.fontWeight = '800';
  countdownSpan.style.color = '#FFD600';
  urgencyBar.appendChild(document.createTextNode(' Offer expires in: '));
  urgencyBar.appendChild(countdownSpan);

  function updateTimer() {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      countdownSpan.textContent = 'EXPIRED';
      return;
    }
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    countdownSpan.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

createCountdown();

// ===== TOP BAR HIDE ON SCROLL DOWN =====
let lastScroll = 0;
const topBar = document.getElementById('topBar');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    topBar.style.transform = 'translateY(0)';
  } else if (currentScroll > lastScroll && currentScroll > 200) {
    topBar.style.transform = 'translateY(-100%)';
    topBar.style.transition = 'transform 0.3s ease';
  } else {
    topBar.style.transform = 'translateY(0)';
    topBar.style.transition = 'transform 0.3s ease';
  }
  lastScroll = currentScroll;
});

// ===== BUY BUTTON CLICK TRACKING =====
const GUMROAD_URL = 'https://socialize0.gumroad.com/l/ai_automation_guide';

document.querySelectorAll('#buyButton, #finalBuyButton').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = GUMROAD_URL;
  });
});

// Also make any .cta-btn that isn't #buyButton or #finalBuyButton go to Gumroad
document.querySelectorAll('.cta-btn').forEach(btn => {
  if (btn.id !== 'buyButton' && btn.id !== 'finalBuyButton') {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = GUMROAD_URL;
    });
  }
});

console.log('%c⚡ AI Automation Blueprint Landing Page Loaded', 'color: #FF6B00; font-weight: bold; font-size: 16px;');
