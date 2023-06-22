/* eslint-disable no-console */
console.log('Первая функция (2.29. Нужно больше функций)');
/**
 * Функция проверки длины строки
 * @param {string} string  тестируемая строка
 * @param {number} length кол-во символов, длина строки
 * @returns {boolean} true, если количество букв в строке <= заданной длине, иначе - false
 */

function checkLengthString (string, length) {
  return string.length <= length;
}

console.log(checkLengthString('строка для проверки', 25)); // true
console.log(checkLengthString('тут что-то написано, но это не важно', 15)); // false

//
console.log('Вторая функция (2.29. Нужно больше функций)');
/**
 * Функция для проверки, является ли строка палиндромом
 * @param {string} rawString строка для проверки
 * @return {boolean} true, если строка - палиндром, иначе - false
 */

function isPalindrom(rawString) {
  const string = rawString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[string.length - i - 1]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrom('топот')); // true
console.log(isPalindrom('ДовОд')); // true
console.log(isPalindrom('Око')); // true
console.log(isPalindrom('saippuakivikauppias')); // true
console.log(isPalindrom('Лёша на полке клопа нашёл')); // true
console.log(isPalindrom('А вот и нет')); // false

//
console.log('Третья функция (2.29. Нужно больше функций)');
/**
 * Функция извлечения цифр из строки
 * @param {string} arg строка для проверки
 * @return {number} выводит число из строки, если таковое имеется, иначе - NaN
 */

function extractNumber(arg) {
  const string = arg.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

console.log(extractNumber('2023 год')); // 2023
console.log(extractNumber('ECMAScript 2022')); // 2022
console.log(extractNumber('1 кефир, 0.5 батона')); // 105
console.log(extractNumber('агент 007')); // 7
console.log(extractNumber('а я томат')); // NaN

//
console.log('Четвертая функция (5.16. Функции возвращаются "Делу — время")');
/**
 * Функция проверки, будет ли встреча в течении дня, или нет
 * @param {string} startDay время начала рабочего дня
 * @param {string} endDay время окончания рабочего дня
 * @param {string} startMeeting время начала встречи
 * @param {number} timeMeeting длительность встречи в минутах
 * @return {boolean} true - если встреча в течении рабочего дня состоится, иначе - false
 */

function willBeMeeting (startDay, endDay, startMeeting, timeMeeting) {
  const timeMeetingToHHMM = `${Math.floor(timeMeeting / 60)}:${timeMeeting % 60}`; //минуты в формат HH:MM
  // console.log(timeMeetingToHHMM);
  if (parseFloat(startMeeting.replace(':', '.')) + parseFloat(timeMeetingToHHMM.replace(':', '.')) <= parseFloat(endDay.replace(':', '.')) && startMeeting.replace(':', '.') >= parseFloat(startDay.replace(':', '.'))) {
    return true;
  } else {
    return false;
  }
}

console.log(willBeMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(willBeMeeting('08:00', '17:30', '16:40', 90)); // false
console.log(willBeMeeting('9:00', '12:45', '12:00', 45)); // true
console.log(willBeMeeting('8:0', '10:0', '8:0', 120)); // true
console.log(willBeMeeting('8:0', '10:0', '8:05', 120)); // false
console.log(willBeMeeting('8:00', '17:30', '16:00', 900)); // false
