import {openModal} from "./modal";
const userTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
export function createCard(card, deleteCard, likeCard, clickByImage) {
    const cardElement = userTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
        deleteCard(cardElement);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.addEventListener('click', clickByImage);
    return cardElement;
}

export function deleteCard (cardElement) {
    cardElement.remove();
}

export function likeCard (evt) {
    evt.currentTarget.classList.toggle('card__like-button_is-active');
}