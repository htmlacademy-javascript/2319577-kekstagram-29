import './pictures.js';
import {isEscapeKey} from './util.js';

const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelectorAll('.picture');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  userModalElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function onClickToOpen () {
  userModalOpenElement.addEventListener('click', () => {
    openUserModal();
  });
}

function closeUserModal () {
  userModalElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

function onClickToClose () {
  userModalCloseElement.addEventListener('click', () => {
    closeUserModal();
  });
}
