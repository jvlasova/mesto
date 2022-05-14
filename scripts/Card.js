import { handleImageFullClick } from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const addCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return addCard;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._cardElementImage = this._element.querySelector('.element__image');
    this._cardElementTitle = this._element.querySelector('.element__title');
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;
    this._cardElementTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners = () => {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrashClick();
    });
    
    this._cardElementImage.addEventListener('click', () => {
      handleImageFullClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  
  _handleTrashClick() {
    this._element.remove();
  }
};
