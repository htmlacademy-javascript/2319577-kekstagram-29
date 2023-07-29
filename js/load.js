import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {showAlertError} from './alert.js';

let dataPhotos = null;

try {
  dataPhotos = await getData(); // получаем данные
  renderPictures(dataPhotos); // отрисовываем полученные данные
} catch {
  showAlertError('Данные не загружены. Попробуйте обновить страницу'); // вывод ошибки
}

export {dataPhotos}; // экспорт в photo-filter.js и в full-pictures.js
