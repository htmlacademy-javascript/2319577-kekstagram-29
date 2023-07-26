const errorBooklet = document.querySelector('#error').content.querySelector('.error');
const successBooklet = document.querySelector('#success').content.querySelector('.success');

function renderBooklet() {
  const popupContainer = document.querySelector('main');

  errorBooklet.classList.add('hidden');
  successBooklet.classList.add('hidden');

  popupContainer.insertAdjacentElement('afterbegin', errorBooklet);
  popupContainer.insertAdjacentElement('afterbegin', successBooklet);
}

renderBooklet();

export function showBooklet(cls) {
  document.querySelector(`.${cls}`).classList.remove('hidden');
}

export function hideBooklet(cls) {
  document.querySelector(`.${cls}`).classList.add('hidden');
}
