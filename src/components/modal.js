export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("click", handlePopupClose);
}

export function closeModal(modal) {
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("click", handlePopupClose);
  modal.classList.remove("popup_is-opened");
}

function handlePopupClose(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }

  if (evt.target.classList.contains("popup__close")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
