import './index.css';
import { initialCards } from '../scripts/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, likeCard, cardsContainer } from './components/card.js';

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

initialCards.forEach(function (element) {
    cardsContainer.append(createCard(element, deleteCard, likeCard));
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(popupEditProfile);
}

popupEditProfile.addEventListener('submit', handleFormSubmit);

editButton.addEventListener('click', function () {
    const name = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;
    popupEditProfile.querySelector('.popup__input_type_name').value = name;
    popupEditProfile.querySelector('.popup__input_type_description').value = description;
    openModal(popupEditProfile);
});

const newCardButton = document.querySelector('.profile__add-button');

newCardButton.addEventListener('click', function () {
    openModal(popupNewCard);
})

const newCardForm = document.forms.new_place;

function newCardSubmit(evt) {
    evt.preventDefault();
    const name = newCardForm.querySelector('.popup__input_type_card-name').value;
    const url = newCardForm.querySelector('.popup__input_type_url').value;
    const card = { name: name, link: url };
    cardsContainer.prepend(createCard(card, deleteCard, likeCard));
    closeModal(popupNewCard);
    newCardForm.querySelector('.popup__input_type_card-name').value = '';
    newCardForm.querySelector('.popup__input_type_url').value = '';
}

newCardForm.addEventListener('submit', newCardSubmit);

