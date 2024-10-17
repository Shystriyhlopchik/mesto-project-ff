const SELECTORS = {
  card: ".card",
  cardDeleteButton: ".card__delete-button",
  cardLikeButton: ".card__like-button",
  cardTitle: ".card__title",
  cardImage: ".card__image",
  cardTemplate: "#card-template",
};

// @todo: Темплейт карточки
const template = document.querySelector(SELECTORS.cardTemplate);

export function createCard(data, removeCard, likeCard, viewImg) {
  const { card, deleteBtn, likeBtn, cardTitle, cardImage } = getSelectors();

  deleteBtn.addEventListener("click", removeCard);
  likeBtn.addEventListener("click", likeCard);
  cardImage.addEventListener("click", (event) => {
    viewImg(event, data);
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;

  return card;
}

function getSelectors() {
  const card = template.content.querySelector(SELECTORS.card).cloneNode(true);
  const deleteBtn = card.querySelector(SELECTORS.cardDeleteButton);
  const cardTitle = card.querySelector(SELECTORS.cardTitle);
  const cardImage = card.querySelector(SELECTORS.cardImage);
  const likeBtn = card.querySelector(SELECTORS.cardLikeButton);

  return { card, deleteBtn, likeBtn, cardTitle, cardImage };
}
