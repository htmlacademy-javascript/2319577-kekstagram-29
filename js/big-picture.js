import './pictures.js';
import {isEscapeKey} from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureModalClose = bigPictureModal.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  bigPictureModalClose.classList.add('hidden');
};

const openBigPicture = () => {
  bigPictureModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault ();
    closeBigPicture ();
  }
};

const onBigPictureModalCloseClick = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureModalClose.removeEventListener('click', onBigPictureModalCloseClick);
};

const onPicturesContainerClick = (evt) => {
  if (evt.target.closest('picture')) {
    openBigPicture ();

    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureModalClose.addEventListener('click', onBigPictureModalCloseClick);
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);
