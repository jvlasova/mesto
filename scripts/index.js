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

const cardTemplate = document.querySelector('#card').content;
const card = document.querySelector('.elements');

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

// Добавление карточек JS
function createCard(cardData) {
  const addCard = cardTemplate.cloneNode(true);
  const cardElementImage = addCard.querySelector('.element__image')

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  addCard.querySelector('.element__title').textContent = cardData.name;

  addCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })

  addCard.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  })

  cardElementImage.addEventListener ('click', function (){
    imageFull.src = cardData.link;
    imageFull.alt = cardData.name;
    imageFullTitle.textContent = cardData.name;
  
    openPopup(popupImageFull);
  });

  return addCard;
}

initialCards.forEach(function (cardData) {
  const addCard = createCard(cardData);
  card.append(addCard);
});

// Добавление карточек через форму
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  const addCard = createCard({
    name: titleInput.value,
    link: linkInput.value,
  });
  
  card.prepend(addCard);

  disableButtonElement(evt.currentTarget.querySelector('.popup__save-button'), validationParams);
  closePopup(popupAddCard);
}
  
formAddElement.addEventListener('submit', handleAddCardFormSubmit);

// Попап добавления карточки
buttonAdd.addEventListener('click', function  () {
  formAddElement.reset();
  openPopup(popupAddCard);
})

// Попап редактирования профиля
buttonEdit.addEventListener('click', function  () {
  openPopup(popupEditProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
})

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  
  formEditElement.reset();
  closePopup(popupEditProfile);
}

formEditElement.addEventListener('submit', handleProfileFormSubmit); 

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

// Добавление карточек из массива
renderInitialCards(initialCards);
