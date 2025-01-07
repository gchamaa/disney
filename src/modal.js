
const modalNode = document.createElement("div");
modalNode.classList.add("modal");
modalNode.setAttribute("id", "modal");
document.querySelector("body").appendChild(modalNode);

const modalHeaderNode = document.createElement("div");
modalHeaderNode.classList.add("modalHeader");

const modalBodyNode = document.createElement("div");
modalBodyNode.classList.add("modalBody");
modalBodyNode.textContent = "This is the content of the modal.";

const modalFooterNode = document.createElement("div");
modalFooterNode.classList.add("modalFooter");

const footerPrimaryBtnNode = document.createElement("button");
footerPrimaryBtnNode.classList.add("btnPrimary");
footerPrimaryBtnNode.textContent="Watch";

const footerSecondaryBtnNode = document.createElement("button");
footerSecondaryBtnNode.classList.add("btnSecondary");
footerSecondaryBtnNode.setAttribute("id", "closeModal");
footerSecondaryBtnNode.addEventListener('click', closeModal);
footerSecondaryBtnNode.textContent = "Close";

modalFooterNode.appendChild(footerPrimaryBtnNode);
modalFooterNode.appendChild(footerSecondaryBtnNode);

modalNode.appendChild(modalHeaderNode);
modalNode.appendChild(modalBodyNode);
modalNode.appendChild(modalFooterNode);
document.body.appendChild(modalNode);


const overlayNode = document.createElement("div");
overlayNode.classList.add("overlay");
overlayNode.setAttribute("id", "overlay");
overlayNode.addEventListener('click', closeModal);
document.body.appendChild(overlayNode);

let trigger = null;

function openModal(event) {
    modalNode.classList.add('active');
    overlayNode.classList.add('active');
    footerSecondaryBtnNode.focus();
    trigger = event.target;
}

function closeModal() {  
    modalNode.classList.remove('active');
    overlayNode.classList.remove('active');
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
