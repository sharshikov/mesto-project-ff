import { addLike, deleteLike } from './api.js';
const userTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
export function createCard(card, deleteCard, clickByImage, userId) {
    const cardElement = userTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    if (card._id === userId) {
        cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
            deleteCard(cardElement);
        });
    } else {
        cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_invisible');
    }
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.count_likes');
    if (card.likes !== undefined) {
        if (card.likes.includes(userId)) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
        likeCount.textContent = card.likes.length;
    } else {
        likeCount.textContent = 0;
    }
    cardLikeButton.addEventListener('click', () => {
        handleLike(card._id, cardLikeButton, likeCount)
    });
    cardElement.addEventListener('click', clickByImage);
    return cardElement;
}

export function deleteCard(cardElement) {
    cardElement.remove();
}

function handleLike(id, cardLikeButton, likeCount) {
    const isLike = cardLikeButton.classList.contains('card__like-button_is-active');
    if (isLike) {
        deleteLike(id)
            .then(data => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                likeCount.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            });
    } else {
        addLike(id)
            .then(data => {
                cardLikeButton.classList.add('card__like-button_is-active');
                likeCount.textContent = data.likes.length;
            }).catch((err) => {
                console.log(`Ошибка: ${err}`)
            });
    }
}