import images from './gallery-items.js';

const listRef = document.querySelector('.js-gallery');

const createList = (image) => {
    const listEl = document.createElement('li');
    listEl.classList.add('gallery__item');

    const linkEl = document.createElement('a');
    linkEl.classList.add('gallery__link');
    linkEl.setAttribute('href', image.original);

    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.setAttribute('src', image.preview);
    imgEl.setAttribute('alt', image.description);
    imgEl.dataset.source = image.original;

    linkEl.appendChild(imgEl);
    listEl.appendChild(linkEl);
    
    return listEl;
}

const arr = images.map((image) => createList(image));

listRef.append(...arr);


let bigImgUrl = '';
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');

const getBigUrl = (event) => {
    event.preventDefault();
    bigImgUrl = event.target.dataset.source;
    openModal();
}

const openModal = (event) => {
    modalImg.setAttribute('src', `${bigImgUrl}`);
    modal.classList.add('is-open');  
    window.addEventListener("keydown", escCloseModal);
    
}

const closeModal = (event) => {
    modalImg.removeAttribute('src');
    modal.classList.remove('is-open');
    window.removeEventListener("keydown", escCloseModal);
}

const btn = document.querySelector('.lightbox__button');
btn.addEventListener('click', closeModal)

const overlay = document.querySelector('.lightbox__overlay');
overlay.addEventListener('click', closeModal)

const escCloseModal = (event) => {
    if (event.code === "Escape"){
        closeModal();
    }
}



listRef.addEventListener('click', getBigUrl);
