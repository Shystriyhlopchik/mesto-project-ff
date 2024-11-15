import { initialCards } from "./cards";
import "../pages/index.css";
import { createCard, removeCard, likeCard } from "../components/card";
import { closeModal, openModal } from "../components/modal";
import { enableValidation } from "../components/validation";

const SELECTORS = {
  editButton: ".profile__edit-button",
  addButton: ".profile__add-button",
  cardImage: ".card__image",
  closeButton: ".popup__close",
  popup: ".popup",
  popupImg: ".popup__image",
  popupCaption: ".popup__caption",
  placesList: ".places__list",
  popupTypeEdit: ".popup_type_edit",
  popupTypeNewCard: ".popup_type_new-card",
  popupTypeImage: ".popup_type_image",
  pageContent: ".page__content",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
};

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const actionMap = [
  {
    selector: SELECTORS.editButton,
    action: () => {
      populateEditProfileForm();
      openModal(popupEdit);
    },
  },
  {
    selector: SELECTORS.addButton,
    action: () => openModal(popupNewCard),
  },
  {
    selector: SELECTORS.cardImage,
    action: () => openModal(popupImage),
  },
  {
    selector: SELECTORS.closeButton,
    action: (target) => {
      const popup = target.closest(SELECTORS.popup);
      closeModal(popup);
    },
  },
  {
    selector: SELECTORS.popup,
    action: (target) => {
      closeModal(target);
    },
  },
];

// @todo: Формы
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

// @todo: DOM узлы
const placesList = document.querySelector(SELECTORS.placesList);
const popupEdit = document.querySelector(SELECTORS.popupTypeEdit);
const popupNewCard = document.querySelector(SELECTORS.popupTypeNewCard);
const popupImage = document.querySelector(SELECTORS.popupTypeImage);
const pageContent = document.querySelector(SELECTORS.pageContent);
const nameElement = document.querySelector(SELECTORS.profileTitle);
const lessonsElement = document.querySelector(SELECTORS.profileDescription);

// @todo: Вывести карточки на страницу
const fragment = document.createDocumentFragment();

initialCards.forEach((card) => {
  const newCard = createCard(card, removeCard, likeCard, viewImg);
  fragment.appendChild(newCard);
});

placesList.appendChild(fragment);

// @todo: прослушивание событий
pageContent.addEventListener("click", (evt) => {
  const target = evt.target;
  const actionObj = actionMap.find((item) => {
    return target.matches(item.selector);
  });

  if (actionObj) {
    actionObj.action(target);
  }
});

newPlaceForm.addEventListener("submit", handlePlaceFormSubmit);

function viewImg(event, data) {
  const cardImage = document.querySelector(SELECTORS.popupImg);
  const popupCaption = document.querySelector(SELECTORS.popupCaption);

  const actionItem = actionMap.find((item) => {
    return item.selector === SELECTORS.cardImage;
  });

  cardImage.setAttribute("src", data.link);
  popupCaption.textContent = data.name;

  actionItem.action();
}

function handleProfileFormSubmit(evt) {
  const formElement = document.querySelector(".popup__form");
  const nameElement = document.querySelector(".profile__title");
  const lessonsElement = document.querySelector(".profile__description");
  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  nameElement.textContent = nameValue;
  lessonsElement.textContent = jobValue;

  closeModal(evt.target.closest(SELECTORS.popup));
}

function populateEditProfileForm() {
  editProfileForm.name.value = nameElement.textContent;
  editProfileForm.description.value = lessonsElement.textContent;

  editProfileForm.addEventListener("submit", handleProfileFormSubmit);
}

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

enableValidation(settings);
