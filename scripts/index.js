import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonEditClose = popupEditProfile.querySelector('.popup__close-button');
const formEditElement = document.querySelector('.popup__form');
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_job');
const nameText = document.querySelector('.profile__info-title');
const jobText = document.querySelector('.profile__info-subtitle');

const popupAddCard = document.querySelector('.popup_add-card');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAddClose = popupAddCard.querySelector('.popup__close-button');
const titleInput = popupAddCard.querySelector('.popup__input_type_title');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');
const formAddElement = popupAddCard.querySelector('.popup__form');

const popupImageFull = document.querySelector('.popup_full');
const fullImageClose = popupImageFull.querySelector('.popup__close-button');
const imageFull = popupImageFull.querySelector('.popup__image-full');
const imageFullTitle = popupImageFull.querySelector('.popup__image-title');

const popups = document.querySelectorAll('.popup');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// const cardTemplate = document.querySelector('#card').content;
const card = document.querySelector('.elements');

const validationParams = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
});

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

function closeOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
  }
}

popups.forEach(function (popup) {
  popup.addEventListener('click', closeOverlayClick);
})

function createCard (data) {
  const newCard = new Card(data, '#card');
  const addCard = newCard.generateCard();
  
  return addCard;
}

initialCards.forEach((data) => {
  card.append(createCard(data));
})

const formAddCard = (evt) => {
  evt.preventDefault();

  addFromForm({
    name: titleInput.value,
    link: linkInput.value,
  });

  closePopup(popupAddCard);
}

const addFromForm = (data) => {
  card.prepend(createCard(data));
}

initialCards.forEach((data) => {
  card.append(createCard(data));
})

formAddElement.addEventListener('submit', formAddCard);

// Попап добавления карточки
buttonAdd.addEventListener('click', function  () {
  formAddElement.reset();
  addProfileValidate.resetValidation();

  openPopup(popupAddCard);
})

// Попап редактирования профиля
buttonEdit.addEventListener('click', function () {
  formEditElement.reset();
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;

  editProfileValidate.resetValidation();
  openPopup(popupEditProfile);
})

// Pедактированиe профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  
  closePopup(popupEditProfile);
}

formEditElement.addEventListener('submit', handleProfileFormSubmit);

// Попап увеличения изображения
export function handleCardClick(name, link) {
  imageFull.src = link;
  imageFull.alt = name;
  imageFullTitle.textContent = name;

  openPopup(popupImageFull);
}

// Закрытие попапов
buttonEditClose.addEventListener('click', function  () {
  closePopup(popupEditProfile);
})

buttonAddClose.addEventListener('click', function  () {
  closePopup(popupAddCard);
})

fullImageClose.addEventListener('click', function  () {
  closePopup(popupImageFull);
});

const editProfileValidate = new FormValidator (validationParams, formEditElement);
editProfileValidate.enableValidation();

const addProfileValidate = new FormValidator (validationParams, formAddElement);
addProfileValidate.enableValidation();
