const picturesContainer = document.querySelector('.pictures');

const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fillCardTemplate = ({id, url, description, comments, likes}) => {
  const element = cardTemplate.cloneNode(true);

  element.dataset.id = id;
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  return element;
};

export const renderPictures = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((cardObj) => {
    const element = fillCardTemplate(cardObj);
    fragment.appendChild(element);
    // window.console.log(picture);
  });
  picturesContainer.appendChild(fragment);
};
