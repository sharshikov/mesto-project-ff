// @todo: Темплейт карточки
const userTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(card, deleteCard) {
    const cardElement = userTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').srcset = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    deleteCard(cardElement);
    return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = function (cardElement) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        cardsContainer.removeChild(cardElement);
    });
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    cardsContainer.append(createCard(element, deleteCard));
})

