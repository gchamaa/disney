const modal = document.getElementById('modal');
// const modalHeader = document.querySelector('#modal .modalHeader');
// const modalBody = document.querySelector('#modal .modalBody');
const closeModalButton = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', closeModal);
closeModalButton.addEventListener('click', closeModal);

let trigger = null;

function openModal(event) {
    modal.classList.add('active');
    overlay.classList.add('active');
    closeModalButton.focus();
    trigger = event.target;
}

function closeModal() {  
    modal.classList.remove('active');
    overlay.classList.remove('active');
    trigger.focus();
}

document.addEventListener("keydown", (event)=>{
    switch (event.key) {
        case "Escape":
            event.preventDefault();
            closeModal();
            break;
        default:
            return;
    }
})

export {openModal};
