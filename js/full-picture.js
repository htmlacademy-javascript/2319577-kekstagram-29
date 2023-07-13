import {data} from './data.js';

// const COMMENTS_PER_PORTION = 5; // кол-во коментариев на странице

const picturesContainer = document.querySelector('.pictures'); // находим контейнер с изображениями всех карточек

// Функция-шаблон каждого коментария к карточке
function createCommentTemplate ({avatar, name, message}) {
  return `<li class="social__comment">
            <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
            <p class="social__text">${message}</p>
          </li>`;
}

// Функция наполнения данными карточек
function fillBigPicture({url, description, likes, comments}) {
  const bigPicture = document.querySelector('.big-picture'); // находим секцию (контейнер) модального окна

  bigPicture.querySelector('.big-picture__img img').src = url; // записывается ссылка на карточку
  bigPicture.querySelector('.social__caption').textContent = description; // записывается описание карточки
  bigPicture.querySelector('.likes-count').textContent = likes; // записывается количество лайков
  bigPicture.querySelector('.comments-count').textContent = comments.length; // записывается только количество коментариев

  // Массив - коллекция комментариев
  const commentsData = comments.map((value) => createCommentTemplate (value));
  bigPicture.querySelector('.social__comments').innerHTML = commentsData
    .join(''); // записывается в HTML-код данные массива комментариев
}

// Функция отображения карточки со всеми данными
function onPicturesContainerClick(evt) {
  const cardId = evt.target.closest('.picture').dataset.id; // считываем id карточки (избегая клика по спанам)
  const photoData = data.find((element) => element.id === Number(cardId)); // id из текста в цифру

  fillBigPicture(photoData);
}

picturesContainer.addEventListener('click', onPicturesContainerClick);
