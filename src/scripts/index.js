import { initialCards } from "./cards";
import "../pages/index.css";
import { createCard } from "../components/card";
import { closeModal, openModal } from "../components/modal";
import { SELECTORS } from "../components/constants";

export const actionMap = [
  {
    selector: SELECTORS.editButton,
    action: () => {
      populateEditProfileForm();
      openModal(popupEdit);
    },
  },
  {
    selector: SELECTORS.addButton,
    action: () => {
      const newPlaceForm = document.forms["new-place"];
      newPlaceForm.addEventListener("submit", handlePlaceFormSubmit);
      openModal(popupNewCard)
    },
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

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const pageContent = document.querySelector(".page__content");
const nameElement = document.querySelector(".profile__title");
const lessonsElement = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

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

function removeCard(event) {
  const item = event.target.closest(".places__item");

  item.remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
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