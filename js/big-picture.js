const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictere');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

userModalOpenElement.onclick = function (evt) {
  evt.preventDefault();
  userModalElement.classList.remove('hidden');
};

userModalCloseElement.onclick = function (evt) {
  evt.preventDefault();
  userModalElement.classList.add('hidden');
};
