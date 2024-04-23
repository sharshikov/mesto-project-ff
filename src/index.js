import './index.css';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getUserInfo, setUserInfo, newCard } from './components/api.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, cardsContainer } from './components/card.js';
import { renderLoading } from './components/utils.js';

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupChangeAvatar = document.querySelector('.popup_type_avatar');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const inputProfileName = popupEditProfile.querySelector('.popup__input_type_name');
const inputProfileDescription = popupEditProfile.querySelector('.popup__input_type_description');
const newCardForm = document.forms.new_place;
const inputCardName = newCardForm.querySelector('.popup__input_type_card-name');
const inputCardUrl = newCardForm.querySelector('.popup__input_type_url');
const submitCard = newCardForm.querySelector('.popup__button');
const submitProfile = popupEditProfile.querySelector('.popup__button');

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

let userId = null;
Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;
        cards.forEach((element) => {
            const card = createCard(element, deleteCard, clickByImage, userId);
            cardsContainer.append(card);
        })
    })
    .catch((err) => {
        console.error(`Ошибка: ${err}`);
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
    renderLoading(true, submitProfile);
    const nameInput = inputProfileName;
    const jobInput = inputProfileDescription;
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    clearValidation(popupEditProfile, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
    setUserInfo(nameInput.value, jobInput.value)
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitProfile);
        }
        );
    closeModal(popupEditProfile);
}

popupEditProfile.addEventListener('submit', editPofileSubmit);

editButton.addEventListener('click', function () {
    const name = profileTitle.textContent;
    const description = profileDescription.textContent;
    inputProfileName.value = name;
    inputProfileDescription.value = description;
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
    inputCardName.value = '';
    inputCardUrl.value = '';
    openModal(popupNewCard);
    clearValidation(popupNewCard, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
})



function newCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitCard)
    const name = inputCardName.value;
    const url = inputCardUrl.value;
    const card = { name: name, link: url, _id: userId };
    cardsContainer.prepend(createCard(card, deleteCard, clickByImage, userId));
    newCard(card.name, card.link)
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitCard);
        }
        );

    inputCardName.value = '';
    inputCardUrl.value = '';
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

const changeAvatarButton = document.querySelector('.avatar_edit');
const newAvatarForm = document.forms.change_avatar;
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

function newAvatarSubmit(evt) {
    evt.preventDefault();
    const url = newAvatarForm.querySelector('.popup__input_type_url').value;
    profileImage.style.backgroundImage = `url('${url}')`;
    closeModal(popupChangeAvatar);
}

newAvatarForm.addEventListener('submit', newAvatarSubmit);