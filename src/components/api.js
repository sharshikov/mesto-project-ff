import { data } from "autoprefixer";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
        authorization: 'dff30124-6e55-4f7e-a776-46d016eef2af',
        'Content-Type': 'application/json'
    }
}

export function getInitialCards() {
    return fetch(`${config['baseUrl']}/cards`, {
        headers: config.headers
    })
        .then(res => {
            return checkResponse(res);
        });
}

export function getUserInfo() {
    return fetch(`${config['baseUrl']}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            return checkResponse(res);
        });
}

export function setUserInfo(name, about) {
    return fetch(`${config['baseUrl']}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(res => {
        return checkResponse(res);
    });
}

export function newCard(name, link) {
    return fetch(`${config['baseUrl']}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        return checkResponse(res);
    });
}

export function removeCard(cardId) {
    return fetch(`${config['baseUrl']}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => {
        return checkResponse(res);
    })
}

export function addLike(cardId) {
    return fetch(`${config['baseUrl']}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    }).then(res => {
        return checkResponse(res);
    });
}

export function deleteLike(cardId) {
    return fetch(`${config['baseUrl']}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => {
        return checkResponse(res);
    })
}

export function changeAvatar(link) {
    return fetch(`${config['baseUrl']}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    }).then(res => {
        return checkResponse(res);
    });
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}