// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const body = document.body;

const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(item) {
  return item
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img loading="lazy" width="354" height="240" 
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

const lazyImages = galleryContainer.querySelectorAll('.gallery__image');

lazyImages.forEach(image => {
  image.addEventListener('load', onImageLoad, { once: true });
});

function onImageLoad(e) {
  e.target.classList.add('appear');
}
lazyImages.forEach(image => {
  image.addEventListener('mouseenter', onMouseEnter);
});

function onMouseEnter(e) {
  e.target.style.transitionDelay = '100ms';
  e.target.style.transitionDuration = '500ms';
}
