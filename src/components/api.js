const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "929e59f8-718a-413d-aeb7-fc29da52656d",
    "Content-Type": "application/json",
  },
};

function get(url) {
  return fetch(config.baseUrl + `/${url}`, {
    headers: config.headers,
  });
}

function patch(url, params) {
  return fetch(config.baseUrl + `/${url}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(params),
  });
}

function post(url, params) {
  return fetch(config.baseUrl + `/${url}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(params),
  });
}

function dlt(url, cardId) {
  return fetch(config.baseUrl + `/${url}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

function put(url, cardId) {
  return fetch(config.baseUrl + `/${url}/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

/**
 * Функция получения списка карточек
 * @return { Promise }
 */
export function getListCards() {
  return get("cards").then((res) => {
    return getResponseData(res);
  });
}

/**
 * Загрузка информации о пользователе с сервера
 * @return { Promise }
 */
export function getUserInformation() {
  return get("users/me").then((res) => {
    return getResponseData(res);
  });
}

/**
 * редактирование профиля пользователя
 * @param { string } name Имя пользователя
 * @param { string } job Занятия пользователя
 * @return { Promise }
 */
export function updateUserProfile(name, job) {
  const params = { name, about: job };

  return patch("users/me", params).then((res) => {
    return getResponseData(res);
  });
}

/**
 * редактирование профиля пользователя
 * @param { string } name Название изображения
 * @param { string } link Ссылка на изображение
 * @return { Promise }
 */
export function addNewCard(name, link) {
  const params = { name, link };

  return post("cards", params).then((res) => {
    return getResponseData(res);
  });
}

/**
 * удаление карточки
 * @param { number } cardId ID удаляемой карточки
 */
export function deleteCard(cardId) {
  return dlt("cards", cardId).then((res) => {
    return getResponseData(res);
  });
}

/**
 * добавление лайка
 * @param { number } cardId ID карточки
 * @return { Promise }
 */
export function addLikeCard(cardId) {
  return put("cards/likes/", cardId).then((res) => {
    return getResponseData(res);
  });
}

/**
 * удаление лайка
 * @param { number } cardId ID карточки
 * @return { Promise }
 */
export function removeLikeCard(cardId) {
  return dlt("cards/likes/", cardId).then((res) => {
    return getResponseData(res);
  });
}

/**
 * Обновление аватара пользователя
 * @param { string } avatar ссылка на аватар пользователя
 * @return { Promise }
 */
export function updateAvatar(avatar) {
  const params = { avatar };

  return patch("users/me/avatar", params).then((res) => {
    return getResponseData(res);
  });
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
