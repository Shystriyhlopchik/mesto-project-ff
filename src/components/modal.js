import { SELECTORS } from "./constants";
import { createCard, likeCard, removeCard, viewImg } from "./card";

const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

const nameElement = document.querySelector(".profile__title");
const lessonsElement = document.querySelector(".profile__description");

export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  const popupForm = modal.querySelector(".popup__form");

  if (popupForm && modal.matches(SELECTORS.popupTypeEdit)) {
    editProfileForm.name.value = nameElement.textContent;
    editProfileForm.description.value = lessonsElement.textContent;
  }
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

const formElement = document.querySelector(".popup__form");

const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  nameElement.textContent = nameValue;
  lessonsElement.textContent = jobValue;

  closeModal(evt.target.closest(SELECTORS.popup));
}

formElement.addEventListener("submit", handleFormSubmit);

newPlaceForm.addEventListener("submit", handlePlaceFormSubmit);

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeNameVal = newPlaceForm["place-name"].value;
  const linkVal = newPlaceForm["link"].value;

  const newCard = createCard(
    {
      name: placeNameVal,
      link: linkVal,
    },
    removeCard,
    likeCard,
    viewImg,
  );

  const placesList = document.querySelector(".places__list");
  placesList.insertBefore(newCard, placesList.firstChild);

  newPlaceForm.reset();
  closeModal(evt.target.closest(SELECTORS.popup));
}
