import { initialCards } from "./cards";
import "../pages/index.css";
// @todo: Темплейт карточки
const template = document.querySelector("#card-template");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(data, removeCard) {
  const card = template.content.querySelector(".card").cloneNode(true);
  const deleteBtn = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  deleteBtn.addEventListener("click", removeCard);

  return card;
}

// @todo: Функция удаления карточки
function removeCard(event) {
  const item = event.target.closest(".places__item");

  item.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const newCard = createCard(card, removeCard);

  placesList.appendChild(newCard);
});

console.log("Hello, World!");
