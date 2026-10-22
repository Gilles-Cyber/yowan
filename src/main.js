import './styles.css';

const projectData = {
  aurea: {
    label: '01 / Landing page',
    title: 'Auréa',
    description: 'Une landing page éditoriale pour une marque de soins qui veut faire de chaque visite une première respiration. La direction visuelle s\'appuie sur la matière, le calme et des appels à l\'action très lisibles.',
    role: 'UI design + frontend',
    stack: 'HTML · CSS · JS',
    focus: 'Désirabilité'
  },
  courtly: {
    label: '02 / Plateforme web',
    title: 'Courtly',
    description: 'Une plateforme de réservation de terrains et d\'activités sportives pensée pour réduire la friction : trouver, comparer, réserver. Un projet où l\'interface rencontre la logique métier.',
    role: 'Product design + dev',
    stack: 'PHP · Laravel · JS',
    focus: 'Simplicité'
  },
  pulse: {
    label: '03 / Étude UI/UX',
    title: 'PulseFit',
    description: 'Une étude de cas mobile pour aider les sportifs à comprendre leur progression sans se perdre dans la donnée. Parcours, wireframes et interface finale sont réunis dans une expérience motivante.',
    role: 'UX research + UI',
    stack: 'Figma · Prototypage',
    focus: 'Progression'
  }
};

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.desktop-nav a');

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const pulseScreenLabels = {
  overview: "Vue d'ensemble",
  activity: 'Activité',
  profile: 'Profil'
};
const storageKeys = { aurea: 'yoanfolio:aurea-cart', courtly: 'yoanfolio:courtly-bookings', pulse: 'yoanfolio:pulse-goal' };
const readStorage = (key, fallback) => { try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } };
const writeStorage = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* localStorage peut être indisponible */ } };
const pulseTabs = document.querySelectorAll('.lab-tab');
const pulseScreens = document.querySelectorAll('[data-pulse-content]');
const pulseScreenLabel = document.querySelector('#pulse-screen-label');
pulseTabs.forEach((tab) => tab.addEventListener('click', () => {
  const screen = tab.dataset.pulseScreen;
  pulseTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  pulseScreens.forEach((panel) => {
    panel.classList.toggle('is-hidden', panel.dataset.pulseContent !== screen);
  });
  pulseScreenLabel.textContent = pulseScreenLabels[screen];
}));

const aureaProducts = {
  cleanser: { category: 'DAILY CLEANSER', name: 'Cloud Cleanser', description: 'Nettoie en douceur et prépare la peau à recevoir le reste du rituel.', price: '18 000 FCFA', color: '#f4e6c5', image: '/assets/aurea-cleansing-model.jpg' },
  serum: { category: 'GLOW SERUM', name: 'Dew Serum', description: 'Réveille l’éclat avec une texture légère pensée pour le matin.', price: '24 000 FCFA', color: '#d7f0df', image: '/manus-storage/async-images/UTJpmn3ihx2s57od2PfxcP/image-2.webp' },
  cream: { category: 'NIGHT CREAM', name: 'Slow Cream', description: 'Nourrit en profondeur et accompagne la peau pendant la nuit.', price: '22 000 FCFA', color: '#e9d4bf', image: '/manus-storage/async-images/UTJpmn3ihx2s57od2PfxcP/image-3.webp' }
};
const aureaButtons = document.querySelectorAll('.aurea-product');
const aureaStatus = document.querySelector('[data-aurea-status]');
const savedAurea = readStorage(storageKeys.aurea, { quantity: 0, total: 0, product: 'cleanser' });
let aureaQuantity = Number(savedAurea.quantity) || 0;
let aureaTotal = Number(savedAurea.total) || 0;
let activeAureaProduct = aureaProducts[savedAurea.product] ? savedAurea.product : 'cleanser';
const updateAureaCart = () => {
  document.querySelector('[data-aurea-count]').textContent = aureaQuantity;
  document.querySelector('[data-aurea-quantity]').textContent = aureaQuantity;
  document.querySelector('[data-aurea-total]').textContent = `${aureaTotal.toLocaleString('fr-FR')} FCFA`;
  writeStorage(storageKeys.aurea, { quantity: aureaQuantity, total: aureaTotal, product: activeAureaProduct });
};
const renderAureaProduct = (productKey, announce = false) => {
  const product = aureaProducts[productKey];
  activeAureaProduct = productKey;
  aureaButtons.forEach((item) => item.classList.toggle('is-active', item.dataset.aureaProduct === productKey));
  document.querySelector('[data-aurea-category]').textContent = product.category;
  document.querySelector('[data-aurea-name]').textContent = product.name;
  document.querySelector('[data-aurea-description]').textContent = product.description;
  document.querySelector('[data-aurea-price]').textContent = product.price;
  const bottle = document.querySelector('[data-aurea-bottle]');
  bottle.style.backgroundColor = product.color;
  bottle.style.backgroundImage = `url('${product.image}')`;
  if (announce) aureaStatus.textContent = `${product.name} sélectionné pour votre routine.`;
};
aureaButtons.forEach((button) => button.addEventListener('click', () => {
  const product = aureaProducts[button.dataset.aureaProduct];
  renderAureaProduct(button.dataset.aureaProduct, true);
  const bottle = document.querySelector('[data-aurea-bottle]');
  bottle.style.background = product.color;
  bottle.animate([{ transform: 'rotate(7deg) scale(.94)' }, { transform: 'rotate(7deg) scale(1)' }], { duration: 280, easing: 'ease-out' });
  aureaStatus.textContent = `${product.name} sélectionné pour votre routine.`;
}));
document.querySelector('[data-aurea-action]')?.addEventListener('click', () => {
  aureaQuantity += 1;
  aureaTotal += Number(document.querySelector('[data-aurea-price]').textContent.replace(/\s/g, '').replace('FCFA', ''));
  updateAureaCart();
  aureaStatus.textContent = 'Produit ajouté à la routine Auréa.';
});
document.querySelector('[data-aurea-plus]')?.addEventListener('click', () => { aureaQuantity += 1; aureaTotal += Number(document.querySelector('[data-aurea-price]').textContent.replace(/\s/g, '').replace('FCFA', '')); updateAureaCart(); });
document.querySelector('[data-aurea-minus]')?.addEventListener('click', () => { if (aureaQuantity > 0) { aureaQuantity -= 1; aureaTotal = Math.max(0, aureaTotal - Number(document.querySelector('[data-aurea-price]').textContent.replace(/\s/g, '').replace('FCFA', ''))); updateAureaCart(); } });
document.querySelector('[data-aurea-reset]')?.addEventListener('click', () => { aureaQuantity = 0; aureaTotal = 0; updateAureaCart(); aureaStatus.textContent = 'Routine réinitialisée.'; });
renderAureaProduct(activeAureaProduct);
updateAureaCart();

const courtlyFilters = document.querySelectorAll('.courtly-filter');
const courtlySlots = document.querySelectorAll('.slot');
const courtlyDays = document.querySelectorAll('.day');
const courtlyStatus = document.querySelector('[data-court-status]');
let selectedDay = 'Aujourd\'hui';
const savedBookings = readStorage(storageKeys.courtly, []);
const courtlyBookings = Array.isArray(savedBookings) ? savedBookings : [];
const renderBookings = () => {
  const list = document.querySelector('[data-booking-list]');
  const summary = document.querySelector('[data-booking-summary]');
  if (!courtlyBookings.length) { list.hidden = true; return; }
  list.hidden = false;
  summary.textContent = courtlyBookings.map((booking) => `${booking.day} · ${booking.slot} · ${booking.venue}`).join(' / ');
};
const venueData = {
  Tous: { name: 'Padel Club 237', type: 'PADEL' },
  Padel: { name: 'Padel Club 237', type: 'PADEL' },
  Football: { name: 'Akwa Five Arena', type: 'FOOTBALL' }
};
courtlyFilters.forEach((filter) => filter.addEventListener('click', () => {
  const venue = venueData[filter.dataset.sport];
  courtlyFilters.forEach((item) => item.classList.toggle('is-active', item === filter));
  document.querySelector('[data-court-name]').textContent = venue.name;
  document.querySelector('[data-court-type]').textContent = venue.type;
  courtlyStatus.textContent = `${filter.dataset.sport} sélectionné — choisissez un créneau.`;
}));
courtlySlots.forEach((slot) => slot.addEventListener('click', () => {
  courtlySlots.forEach((item) => item.classList.toggle('is-active', item === slot));
  courtlyStatus.textContent = `Créneau ${slot.dataset.slot} sélectionné.`;
}));
courtlyDays.forEach((day) => day.addEventListener('click', () => { courtlyDays.forEach((item) => item.classList.toggle('is-active', item === day)); selectedDay = day.dataset.day; courtlyStatus.textContent = `${selectedDay} sélectionné — choisissez un créneau.`; }));
document.querySelector('[data-book-action]')?.addEventListener('click', () => {
  const activeSlot = document.querySelector('.slot.is-active')?.dataset.slot || '18:00';
  const venue = document.querySelector('[data-court-name]').textContent;
  courtlyStatus.textContent = `Réservation confirmée : ${venue}, ${selectedDay} à ${activeSlot}.`;
  courtlyBookings.push({ day: selectedDay, slot: activeSlot, venue });
  writeStorage(storageKeys.courtly, courtlyBookings);
  renderBookings();
});
renderBookings();

const pulseGoalRange = document.querySelector('#pulse-goal-range');
const savedPulseGoal = Number(readStorage(storageKeys.pulse, 4.2));
if (pulseGoalRange) { pulseGoalRange.value = String(Math.min(10, Math.max(1, savedPulseGoal))); document.querySelector('[data-pulse-goal]').textContent = Number(pulseGoalRange.value).toFixed(1); }
pulseGoalRange?.addEventListener('input', () => { document.querySelector('[data-pulse-goal]').textContent = Number(pulseGoalRange.value).toFixed(1); writeStorage(storageKeys.pulse, Number(pulseGoalRange.value)); });
let pulseTimer;
let pulseSeconds = 0;
document.querySelector('[data-pulse-start]')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const timer = document.querySelector('[data-pulse-timer]');
  if (button.classList.contains('is-running')) {
    clearInterval(pulseTimer);
    button.classList.remove('is-running');
    button.innerHTML = 'Reprendre la séance <span>↗</span>';
    timer.textContent = 'Séance en pause.';
    return;
  }
  button.classList.add('is-running');
  button.innerHTML = 'Mettre en pause <span>Ⅱ</span>';
  timer.textContent = `Séance en cours · 00:${String(pulseSeconds).padStart(2, '0')}`;
  pulseTimer = setInterval(() => { pulseSeconds = (pulseSeconds + 1) % 60; timer.textContent = `Séance en cours · 00:${String(pulseSeconds).padStart(2, '0')}`; }, 1000);
});

const modal = document.querySelector('.project-modal');
const modalLabel = document.querySelector('#modal-label');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalRole = document.querySelector('#modal-role');
const modalStack = document.querySelector('#modal-stack');
const modalFocus = document.querySelector('#modal-focus');

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-project]').forEach((card) => {
  card.querySelector('.project-link').addEventListener('click', () => {
    const demoTarget = card.dataset.project === 'pulse' ? '#pulse-lab' : '#playground';
    const demo = document.querySelector(demoTarget);
    if (demo) {
      demo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const data = projectData[card.dataset.project];
    modalLabel.textContent = data.label;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalRole.textContent = data.role;
    modalStack.textContent = data.stack;
    modalFocus.textContent = data.focus;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});
document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(contactForm).get('name');
  formStatus.textContent = `Merci ${name || ''} — votre message est prêt à être envoyé.`;
  contactForm.reset();
});
