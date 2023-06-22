/* eslint-disable no-console */
// import './util.js';
import {variableValue, makePhotosDescriptions} from './data.js';

// Создание массива, в котором хранятся все данные
const photoDescriptions = Array.from({length: variableValue}, makePhotosDescriptions);

// Вызов массива данных в консоль
console.log(photoDescriptions);
