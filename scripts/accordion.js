const aside = document.querySelector('.aside')
const accordionButtons = aside.querySelectorAll('.accordion__button')
const accordions = aside.querySelectorAll('.accordion')

function openOrCloseAccordion(accordion) {
    const accordionBody = accordion.querySelector('.accordion__list')
    const accordionIcon = accordion.querySelector('.accordion__icon')
    accordionBody.classList.toggle('accordion__list_open')
    accordionIcon.classList.toggle('accordion__icon_open')
}

accordionButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
        const accordion = evt.target.closest('.accordion')
        openOrCloseAccordion(accordion)
    });
});