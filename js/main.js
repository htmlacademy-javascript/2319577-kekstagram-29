/* eslint-disable no-console */

// Количество значений
const variableValue = 25;

// Функция cоздания рандомного числа
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция поиска рандомного элемента
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция создания неповторяющегося Id
const createId = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Описание фото
const DESCRIPTIONS = [
  'Вид сверху на пляж.',
  'Вывеска указывающая к пляжу.',
  'Вид с камней на пляж и вдаль океана.',
  'Девушка в купальнике и с фотоаппаратом на пляжу.',
  'Две порции мило оформленной метной похлебки.',
  'Черный спортивный автомобиль с открытой вверх дверью.',
  'Десерт из долек клубники на деревянной тарелке.',
  'Два стакана освежающего морса из красных ягод.',
  'Купающиеся люди машут низко пролетающему самолету.',
  'Выдвижная полка с летней обувью.',
  'Подход к пляжу с огороженной местной растительностью.',
  'Автомобиль Ауди на улице.',
  'Салат из рыбы и овощей.',
  'Рыжий кот на рисе, буд-то суши-ролл.',
  'Отдыхающий на диване человек в домашней обуви как видеоигр.',
  'Пролетающий самоле над горами.',
  'Музыкальный хор репетирует перед выступлением.',
  'Красный ретро автомобиль внутри кирпичного здания.',
  'Демонстрация домашних тапочек с подсветкой, для хождений по дому ночью.',
  'Пальмы в вечернее время на фоне гостевых домиков.',
  'Местное блюдо из мяса с приправами.',
  'Купающийся человек на фоне заката.',
  'Взрослый краб на камне.',
  'Люди поднимают руки вверх на концерте известного исполнителя.',
  'Машина, проезжающая около высунувших морды бегемотов',
];

// const getRandomDescriptions = () => ({
//   description: `${getRandomArrayElement(DESCRIPTIONS)}`,
// });

// Создание рандомного имени
const NAMES = [
  'Иван',
  'Хуан',
  'Себастьян',
  'Марий',
  'Кристоф',
  'Виктор',
  'Юлий',
  'Люпита',
  'Вашингтон',
  'Абра',
];

const SURNAMES = [
  'Парарам',
  'Верон',
  'Кетчуп',
  'Мирабелла',
  'Вальц',
  'Пельмешка',
  'Онопко',
  'Тополёк',
  'Нионго',
  'Ирвинг',
  'Кадабра',
];

// const getRandomNames = () => ({
//   name: `${getRandomArrayElement(NAMES) } ${ getRandomArrayElement(SURNAMES)}`,
// });

// 8 комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

// const getRandomComments = () => ({
//   comments: `${getRandomArrayElement(MESSAGES)}`,
// });

// id
// url
// description
// likes
// comments
//   id
//   avatar
//   maessage
//   name

// Генерация комментариев, вкл. в себя id, аватарку, сообщение и имя пользователя
const makeComments = () => {
  const commentId = createId(1, 100);
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: `${getRandomArrayElement(MESSAGES)}`,
    name: `${getRandomArrayElement(NAMES) } ${ getRandomArrayElement(SURNAMES)}`
  };
};

// Генерация фото, вкл. в себя id, ссылку на фото, описание фото, кол-во лайков, массив комментариев
const makePhotosDescriptions = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: DESCRIPTIONS[index],
  likes: getRandomInteger(0, 100),
  comments: Array.from({length: getRandomInteger(0, 15) }, makeComments)
});

// Создание массива, в котором хранятся все данные
const photoDescriptions = Array.from({length: variableValue}, makePhotosDescriptions);

// Вызов массива данных в консоль
console.log(photoDescriptions);

