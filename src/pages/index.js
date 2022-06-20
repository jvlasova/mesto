import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { 
  buttonEdit,
  formEditElement,
  nameInput,
  jobInput,
  buttonEditAvatar,
  formEditAvatarElement,
  buttonAdd,
  formAddElement,
  validationParams,
  popupProfileValues,
  cardListSelector,
} from '../utils/constants.js';

let userId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '1092593e-d6f7-499d-b868-9d307e9b3297',
    'Content-Type': 'application/json',
  }
})

const createUserInfo = new UserInfo(popupProfileValues);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([profile, cards]) => {
    createUserInfo.setUserInfo(profile);
    userId = profile._id;
    createCard.renderItems(cards);
  })
  .catch((error) => {
    console.log(error);
})

const openImageFull = new PopupWithImage('.popup_full');
openImageFull.setEventListeners();

const deleteCardPopup = new PopupWithConfirm(
  {
    callbackSubmitForm: (element, id) => { 
      api.deleteCard(id)
      .then(() => {
        element.removeCard();
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
    })
      .finally(() => {
        deleteCardPopup.close();
    })
  }
}, '.popup_confirm');
deleteCardPopup.setEventListeners();

const createNewCard = (data) => {
  const card = new Card({ data, userId,
    handleCardClick: () => {
      openImageFull.open(data.name, data.link);
    },
    handleDeleteCardClick: (element, id) => {
      deleteCardPopup.open(element, id);
    },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api.removeLike(card.cardId())
        .then((data) => {
          card.likesInfo(data.likes);
        })
        .catch(error => {
          console.log(`ERROR: ${error}`)
        });
      } else {
        api.setLike(card.cardId())
          .then((data) => {
            card.likesInfo(data.likes);
        })
        .catch(error => {
          console.log(`ERROR: ${error}`)
        });
      }
    },
  },
  '#card');
  //const cardElement = card.generateCard();
  return card.generateCard();
};

const createCard = new Section({ 
  renderer: (items) => {
  createCard.addItem(createNewCard(items));
  }
}, cardListSelector);

const popupWithFormAdd = new PopupWithForm(
  {
    callbackSubmitForm: (data) => {
      popupWithFormAdd.loading(true, 'Сохранение...');
      api.addCard(data)
        .then((resolve) => {
          const cardFromPopup = createNewCard(resolve);
          createCard.addItem(cardFromPopup);
          popupWithFormAdd.loading(true, 'Сохранение...');
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
        .finally(() => {
          popupWithFormAdd.loading(false, 'Сохранить');
          popupWithFormAdd.close();
        })
    }
  }, '.popup_add-card');
popupWithFormAdd.setEventListeners();

const popupWithFormEdit = new PopupWithForm(
  {
    callbackSubmitForm: (data) => {
      popupWithFormEdit.loading(true, 'Сохранение...');
      api.editProfile(data)
        .then((resolve) => {
          createUserInfo.setUserInfo(resolve);
          popupWithFormEdit.loading(true, 'Сохранение...');
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
        .finally(() => {
          popupWithFormEdit.loading(false, 'Сохранить');
          popupWithFormEdit.close();
        })
    }
  }, '.popup_edit-profile');
popupWithFormEdit.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(
  {
    callbackSubmitForm: (data) => {
      popupWithFormAvatar.loading(true, 'Сохранение...');
      api.editAvatarProfile(data)
        .then((resolve) => {
          createUserInfo.setUserInfo(resolve);
          popupWithFormAvatar.loading(true, 'Сохранение...');
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
        .finally(() => {
          popupWithFormAvatar.loading(false, 'Сохранить')
          popupWithFormAvatar.close();
        })
    }
  }, '.popup_edit-avatar');
  popupWithFormAvatar.setEventListeners();

function editFormProfile() {
  const profileValues = createUserInfo.getUserInfo();
  nameInput.value = profileValues.nameValueSelector;
  jobInput.value = profileValues.jobValueSelector;
  editProfileValidate.resetValidation();
  popupWithFormEdit.open();
}

buttonEdit.addEventListener('click', () => {
  editFormProfile();
});

buttonEditAvatar.addEventListener('click', () => {
  editAvatarProfileValidate.resetValidation();
  popupWithFormAvatar.open();
})

buttonAdd.addEventListener('click', () => {
  addProfileValidate.resetValidation();
  popupWithFormAdd.open();
})

const editProfileValidate = new FormValidator (validationParams, formEditElement);
editProfileValidate.enableValidation();

const editAvatarProfileValidate = new FormValidator (validationParams, formEditAvatarElement);
editAvatarProfileValidate.enableValidation();

const addProfileValidate = new FormValidator (validationParams, formAddElement);
addProfileValidate.enableValidation();
