import './pictures.js';

const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.picture');
// const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

userModalOpenElement?.addEventListener('click', () => {
  userModalElement.classList.remove('hidden');
});

// userModalCloseElement.addEventListener('click', () => {
//   userModalElement.classList.add('hidden');
// });

// document.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     userModalElement.classList.add('hidden');
//   }
// });
