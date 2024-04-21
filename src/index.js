import './index.css';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getUserInfo, setUserInfo, newCard } from './components/api.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, cardsContainer } from './components/card.js';

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupChangeAvatar = document.querySelector('.popup_type_avatar');

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

getUserInfo()
    .then(user => {
        document.querySelector('.profile__title').textContent = user.name;
        document.querySelector('.profile__description').textContent = user.about;
        document.querySelector('.profile__image').src = user.avatar;
    })

let userId = null;
Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        cards.forEach((element) => {
            const card = createCard(element, deleteCard, clickByImage, userId);
            cardsContainer.append(card);
        })
    })

document.querySelectorAll('.popup__close').forEach((item) => {
    item.addEventListener('click', function () {
        const popupOpened = document.querySelector('.popup_is-opened');
        if (!popupOpened.classList.contains('popup_type_image')) {
            clearValidation(popupEditProfile, {
                inputSelector: '.popup__input',
                submitButtonSelector: '.popup__button',
                inactiveButtonClass: 'popup__button_disabled',
                inputErrorClass: 'popup__input_type_error',
                errorClass: 'popup__error_visible'
            });
        }
        closeModal(popupOpened);
    });
});

function editPofileSubmit(evt) {
    evt.preventDefault();
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    clearValidation(popupEditProfile, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
    closeModal(popupEditProfile);
    setUserInfo(nameInput.value, jobInput.value);
}

popupEditProfile.addEventListener('submit', editPofileSubmit);

editButton.addEventListener('click', function () {
    const name = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;
    popupEditProfile.querySelector('.popup__input_type_name').value = name;
    popupEditProfile.querySelector('.popup__input_type_description').value = description;
    openModal(popupEditProfile);
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
    getInitialCards();
});

const newCardButton = document.querySelector('.profile__add-button');

newCardButton.addEventListener('click', function () {
    openModal(popupNewCard);
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
})

const newCardForm = document.forms.new_place;

function newCardSubmit(evt) {
    evt.preventDefault();
    const name = newCardForm.querySelector('.popup__input_type_card-name').value;
    const url = newCardForm.querySelector('.popup__input_type_url').value;
    let id = null;
    getUserInfo()
        .then(
            user => {
                id = user._id;
            }
        )
    const card = { name: name, link: url, _id: id };
    cardsContainer.prepend(createCard(card, deleteCard, clickByImage, id));
    newCard(card.name, card.link);
    clearValidation(popupNewCard, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
    newCardForm.querySelector('.popup__input_type_card-name').value = '';
    newCardForm.querySelector('.popup__input_type_url').value = '';
    closeModal(popupNewCard);
}

newCardForm.addEventListener('submit', newCardSubmit);

function clickByImage(event) {
    if (event.target.classList.contains('card__image')) {
        const popupImage = document.querySelector('.popup_type_image');
        const image = document.querySelector('.popup__image');
        const cardImage = event.target;
        image.src = cardImage.src;
        image.alt = cardImage.name;
        popupImage.querySelector('.popup__caption').textContent = event.currentTarget.name;
        openModal(popupImage);
        enableValidation({
            formSelector: '.popup__form',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
        });
    }
}

const changeAvatarButton = document.querySelector('.change-avatar-button');

changeAvatarButton.addEventListener('click', function () {
    openModal(popupChangeAvatar);
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
})