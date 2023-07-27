import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {showAlertError} from './alert.js';

let dataPhotos = null;

try {
  dataPhotos = await getData(); // получаем данные
  renderPictures(dataPhotos); // отрисовываем полученные данные
} catch {
  showAlertError('Ваши данные очень важны для нас. В настоящий момент они не загружены. Попробуйте перезагрузить страницу!'); // вывод ошибки
}

export {dataPhotos};
