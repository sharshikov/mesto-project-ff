import {openModal} from "./modal";
const userTemplate = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
export function createCard(card, deleteCard, likeCard) {
    const cardElement = userTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
        deleteCard(cardElement);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        likeCard(evt);
    });
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        const popupImage = document.querySelector('.popup_type_image');
        const image = document.querySelector('.popup__image');
        image.src = card.link;
        image.alt = card.name;
        popupImage.querySelector('.popup__caption').textContent = card.name;
        openModal(popupImage);
    });
    return cardElement;
}

export function deleteCard (cardElement) {
    cardsContainer.removeChild(cardElement);
}

export function likeCard (evt) {
    evt.currentTarget.classList.toggle('card__like-button_is-active');
}