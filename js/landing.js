// ============================================
// LANDING PAGE JS
// ============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// Animated counters
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.target) || 0;
            const suffix = el.dataset.suffix || (el.dataset.target == '95' ? '%' : el.dataset.target == '500' ? '+' : '');
            animateCounter(el, target, suffix);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => observer.observe(el));

// Fix stat suffixes
document.addEventListener('DOMContentLoaded', () => {
    const nums = document.querySelectorAll('.stat-number');
    if (nums[0]) nums[0].dataset.suffix = '%';
    if (nums[2]) nums[2].dataset.suffix = '+';
    if (nums[3]) nums[3].dataset.suffix = '+';
});

// Feature cards click
document.querySelectorAll('.feature-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
        const href = card.dataset.href;
        if (href) window.location.href = href;
    });
    card.style.cursor = 'pointer';
    // Add arrow
    const arrow = document.createElement('div');
    arrow.style.cssText = `
    position: absolute; top: 1rem; right: 1rem;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(0,212,255,0.1);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: all 0.3s ease;
  `;
    arrow.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>`;
    card.style.position = 'relative';
    card.appendChild(arrow);
    card.addEventListener('mouseenter', () => arrow.style.opacity = '1');
    card.addEventListener('mouseleave', () => arrow.style.opacity = '0');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll reveal
const revealElements = document.querySelectorAll('.feature-card, .tech-card, .step-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.style.opacity = '1';
                e.target.style.transform = e.target.style.transform.replace('translateY(20px)', 'translateY(0)');
                e.target.style.transition = 'all 0.6s ease';
            }, i * 80);
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    revealObserver.observe(el);
});
