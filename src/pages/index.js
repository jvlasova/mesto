import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { 
  buttonEdit,
  formEditElement,
  nameInput,
  jobInput,
  buttonAdd,
  formAddElement,
  initialCards,
  validationParams,
  popupProfileValues
} from '../utils/constants.js';

const openImageFull = new PopupWithImage('.popup_full');
openImageFull.setEventListeners();

function handleCardClick(name, link) {
  openImageFull.open(name, link);
}

const createNewCard = (data) => {
  const card = new Card({ data, handleCardClick }, '#card');
  const cardElement = card.generateCard();
  return cardElement;
};

const createCard = new Section({ 
  items: initialCards,
  renderer: (item) => {
  const cardFromServer = createNewCard(item);
  createCard.addItem(cardFromServer);
  }
}, '.elements');
createCard.renderItems();

const createUserInfo = new UserInfo(popupProfileValues);

function editFormProfile() {
  const profileValues = createUserInfo.getUserInfo();
  nameInput.value = profileValues.nameValueSelector;
  jobInput.value = profileValues.jobValueSelector;
  editProfileValidate.resetValidation();
  popupWithFormEdit.open();
}

const popupWithFormEdit = new PopupWithForm(
  {
    callbackSubmitForm: (data) => {
      createUserInfo.setUserInfo(data);
      popupWithFormEdit.close();
    }
  }, '.popup_edit-profile');
popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm(
  {
    callbackSubmitForm: (data) => {
      const cardFromPopup = createNewCard(data);
      createCard.addItem(cardFromPopup);
      popupWithFormAdd.close();
    }
  }, '.popup_add-card');
popupWithFormAdd.setEventListeners();

buttonEdit.addEventListener('click', () => {
  editFormProfile();
});

buttonAdd.addEventListener('click', () => {
  addProfileValidate.resetValidation();
  popupWithFormAdd.open();
})

const editProfileValidate = new FormValidator (validationParams, formEditElement);
editProfileValidate.enableValidation();

const addProfileValidate = new FormValidator (validationParams, formAddElement);
addProfileValidate.enableValidation();
