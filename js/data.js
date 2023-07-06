import {getRandomInteger, getRandomArrayElement, createId} from './util.js';

const PHOTOS_COUNT = 25;
const LIKES_MIN_COUNT = 0;
const LIKES_MAX_COUNT = 100;
const COMMENTS_MAX_COUNT = 5;

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

const COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const getCommentText = () => Array.from({length:
  getRandomInteger(1, 3)}, () =>
  getRandomArrayElement(COMMENT_TEXTS)).join(' ');

const getCommentObj = () => {
  const commentId = createId(1, 100);
  return {
    id: commentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: `${getCommentText()}`,
    name: `${getRandomArrayElement(NAMES) } ${ getRandomArrayElement(SURNAMES)}`
  };
};

const getPhotosObj = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: DESCRIPTIONS[index - 1],
  // description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length)],
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(1, COMMENTS_MAX_COUNT) }, getCommentObj)
});

const getPhotosData = () => {
  const photoDescriptions = Array.from({length: PHOTOS_COUNT}, (_, index) => getPhotosObj(index + 1));
  return photoDescriptions;
};

export const data = getPhotosData(PHOTOS_COUNT);
