document.addEventListener('click', (e) => {
  const option = e.target.closest('#customers-sort .widget-dropdown li button');
  if (!option) return;

  const value = option.dataset.value;

  const list = document.querySelector('.customers-list');
  if (!list) return;

  const items = [...list.querySelectorAll('.customers-item')];

  const orders = {
    newest: [1, 2, 3, 4],
    latest: [4, 3, 2, 1],
    oldest: [2, 4, 1, 3]
  };

  const order = orders[value] || orders.newest;

  order.forEach((orderValue) => {
    const item = items.find((el) => Number(el.dataset.order) === orderValue);
    if (item) list.appendChild(item);
  });
});
