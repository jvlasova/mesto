import { handleCardClick } from './index.js';

export class Card {
  constructor(data, cardSelector, /*handleCardClick*/) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    //this._handleCardClick = handleCardClick;
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
    this._buttonLike = this._element.querySelector('.element__like');
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;
    this._cardElementTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners = () => {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrashClick();
    });
    
    this._cardElementImage.addEventListener('click', () => {
      handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle('element__like_active');
  }
  
  _handleTrashClick() {
    this._element.remove();
    this._element = null;
  }
};
