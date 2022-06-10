export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonEditClose = popupEditProfile.querySelector('.popup__close-button');
export const formEditElement = document.querySelector('.popup__form');
export const nameInput = formEditElement.querySelector('.popup__input_type_name');
export const jobInput = formEditElement.querySelector('.popup__input_type_job');
export const popupProfileValues = {
  nameValueSelector: '.profile__info-title',
  jobValueSelector: '.profile__info-subtitle',
};

export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonAddClose = popupAddCard.querySelector('.popup__close-button');

export const titleInput = popupAddCard.querySelector('.popup__input_type_title');
export const linkInput = popupAddCard.querySelector('.popup__input_type_link');

export const formAddElement = popupAddCard.querySelector('.popup__form');

export const fullImageClose = popupImageFull.querySelector('.popup__close-button');
export const imageFull = popupImageFull.querySelector('.popup__image-full');
export const imageFullTitle = popupImageFull.querySelector('.popup__image-title');

export const initialCards = [
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

export const validationParams = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
});
