
export function openModal(element) {
    const closeButton = element.querySelector('.popup__close');
    element.classList.add('popup_is-opened');
    closeButton.addEventListener('click', function () {
        closeModal(element);
    });
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closeModal(element);
        }
    })

    element.addEventListener('click', function (evt) {
        if (evt.target === element) {
            closeModal(element);
        }
    })
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
}