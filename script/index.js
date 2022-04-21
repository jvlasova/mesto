const popupEditProfile = document.querySelector('.popup_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupEditProfile.querySelector('.popup__close-button');
const formEditElement = document.querySelector('.popup__form');
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_job');
const nameText = document.querySelector('.profile__info-title');
const jobText = document.querySelector('.profile__info-subtitle');

const popupAddCard = document.querySelector('.popup_add-card');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = popupAddCard.querySelector('.popup__close-button');
const titleInput = popupAddCard.querySelector('.popup__input_type_title');
const linkInput = popupAddCard.querySelector('.popup__input_type_link');
const formAddElement = popupAddCard.querySelector('.popup__form');

const popupImageFull = document.querySelector('.popup_full');
const closeImageFull = popupImageFull.querySelector('.popup__close-button');
const imageFull = popupImageFull.querySelector('.popup__image-full');
const imageFullTitle = popupImageFull.querySelector('.popup__image-title');


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

const popups = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements');

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup);
  }
}

function closeOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
  }
}

popups.forEach(function (popup) {
  popup.addEventListener('click', closeOverlayClick);
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
  const popupForm = popup.querySelector('.popup__form')
  if (popupForm) {
      popupForm.reset()
  }
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

// Добавление карточек JS
initialCards.forEach(function (element) {
  const addCard = cardTemplate.cloneNode(true);

  addCard.querySelector('.element__image').alt = element.name;
  addCard.querySelector('.element__image').src = element.link;
  addCard.querySelector('.element__title').textContent = element.name;

  addCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })

  addCard.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  })

  addCard.querySelector('.element__image').addEventListener ('click', function (){
    imageFull.src = element.link;
    imageFull.alt = element.name;
    imageFullTitle.textContent = element.name;
 
    openPopup(popupImageFull);
  })
  
  cards.append(addCard);
})

// Добавление карточек через форму
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.element__image').alt = titleInput.value;
  newCard.querySelector('.element__image').src = linkInput.value;
  newCard.querySelector('.element__title').textContent = titleInput.value;
  
  newCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })
    
  newCard.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  })

  cards.prepend(newCard);
  closePopup(popupAddCard);
}
  
formAddElement.addEventListener('submit', formAddCardSubmitHandler); 

// Попап редактирования профиля
editButton.addEventListener('click', function  () {
  openPopup(popupEditProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
})

closeEditButton.addEventListener('click', function  () {
  closePopup(popupEditProfile);
})

function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;  
  closePopup(popupEditProfile);
}

formEditElement.addEventListener('submit', formEditSubmitHandler); 

// Попап добавления карточки
addButton.addEventListener('click', function  () {
  openPopup(popupAddCard);
})

closeAddButton.addEventListener('click', function  () {
  closePopup(popupAddCard);
})

// Закрытие попапа увеличения картинки
closeImageFull.addEventListener('click', function  () {
  closePopup(popupImageFull);
})
