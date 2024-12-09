import "../pages/index.css";
import { createCard, removeCard, likeCard } from "../components/card";
import { closeModal, openModal } from "../components/modal";
import {
  clearValidation,
  deactivateButton,
  enableValidation,
} from "../components/validation";
import {
  addNewCard,
  getListCards,
  getUserInformation,
  updateAvatar,
  updateUserProfile,
} from "../components/api";

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
  profileImage: ".profile__image",
  popupAvatar: ".popup_type_avatar",
  popupButton: ".popup__button",
  popupInputTypeName: ".popup__input_type_name",
  popupInputTypeDescription: ".popup__input_type_description",
};

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userID = null;

// @todo: Формы
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const editAvatarForm = document.forms["edit-avatar"];

// @todo: DOM узлы
const placesList = document.querySelector(SELECTORS.placesList);
const popupNewCard = document.querySelector(SELECTORS.popupTypeNewCard);
const popupImage = document.querySelector(SELECTORS.popupTypeImage);
const nameElement = document.querySelector(SELECTORS.profileTitle);
const lessonsElement = document.querySelector(SELECTORS.profileDescription);
const imgElement = document.querySelector(SELECTORS.profileImage);
const profileEditBtn = document.querySelector(SELECTORS.editButton);
const addBtn = document.querySelector(SELECTORS.addButton);
const popupAvatar = document.querySelector(SELECTORS.popupAvatar);
const popupAvatarBtn = popupAvatar.querySelector(SELECTORS.popupButton);
const cardImage = document.querySelector(SELECTORS.popupImg);
const popupCaption = document.querySelector(SELECTORS.popupCaption);
const formElement = document.querySelector(settings.formSelector);
const nameInput = formElement.querySelector(SELECTORS.popupInputTypeName);
const jobInput = formElement.querySelector(SELECTORS.popupInputTypeDescription);
const popupProfileEdit = document.querySelector(SELECTORS.popupTypeEdit);

// @todo: Вывести карточки на страницу
const fragment = document.createDocumentFragment();

Promise.all([getListCards(), getUserInformation()])
  .then(([cards, user]) => {
    userID = user["_id"];

    cards.forEach((card) => {
      const newCard = createCard(card, removeCard, likeCard, viewImg, userID);
      fragment.appendChild(newCard);
    });

    return { fragment, user };
  })
  .then(({ fragment, user }) => {
    populateUserProfile(user);
    placesList.appendChild(fragment);
  })
  .catch((err) => {
    console.log(err);
  });

// @todo: Прослушивание клика по кнопке редактирования пользователя
profileEditBtn.addEventListener("click", () => {
  populateEditProfileForm();
  clearValidation(popupProfileEdit, settings);
  openModal(popupProfileEdit, settings);
});

// @todo: Прослушивание клика по добавлению новой карточки
addBtn.addEventListener("click", () => {
  openModal(popupNewCard, settings);
});

imgElement.addEventListener("click", () => {
  clearValidation(popupAvatar, settings);
  editAvatarForm.reset();
  deactivateButton(popupAvatarBtn, settings);
  openModal(popupAvatar, settings);
});

newPlaceForm.addEventListener("submit", handlePlaceFormSubmit);
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function viewImg(event, data) {
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  popupCaption.textContent = data.name;
  openModal(popupImage, settings);
}

function populateEditProfileForm() {
  editProfileForm.name.value = nameElement.textContent;
  editProfileForm.description.value = lessonsElement.textContent;
}

function handleProfileFormSubmit(evt) {
  const btn = evt.target.querySelector(SELECTORS.popupButton);

  evt.preventDefault();

  renderLoading(true, btn);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  updateUserProfile(nameValue, jobValue)
    .then((res) => {
      nameElement.textContent = res.name;
      lessonsElement.textContent = res.about;
      closeModal(popupProfileEdit);
      deactivateButton(btn, settings);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btn);
    });
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const btn = evt.target.querySelector(SELECTORS.popupButton);
  const placeNameVal = newPlaceForm["place-name"].value;
  const linkVal = newPlaceForm["link"].value;

  renderLoading(true, btn);

  addNewCard(placeNameVal, linkVal)
    .then((res) => {
      const newCard = createCard(res, removeCard, likeCard, viewImg, userID);

      placesList.insertBefore(newCard, placesList.firstChild);
      closeModal(popupNewCard);
      newPlaceForm.reset();
      deactivateButton(btn, settings);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btn);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const btn = evt.target.querySelector(SELECTORS.popupButton);
  const urlAvatar = editAvatarForm["link"].value;

  renderLoading(true, btn);

  updateAvatar(urlAvatar)
    .then((user) => {
      populateUserProfile(user);
      closeModal(popupAvatar);
      deactivateButton(btn, settings);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btn);
    });
}

function populateUserProfile(user) {
  nameElement.textContent = user.name;
  lessonsElement.textContent = user.about;
  imgElement.style = `background-image: url('${user.avatar}')`;
}

function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

enableValidation(settings);
