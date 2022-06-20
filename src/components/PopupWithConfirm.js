import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ callbackSubmitForm }, popupSelector) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
   
    //this._buttonConfirm = this._popup.querySelector('.popup__form');
    this._buttonConfirm = this._popup.querySelector('.popup__save-button');
  }

  open(element, id) {
    this._element = element;
    this._element_id = id;
    super.open();
  }

  setEventListeners() {
    this._buttonConfirm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._element, this._element_id);
    });
    super.setEventListeners();
  }
}
