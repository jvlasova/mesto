export default class FormValidator {
  constructor (params, form) {
    this._input = params.inputSelector;
    this._submitButton = params.submitButtonSelector;
    this._inactiveButton = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
    this._form = form;

    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._ErrorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._ErrorClass);
    errorElement.textContent = '';
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButtonElement = () => {
    this._buttonElement.classList.add(this._inactiveButton);
    this._buttonElement.disabled = true;
  }

  _activeButtonElement = () => {
    this._buttonElement.classList.remove(this._inactiveButton);
    this._buttonElement.disabled = false;
  }

  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButtonElement(this._buttonElement);
    } else {
      this._activeButtonElement(this._buttonElement);
    };
  }

  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState(this._inputList);
      });
    });
  }

  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  } 

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
};
