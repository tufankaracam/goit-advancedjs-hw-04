import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './Pixabay';

const gallery = document.querySelector('#gallery');
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const noMore = document.querySelector('.no-more');

const searchParams = {
  q: 'kiev',
  page: 1,
  per_page: 40,
};

const lightbox = new SimpleLightbox('#gallery a');

const drawResults = photos => {
  gallery.innerHTML += photos.hits
    .map(
      photo => `<div class="photo-card">
            <a href="${photo.largeImageURL}" target="_blank">
                <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>${photo.likes}
              </p>
              <p class="info-item">
                <b>Views</b>${photo.views}
              </p>
              <p class="info-item">
                <b>Comments</b>${photo.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${photo.downloads}
              </p>
            </div>
          </div>`
    )
    .join('');
    lightbox.refresh();
  checkLoadMoreBtn(photos.totalHits);
};

const checkLoadMoreBtn = async totalHits => {
  const { page, per_page } = searchParams;
  if (page * per_page < totalHits) {
    loadMoreBtn.style.display = 'flex';
    noMore.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'none';
    noMore.style.display = 'flex';
  }
};

const handleSubmit = async e => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;
  if (query) {
    searchParams.q = query;
  }

  searchParams.page = 1;

  const photos = await getPhotos(searchParams);

  if (photos.totalHits === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
    });
    return;
  } else {
    iziToast.success({
      message: `Hooray! We found ${photos.totalHits} images.`,
      position: 'topRight',
    });
  }

  gallery.innerHTML = '';
  drawResults(photos);
};

const handleLoadMore = async () => {
  searchParams.page += 1;
  const photos = await getPhotos(searchParams);
  drawResults(photos);

  const { height: cardHeight } = gallery
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);
