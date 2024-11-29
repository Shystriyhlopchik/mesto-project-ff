import { deleteCard } from "./api";

const SELECTORS = {
  card: ".card",
  cardDeleteButton: ".card__delete-button",
  cardLikeButton: ".card__like-button",
  cardTitle: ".card__title",
  cardImage: ".card__image",
  cardTemplate: "#card-template",
  cardLikeCount: ".card__like-count",
};

// @todo: Темплейт карточки
const template = document.querySelector(SELECTORS.cardTemplate);

export function createCard(data, removeCard, likeCard, viewImg, userId) {
  const { card, deleteBtn, likeBtn, cardTitle, cardImage, cardLikeCount } =
    getSelectors();

  if (data.owner["_id"] === userId) {
    deleteBtn.addEventListener("click", (event) => {
      const cardId = data["_id"];
      removeCard(event, cardId);
    });
  } else {
    deleteBtn.classList.add("card__delete-button_hidden");
  }

  likeBtn.addEventListener("click", likeCard);
  cardImage.addEventListener("click", (event) => {
    viewImg(event, data);
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardLikeCount.textContent = data.likes.length;

  return card;
}

function getSelectors() {
  const card = template.content.querySelector(SELECTORS.card).cloneNode(true);
  const deleteBtn = card.querySelector(SELECTORS.cardDeleteButton);
  const cardTitle = card.querySelector(SELECTORS.cardTitle);
  const cardImage = card.querySelector(SELECTORS.cardImage);
  const likeBtn = card.querySelector(SELECTORS.cardLikeButton);
  const cardLikeCount = card.querySelector(SELECTORS.cardLikeCount);

  return { card, deleteBtn, likeBtn, cardTitle, cardImage, cardLikeCount };
}

export function removeCard(event, cardId) {
  const item = event.target.closest(".places__item");

  deleteCard(cardId);

  item.remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
