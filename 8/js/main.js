import {getPhotosData} from './data.js';
import {renderPictures } from './pictures.js';

window.console.log(getPhotosData(25));

renderPictures(getPhotosData(25));
