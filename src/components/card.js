// @todo: Темплейт карточки
const template = document.querySelector("#card-template");

export function createCard(data, removeCard) {
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
export function removeCard(event) {
  const item = event.target.closest(".places__item");

  item.remove();
}
