export function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEscape)
    element.addEventListener('click', closeModalByOverlay)
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEscape)
    element.removeEventListener('click', closeModalByOverlay)
}

function closeModalByEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeModalByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}