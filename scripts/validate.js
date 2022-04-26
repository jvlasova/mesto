const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.ErrorClass);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.ErrorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableButtonElement = (buttonElement, params) => {
  buttonElement.classList.add(params.inactiveButtonClass);
  buttonElement.disabled = true;
};

const activeButtonElement = (buttonElement, params) => {
  buttonElement.classList.remove(params.inactiveButtonClass);
  buttonElement.disabled = false;
};

const toggleButtonState = (inputList, buttonElement, params) => {
    if (hasInvalidInput(inputList)) {
      disableButtonElement(buttonElement, params);
    } else {
      activeButtonElement(buttonElement, params);
    }
};

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, params);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement, params);
    });
  });
};

const validationParams = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
});

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement,params);
  });
};

enableValidation(validationParams);
