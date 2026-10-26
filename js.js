const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.food-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;

    cards.forEach((card, i) => {
      const match = category === 'all' || card.dataset.category === category;
      card.classList.toggle('hide', !match);
      if (match) {
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = `cardIn .45s ease ${i * .04}s both`;
        });
      }
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const style = document.createElement('style');
style.textContent = `@keyframes cardIn {from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(style);

