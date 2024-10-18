export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closeModal(modal) {
  document.removeEventListener("keydown", closeByEscape);
  closePopup(modal);
}

function closeByEscape(event) {
  if(event.key === 'Escape') {
     closePopup(document.querySelector('.popup_is-opened'));
  }
}

function closePopup(event) {
  document.removeEventListener("keydown", closeByEscape);
  event.classList.remove("popup_is-opened");
}
