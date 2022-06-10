import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFull = this._popup.querySelector('.popup__image-full');
    this._imageFullTitle = this._popup.querySelector('.popup__image-title');
  }

  open(name, link) {
    this._imageFull.src = link;
      this._imageFull.alt = name;
      this._imageFullTitle.textContent = name;
      super.open();
  }
}
