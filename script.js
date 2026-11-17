// ===== Navbar: berubah saat scroll =====
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

// ===== Menu hamburger (mobile) =====
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  menu.classList.remove('open');
}));

// ===== Animasi muncul saat scroll (Intersection Observer) =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Link menu aktif sesuai section =====
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
function setActive() {
  const y = window.scrollY + 120;
  let current = 0;
  sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === current));
}

// ===== Parallax ringan pada ilustrasi sekolah =====
const bgs = document.querySelectorAll('.stage .bg');
function parallax() {
  const vh = window.innerHeight;
  bgs.forEach(bg => {
    const r = bg.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;           // di luar layar: lewati
    const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 s/d 1
    bg.style.transform = `translateY(${progress * -28}px)`;
  });
}

// ===== Satu handler scroll yang efisien =====
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    setActive();
    parallax();
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();
