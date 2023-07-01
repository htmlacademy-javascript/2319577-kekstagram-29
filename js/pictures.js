//Выбор элементов в документе с классом .pictures
const picturesContainer = document.querySelector('.pictures');

//Находим шаблон по id и выбираем содержимое шаблона по классу .picture
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

//Функция наполнения данными шаблона с использованием ({деструктуризации})
const fillCardTemplate = ({url, description, comments, likes}) => {
  const element = cardTemplate.cloneNode(true); //Клонируем шаблон для многократного использования

  //Заполнение данными
  element.querySelector('.picture__img').src = url; //записывается ссылка на изображение
  element.querySelector('.picture__img').alt = description; //записывается описание изображения
  element.querySelector('.picture__comments').textContent = comments.length; //записывается только количество
  element.querySelector('.picture__likes').textContent = likes; //записывается количество лайков

  return element; //Возвращение заполненной карточки
};

//Функция отрисовки картинок на экспорт в main.js
export const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment(); //Добавление "черного ящика"-контейнера для объектов

  pictures.forEach((picture) => { //Функция перебора всех карточек массива и добавляет заполнение данными
    const element = fillCardTemplate(picture);
    fragment.appendChild(element); //Каждую карточку складируем в контейнер
    // window.console.log(picture); //Вывод в консоль данных каждой карточки
  });
  picturesContainer.appendChild(fragment); //Добавляет все данные из контейнера в DOM-дерево
};

// export const clearPictures = () => {
//   picturesContainer.innerHTML = '';
// };
