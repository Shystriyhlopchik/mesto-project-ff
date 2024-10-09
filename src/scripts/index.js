import { initialCards } from "./cards";
import "../pages/index.css";
import { createCard, likeCard, removeCard } from "../components/card";
import { closeModal, openModal } from "../components/modal";
import { SELECTORS } from "../components/constants";

const actionMap = [
  {
    selector: SELECTORS.editButton,
    action: () => openModal(popupEdit),
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

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const pageContent = document.querySelector(".page__content");

// @todo: Вывести карточки на страницу
const fragment = document.createDocumentFragment();

initialCards.forEach((card) => {
  const newCard = createCard(card, removeCard, likeCard);
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

document.addEventListener("keydown", (evt) => {
  if (evt.code === "Escape") {
    const nodeList = pageContent.querySelectorAll(SELECTORS.popup);
    const arrList = Array.from(nodeList);

    const popup = arrList.find((item) => {
      return item.matches(SELECTORS.popupIsOpened);
    });

    closeModal(popup);
  }
});
