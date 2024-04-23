const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj['inputErrorClass']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj['errorClass']);
};

const checkInputPatternValidity = (inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        checkInputPatternValidity(inputElement);
        return !inputElement.validity.valid;
    });
};
const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj['inactiveButtonClass']);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(obj['inactiveButtonClass']);
        buttonElement.removeAttribute('disabled', '');
    }
};

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj['inputErrorClass']);
    errorElement.classList.remove(obj['errorClass']);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, obj) => {
    checkInputPatternValidity(inputElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj['inputSelector']));
    const buttonElement = formElement.querySelector(obj['submitButtonSelector']);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

export const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj['formSelector']));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, obj);
    });
};

export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig['inputSelector']));
    const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector']);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
        inputElement.setCustomValidity('');
    });
    buttonElement.classList.add(validationConfig['inactiveButtonClass']);
}