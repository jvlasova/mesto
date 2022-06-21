export default class Card {
  constructor({ data, userId, handleCardClick, handleLikeClick, handleDeleteCardClick },cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner;
    this._userId = userId;
   
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard(){
    this._element = this._getTemplate();
    this._cardElementImage = this._element.querySelector('.element__image');
    this._cardElementTitle = this._element.querySelector('.element__title');
    this._buttonLike = this._element.querySelector('.element__like');
    this._likesCounter = this._element.querySelector('.element__like-counter');
    this._buttonTrash = this._element.querySelector('.element__trash');
      
    this._cardElementImage.alt = this._name;
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.src = this._link;

    this._buttonTrashVisible();
    this.upgradeLikes();

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners = () => {
    this._cardElementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    }); 

    this._buttonTrash.addEventListener('click', () => {
      this._handleDeleteCardClick();
    });
    
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }
  
  isLiked () {
    return this._likes.some((item) => item._id === this._userId);
  }

  upgradeLikes() {
    this._likesCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._buttonLike.classList.add('element__like_active');
    } else {
        this._buttonLike.classList.remove('element__like_active');
    } 
  }

  likesInfo(likes) {
    this._likes = likes;
    this.upgradeLikes();
  }

  _buttonTrashVisible() {
    if (this._userId !== this._ownerId._id) {
      this._buttonTrash.remove();
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  cardId() {
    return this._cardId;
  }
};
