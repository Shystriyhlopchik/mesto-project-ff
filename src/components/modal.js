export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closeModal(modal) {
  document.removeEventListener("keydown", closeByEscape);
  modal.classList.remove("popup_is-opened");
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
