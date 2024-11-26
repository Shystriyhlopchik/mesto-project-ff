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
