import {data} from './data.js';
import {renderPictures} from './pictures.js';
import {initUploadForm} from './form.js';
import './modal.js';


renderPictures(data); //отрисовывам миниатюры

initUploadForm(); //форма загрузки
