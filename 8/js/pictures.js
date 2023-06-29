//Выбор элементов в документе с классом .pictures
const picturesContainer = document.querySelector('.pictures');
//Добавление "черного ящика" для объектов
const fragment = document.createDocumentFragment();

//Находим шаблон по id и выбираем содержимое шаблона по классу .picture
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

//Функция наполнения контентом с использованием ({деструктизации})
const fillCardTemplate = ({url, description, comments, likes}) => {
  //Клонируем шаблон для многократного использования
  const element = cardTemplate.cloneNode(true);

  //Заполнение контентом
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  return element;
};

//Функция отрисовки картинок на экспорт в main.js
export const renderPictures = (data) => {
  //Функция перебора всех объектов массива, возвращающая заполненный объект
  data.forEach((cardObj) => {
    fragment.appendChild(fillCardTemplate(cardObj));
  });
  //Внесение данных в контейнер
  picturesContainer.appendChild(fragment);
};
