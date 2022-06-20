import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ callbackSubmitForm }, popupSelector) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;

    this._formElement = this._popup.querySelector('.popup__form');
    this._inputElement = this._formElement.querySelectorAll('.popup__input');
    this._submitButton = this._formElement.querySelector('.popup__save-button');
    //this._popupButtonSave = this._popupButtonSave.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputElement.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  loading(loading, text) {
    if (loading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = text;
    }
  }
}
