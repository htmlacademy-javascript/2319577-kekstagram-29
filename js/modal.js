import {dataPhotos} from './load.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture'); // находим секцию (контейнер) модального окна
const bigPictureModal = document.querySelector('.big-picture'); // находим секцию (контейнер) модального окна
const picturesContainer = document.querySelector('.pictures'); // находим контейнер с изображениями всех карточек
const bigPictureModalClose = bigPictureModal.querySelector('.big-picture__cancel'); // находим кнопку закрытия модального окна
const commentsLoader = bigPicture.querySelector('.comments-loader'); // находим кнопку "Загрузить еще"
const commentsCounter = bigPicture.querySelector('.social__comment-count'); // текст ХХ ком-ев из ХХ

// Функция обработчика событий для нажатия с клавиатуры кнопки Esc, для закрытия модалки
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) { // логика: если нажимается кнопка Esc - делаешь то-то..
    evt.preventDefault(); // сброс действия по умолчанию
    closeBigPicture (); // закрытие модалки
  }
};

// Функция закрытия модалки как константа
const onBigPictureCloseClick = () => {
  closeBigPicture();
};

// Функция открытия модального окна
function openBigPicture () {
  bigPictureModal.classList.remove('hidden'); // удаляем hidden, чтобы отобразить модальное окно
  document.querySelector('body').classList.add('modal-open'); // добавляем, чтобы контейнер с карточками позади не прокручивался при скролле

  document.addEventListener('keydown', onDocumentKeydown); // добавляем "событие" на нажатие кнопки Esc
  bigPictureModalClose.addEventListener('click', onBigPictureCloseClick); // добавляем "событие" на клик по кнопке закрытия модалки
  commentsLoader.addEventListener('click', onCommentsLoaderClick); // добавляем "событие" на клик по кнопке "Загрузить еще"
}

// Функция закрытия модального окна
function closeBigPicture () {
  bigPictureModal.classList.add('hidden'); // добавляем hidden, чтобы отобразить модальное окно
  document.querySelector('body').classList.remove('modal-open'); // убираем, тк более нет необходимости

  document.removeEventListener('keydown', onDocumentKeydown); // удаляем "событие" на нажатие кнопки Esc
  bigPictureModalClose.removeEventListener('click', onBigPictureCloseClick); // удаляем "событие" на клик по кнопке закрытия модалки
  commentsLoader.removeEventListener('click', onCommentsLoaderClick); // удаляем "событие" на клик по кнопке "Загрузить еще"
}

// Функция отображения карточки со всеми данными
const onPicturesContainerClick = ({target}) => {
  if (!target.closest('.picture')) { // поиск ближайшего родителя класса .picture (closest) для устранения нажатия по span-элементам карточки
    return;
  }
  const cardDataId = target.closest('.picture').dataset.id; // считываем id карточки (избегая клика по спанам)
  const photoData = dataPhotos.find((element) => element.id === Number(cardDataId)); // id из текста в цифру
  fillBigPicture(photoData); // отрисовка модального окна карточки со всем контентом
  openBigPicture(); // выполнение функции открытия модалки
};

// Функция-шаблон каждого коментария к карточке
function createCommentTemplate ({avatar, name, message}) {
  return `<li class="social__comment">
            <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
            <p class="social__text">${message}</p>
          </li>`;
}

// Функция создания коллекция комментариев
const renderCommentsList = (comments) => {
  bigPicture.querySelector('.social__comments').innerHTML = comments
    .map((value) => createCommentTemplate(value)) // добавляет в массив новый вид массива, согласно шаблону
    .join(''); // записывается в HTML-код данные массива комментариев
};

// Функция подсчет кол-ва ком-ев ХХ из ХХ с учетом подгружаемых
const renderCommentsCounter = (loadedComments, totalComments) => {
  commentsCounter.textContent = `${loadedComments} из ${totalComments} комментариев`;

  if (loadedComments === totalComments) { // если кол-во подгружаемых ком-ев = общему числу ком-ев, то скрыть кнопку "Загрузить еще"
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const COMMENTS_PER_PORTION = 5; //кол-во подгружаемых ком-ев
let loadingStep = 1;

// Функция правильного отображения числа ком-ев, после подгрузки дополнительных
function onCommentsLoaderClick () {
  loadingStep = loadingStep + 1; // счетчик "шага"
  const comments = JSON.parse(bigPicture.dataset.comments); // преобразуем строку в данные
  const restComments = comments.slice(0, loadingStep * COMMENTS_PER_PORTION); // обновлениц цифры подгружаемых ком-ев после нажатия "Загрузить еще"
  renderCommentsList(restComments); // добавление дополнительных ком-ев
  renderCommentsCounter(restComments.length, comments.length); // обновление цифры отображенных ком-ев из общего числа ком-ев
}

// Функция наполнения данными карточек
function fillBigPicture({ url, likes, comments, description }) {
  bigPicture.querySelector('.big-picture__img img').src = url; // записывается ссылка на карточку
  bigPicture.querySelector('.likes-count').textContent = likes; // записывается количество лайков
  bigPicture.querySelector('.social__caption').textContent = description; // записывается описание карточки
  bigPicture.dataset.comments = JSON.stringify(comments); // записывается число коментариев

  loadingStep = 1;
  const initialComments = comments.slice(0, COMMENTS_PER_PORTION); // отображение заданного кол-ва ком-ев
  renderCommentsList(initialComments); // отображение заданного кол-ва ком-ев
  renderCommentsCounter(initialComments.length, comments.length); // отображение дополнительных ком-ев
}

picturesContainer.addEventListener('click', onPicturesContainerClick);
