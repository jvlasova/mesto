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
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

// Добавление карточек JS
function createCard(cardName, cardLink) {
  const addCard = cardTemplate.cloneNode(true);

  addCard.querySelector('.element__image').src = cardLink;
  addCard.querySelector('.element__image').alt = cardName;
  addCard.querySelector('.element__title').textContent = cardName;

  addCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  })

  addCard.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  })

  addCard.querySelector('.element__image').addEventListener ('click', function (){
    imageFull.src = cardLink;
    imageFull.alt = cardName;
    imageFullTitle.textContent = cardName;
  
    openPopup(popupImageFull);
  })
  return addCard;
}

function renderInitialCards(initialCards) {
  initialCards.forEach((item) => {
    cards.append(createCard(item.name, item.link));
  })
}

// Добавление карточек через форму
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  
  cards.prepend(createCard(titleInput.value, linkInput.value));

  formAddElement.reset();
  closePopup(popupAddCard);
}
  
formAddElement.addEventListener('submit', handleAddCardFormSubmit);

// Попап редактирования профиля
editButton.addEventListener('click', function  () {
  openPopup(popupEditProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
})

closeEditButton.addEventListener('click', function  () {
  closePopup(popupEditProfile);
})

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;

  formEditElement.reset();
  closePopup(popupEditProfile);
}

formEditElement.addEventListener('submit', handleProfileFormSubmit); 

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

// Добавление карточек из массива
renderInitialCards(initialCards);
