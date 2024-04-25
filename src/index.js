import './index.css';
import { enableValidation} from './components/validation.js';
import { getInitialCards, getUserInfo, setUserInfo, newCard, changeAvatar } from './components/api.js';
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
const closeButtons = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

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


closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(popup));
});

function editPofileSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitProfile);
    const nameInput = inputProfileName;
    const jobInput = inputProfileDescription;
    setUserInfo(nameInput.value, jobInput.value)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closeModal(popupEditProfile);
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitProfile);
        }
        );
}

popupEditProfile.addEventListener('submit', editPofileSubmit);

editButton.addEventListener('click', function () {
    const name = profileTitle.textContent;
    const description = profileDescription.textContent;
    inputProfileName.value = name;
    inputProfileDescription.value = description;
    openModal(popupEditProfile);
    enableValidation(validationConfig);
});

const newCardButton = document.querySelector('.profile__add-button');

newCardButton.addEventListener('click', function () {
    inputCardName.value = '';
    inputCardUrl.value = '';
    openModal(popupNewCard);
})


function newCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitCard);
    const name = inputCardName.value;
    const url = inputCardUrl.value;
    newCard(name, url)
        .then((dataCard) => {
            const card = { name: name, link: url, _id: dataCard._id, owner: { _id: userId } };
            cardsContainer.prepend(createCard(card, deleteCard, clickByImage, userId));
            inputCardName.value = '';
            inputCardUrl.value = '';
            closeModal(popupNewCard);
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitCard);
        }
        );
}

newCardForm.addEventListener('submit', newCardSubmit);

function clickByImage(event) {
    const cardImage = event.target;
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    caption.textContent = cardImage.alt;
    openModal(popupImage);
}

const changeAvatarButton = document.querySelector('.avatar_edit');
const newAvatarForm = document.forms.change_avatar;
const url = newAvatarForm.querySelector('.popup__input_type_url');
const submitAvatar = newAvatarForm.querySelector('.popup__button');
changeAvatarButton.addEventListener('click', function () {
    url.value='';
    openModal(popupChangeAvatar);
})

function newAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitAvatar);
    const urlValue = url.value;
    changeAvatar(urlValue)
        .then(() => {
            closeModal(popupChangeAvatar);
            profileImage.style.backgroundImage = `url('${urlValue}')`;
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitAvatar);
        })
}

newAvatarForm.addEventListener('submit', newAvatarSubmit);