import './pictures.js';
import {isEscapeKey} from './util.js';


const bigPictureModal = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureClose = bigPictureModal.querySelector('.big-picture__cancel');

function closeBigPicture () {
  bigPictureModal.classList.add('hidden');
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture ();
  }
};

function onBigPicture () {
  bigPictureModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}

const onBigPictureCloseClick = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
};

const onPicturesContainerClick = (evt) => {
  if (evt.target.closest('.picture')){
    onBigPicture ();

    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);
