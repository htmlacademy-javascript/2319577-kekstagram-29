import {data} from './data.js';

const picturesContainer = document.querySelector('.pictures'); // находим контейнер с изображениями всех карточек
const bigPicture = document.querySelector('.big-picture'); // находим секцию (контейнер) модального окна
const commentsCount = bigPicture.querySelector('.social__comment-count'); // текст ХХ ком-ев из ХХ
const commentsTotalCount = bigPicture.querySelector('.comments-count'); // цифра кол-ва ком-ев всего
const commentsList = bigPicture.querySelector('.social__comments'); // находим список ком-ев
const commentItem = commentsList.querySelector('.social__comment'); // находим один ком-рий
const btnDownloadMore = bigPicture.querySelector('.comments-loader'); // находим кнопку "Загрузить еще"
const bigFotoCloseElement = bigPicture.querySelector('.big-picture__cancel'); // находим кнопку закрытия

let numberComments; // создаем переменную кол-ва ком-ев

// Функция-шаблон каждого коментария к карточке
function createCommentTemplate ({avatar, name, message}) {
  return `<li class="social__comment">
            <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
            <p class="social__text">${message}</p>
          </li>`;
}

// Функция по установлению общего количества комментариев
const setCommentsCount = (comments) => {
  commentsTotalCount.textContent = comments.length;
};


// Функция-обработчик события "Загрузить ещё"
function onShowMoreButtonClick (evt) {
  evt.preventDefault();
  numberComments += 5;
}

// Функция подсчета кол-ва ком-ев
function calculateComments (comments) {
  let commentsAmount = 0; //начальное количество коментариев

  for (let i = 0; i < comments.length; i++) {
    if (i < numberComments) {
      commentsAmount++;
    }
  }
  commentsCount.innerHTML = `${commentsAmount} из <span class="comments-count">${comments.length}</span> комментариев`;

  if (commentsAmount === comments.length) { // скрываем кнопку показать еще
    btnDownloadMore.classList.add('hidden');

    btnDownloadMore.removeEventListener('click', (evt) => {
      onShowMoreButtonClick(evt);
    });
  }
}

// Функция наполнения данными карточек
function fillBigPicture({url, description, likes, comments}) {
  bigPicture.querySelector('.big-picture__img img').src = url; // записывается ссылка на карточку
  bigPicture.querySelector('.social__caption').textContent = description; // записывается описание карточки
  bigPicture.querySelector('.likes-count').textContent = likes; // записывается количество лайков
  bigPicture.querySelector('.comments-count').textContent = comments.length; // записывается только количество коментариев

  // Массив - коллекция комментариев
  const commentsData = comments.map((value) => createCommentTemplate (value)); // добавляет в массив новый вид массива, согласно шаблону
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
