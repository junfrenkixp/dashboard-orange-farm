document.querySelectorAll('.widget-dropdown-wrap').forEach((dropdown) => {
  const button = dropdown.querySelector('.widget-dropdown-button');
  const items = dropdown.querySelectorAll('.widget-dropdown li button');

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('is-active');
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const value = item.textContent.trim();

      const outerSpan = button.querySelector('span');
      const innerSpan = outerSpan ? outerSpan.querySelector('span') : null;

      if (innerSpan) {
        innerSpan.textContent = value;
      } else if (outerSpan) {
        outerSpan.textContent = value;
      }
      dropdown.classList.remove('is-active');
    });
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.widget-dropdown-wrap.is-active')
    .forEach((el) => el.classList.remove('is-active'));
});
