import './pictures.js';
import {isEscapeKey} from './util.js';

const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelectorAll('.picture');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
};

userModalOpenElement.forEach((pictures) => {
  pictures.addEventListener('click', () => {
    userModalElement.classList.remove('hidden');
  });
  document.addEventListener('keydown', onDocumentKeydown);
});

userModalCloseElement.addEventListener('click', () => {
  userModalElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
});
