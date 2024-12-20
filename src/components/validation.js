export function enableValidation(selectors) {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector),
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
}

export function clearValidation(profileForm, validationConfig) {
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector,
  );

  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector),
  );

  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}

export function deactivateButton(buttonElement, settings) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
}

const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    selectors.submitButtonSelector,
  );

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

function toggleButtonState(inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    deactivateButton(buttonElement, selectors);
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const checkInputValidity = (formElement, inputElement, selectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selectors,
    );
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};
