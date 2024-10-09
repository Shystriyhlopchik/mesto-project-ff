// @todo: Темплейт карточки
import { actionMap } from "../scripts";
import { SELECTORS } from "./constants";

const template = document.querySelector("#card-template");

export function createCard(data, removeCard, likeCard, viewImg) {
  const card = template.content.querySelector(".card").cloneNode(true);
  const deleteBtn = card.querySelector(".card__delete-button");
  const likeBtn = card.querySelector(".card__like-button");
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  deleteBtn.addEventListener("click", removeCard);
  likeBtn.addEventListener("click", likeCard);
  cardImage.addEventListener("click", (event) => viewImg(event, data));

  return card;
}

// @todo: Функция удаления карточки
export function removeCard(event) {
  const item = event.target.closest(".places__item");

  item.remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function viewImg(event, data) {
  const actionItem = actionMap.find((item) => {
    return item.selector === SELECTORS.cardImage;
  });

  actionItem.action();
  editingImg(data);
  event.stopPropagation();
}

function editingImg(data) {
  const cardImage = document.querySelector(SELECTORS.popupImg);
  const popupCaption = document.querySelector(SELECTORS.popupCaption);

  cardImage.setAttribute("src", data.link);
  popupCaption.textContent = data.name;
}
