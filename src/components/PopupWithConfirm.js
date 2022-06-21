import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ callbackSubmitForm }, popupSelector) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
   
    this._buttonConfirm = this._popup.querySelector('.popup__form');
  }

  open(data) {
    this._data = data;
    super.open();
  }

  setEventListeners() {
    this._buttonConfirm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._data);
    });
    super.setEventListeners();
  }
}
