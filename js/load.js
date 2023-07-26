import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {showAlertError} from './alert.js';

let dataPhotos = null;

try {
  dataPhotos = await getData();
  renderPictures(dataPhotos);
} catch{
  showAlertError('Данные не загружены. Попробуйте обновить страницу');
}

export {dataPhotos};
