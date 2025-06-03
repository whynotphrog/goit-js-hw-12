import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalPages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.error({
      message: 'Please enter a search term.',
        position: 'topRight',
        backgroundColor: '#ef4040',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchImages();
});

async function fetchImages() {
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'No images found. Try a different search.',
          position: 'topRight',
          backgroundColor: '#ef4040',
      });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          backgroundColor: '#ef4040',
      });
    } else {
      showLoadMoreButton();
    }

    if (currentPage > 1) {
      const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
        position: 'topRight',
        backgroundColor: '#ef4040',
    });
  } finally {
    hideLoader();
  }
}