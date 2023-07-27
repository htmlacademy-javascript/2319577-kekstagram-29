// Находим контейнер с изображениями всех карточек
const picturesContainer = document.querySelector('.pictures');

// Находим шаблон по id и выбираем содержимое шаблона по классу .picture
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция наполнения данными шаблона с использованием ({деструктуризации})
const fillCardTemplate = ({id, url, description, comments, likes}) => {
  const element = cardTemplate.cloneNode(true); // клонируем шаблон для многократного использования

  element.dataset.id = id; // присваивается идентификатор карточки по порядку
  element.querySelector('.picture__img').src = url; // записывается ссылка на карточку
  element.querySelector('.picture__img').alt = description; // записывается описание карточки
  element.querySelector('.picture__comments').textContent = comments.length; // записывается только количество коментариев
  element.querySelector('.picture__likes').textContent = likes; // записывается количество лайков

  return element; // возвращается заполненная карточка
};

// Функция отрисовки карточек
const renderPictures = (data) => {
  const fragment = document.createDocumentFragment(); // добавление "черного ящика"-контейнера для объектов

  // Функция перебора всех карточек массива и заполнения данными
  data.forEach((cardObj) => {
    const element = fillCardTemplate(cardObj);
    fragment.appendChild(element); // каждую карточку складируем в контейнер
    // window.console.log(picture); // вывод в консоль данных каждой карточки
  });
  picturesContainer.appendChild(fragment);
};

export {renderPictures};
