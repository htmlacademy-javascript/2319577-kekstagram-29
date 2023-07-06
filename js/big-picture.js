import './pictures.js';
import {isEscapeKey} from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const picturesContainer = document.querySelectorAll('.picture');
const bigPictureModalClose = bigPictureModal.querySelector('.big-picture__cancel');

function closeBigPicture() {
  bigPictureModalClose.classList.add('hidden');
}

function openBigPicture() {
  bigPictureModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureModalCloseClick = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureModalClose.removeEventListener('click', onBigPictureModalCloseClick);
};

const onPicturesContainerClick = (evt) => {
  if(evt.target.closest('picture')) {
    openBigPicture();

    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureModalClose.addEventListener('click', onBigPictureModalCloseClick);
  }
};

export const picturesContainerClick = () => {
  picturesContainer.addEventListener('click', onPicturesContainerClick);
};
