import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(img => `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <ul class="meta">
        <li>Likes: <span>${img.likes}</span></li>
        <li>Views: <span>${img.views}</span></li>
        <li>Comments: <span>${img.comments}</span></li>
        <li>Downloads: <span>${img.downloads}</span></li>
      </ul>
    </li>
  `).join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}