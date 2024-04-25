import { addLike, deleteLike, removeCard } from './api.js';
const userTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
export function createCard(card, deleteCard, clickByImage, userId) {
    const cardElement = userTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    if (card.owner._id === userId) {
        cardDeleteButton.addEventListener('click', function () {
            deleteCard(cardElement, card._id);
        });
    } else {
        cardDeleteButton.classList.add('card__delete-button_invisible');
    }
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.count_likes');
    if (card.likes !== undefined) {
        card.likes.some((element) => {
            if (element._id === userId) {
                cardLikeButton.classList.add('card__like-button_is-active');
            }
        });
        likeCount.textContent = card.likes.length;
    } else {
        likeCount.textContent = 0;
    }
    cardLikeButton.addEventListener('click', () => {
        handleLike(card._id, cardLikeButton, likeCount)
    });

    cardImage.addEventListener('click', clickByImage);
    return cardElement;
}

export function deleteCard(cardElement, id) {
    removeCard(id)
        .then(() => {
            cardElement.remove()
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });

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