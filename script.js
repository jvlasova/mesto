const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-job');

let nameText = document.querySelector('.profile__info-title');
let jobText = document.querySelector('.profile__info-subtitle');

function openPopup () {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

function closePopup () {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 
