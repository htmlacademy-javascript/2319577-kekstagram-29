/* eslint-disable no-console */
// Первая функция для проверки длины строки
function checkLengthString (string, length) {
  return string.length <= length;
}

console.log(checkLengthString('строка для проверки', 25)); // true

// Вторая функция для проверки, является ли строка палиндромом
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
console.log(isPalindrom('А вот и нет')); // false

// Третья функция извлечения цифр из строки
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
