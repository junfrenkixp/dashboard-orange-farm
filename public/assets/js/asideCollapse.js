const collapseButton = document.querySelector('.collapse-button');
const aside = document.querySelector('.aside');
const sidebarDropdowns = document.querySelectorAll('.sidebar-item-wrap');

collapseButton.addEventListener('click', function () {
  this.classList.toggle('is-hidden');
  aside.classList.toggle('is-collapsed');
  sidebarDropdowns.forEach(dropdown => {
    dropdown.classList.remove('is-open')

    const toggle = dropdown.querySelector('[data-sidebar-dropdown-toggle]');

    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
