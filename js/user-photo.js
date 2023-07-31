const FILE_TYPES = ['jpg', 'jpeg', 'png', 'bmp', 'tif', 'webp', 'svg', 'gif', 'avif']; // Расширения поддерживаемых картинок

const uploadInput = document.querySelector('.img-upload__input'); // находим поле загрузки изо-я
const photoPreview = document.querySelector('.img-upload__preview img'); // загруженное фото для обрабоки
const effectPreviews = document.querySelectorAll('.effects__preview'); //наложение эффекта на изображение

// Функция отображения загружаемой карточки (фото)
const showUploadPhoto = () => {
  const file = uploadInput.files[0]; // получение единственного файла
  const fileName = file.name.toLowerCase(); // приводим название загружаемого файла к одному регистру

  const matchs = FILE_TYPES.some((extention) => fileName.endsWith(extention)); // проверка расширения файла .some() пройдемся по массиву с помошью .endsWith()

  if (matchs) {
    photoPreview.src = URL.createObjectURL(file); // метод URL.createObjectURL() делает ссылку на содержимое для отображения
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`; // превью эффекта фильтра из загруженной фото
    });
  }
};

export {showUploadPhoto};
