(function () {
  const mobileNav = document.getElementById('mobileNav');
  const burger = document.querySelector('.burger');

  function setMenuState(isOpen) {
    if (!mobileNav || !burger) return;
    mobileNav.classList.toggle('show', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  window.toggleMenu = function toggleMenu() {
    if (!mobileNav) return;
    setMenuState(!mobileNav.classList.contains('show'));
  };

  if (mobileNav && burger) {
    burger.setAttribute('aria-controls', 'mobileNav');
    burger.setAttribute('aria-expanded', 'false');

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });
  }

  const presetGrid = document.getElementById('presetGrid');
  const filterButtons = document.querySelectorAll('.filter-btn[data-category]');
  const searchInput = document.getElementById('presetSearch');
  let currentCategory = 'all';

  function applyPresetFilters() {
    if (!presetGrid) return;
    const cards = presetGrid.querySelectorAll('.card');
    const query = (searchInput?.value || '').trim().toLowerCase();

    cards.forEach((card) => {
      const matchesCategory = currentCategory === 'all' || card.classList.contains(currentCategory);
      const text = card.textContent.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      card.classList.toggle('hidden', !(matchesCategory && matchesQuery));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.category || 'all';
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      applyPresetFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyPresetFilters);
  }
})();
