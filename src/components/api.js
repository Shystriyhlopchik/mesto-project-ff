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
  return get("cards")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Загрузка информации о пользователе с сервера
 * @return { Promise }
 */
export function getUserInformation() {
  return get("users/me")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * редактирование профиля пользователя
 * @param { string } name Имя пользователя
 * @param { string } job Занятия пользователя
 */
export function updateUserProfile(name, job) {
  const params = { name, about: job };

  patch("users/me", params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * редактирование профиля пользователя
 * @param { string } name Название изображения
 * @param { string } link Ссылка на изображение
 */
export function addNewCard(name, link) {
  const params = { name, link };

  post("cards", params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * удаление карточки
 * @param { number } cardId ID удаляемой карточки
 */
export function deleteCard(cardId) {
  dlt("cards", cardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * добавление лайка
 * @param { number } cardId ID карточки
 * @return { Promise }
 */
export function addLikeCard(cardId) {
  return put("cards/likes/", cardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * удаление лайка
 * @param { number } cardId ID карточки
 * @return { Promise }
 */
export function removeLikeCard(cardId) {
  return dlt("cards/likes/", cardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
