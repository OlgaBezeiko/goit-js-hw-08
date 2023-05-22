// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";



const galleryContainer = document.querySelector('.gallery');

function createGalleryItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
          data-source="${original}"
        />
      </a>
    </li>
  `;
}

function renderGallery(items) {
  const galleryMarkup = items.map(createGalleryItem).join('');
  galleryContainer.innerHTML = galleryMarkup;
}

renderGallery(galleryItems);

// Ініціалізація бібліотеки SimpleLightbox з додаванням підписів та затримкою
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


