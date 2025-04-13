import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { fetchFotoCard } from '../pixabay-api';
import { refs } from '../utils/constants';
import { createMarkupGalleryCards } from '../render-functions';
import { LoadMoreButton } from '../utils/buttonService';

let page = 1;
let userQuery = '';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const loadMoreButton = new LoadMoreButton(refs.btnLoadMore);

export async function handlerSearch(ev) {
  ev.preventDefault();

  const form = ev.currentTarget;
  userQuery = form.elements.user_query.value.trim();

  if (userQuery === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a query!',
      position: 'topRight',
    });
    return;
  }

  refs.loaderEl.classList.add('active');
  page = 1;

  try {
    const data = await fetchFotoCard(userQuery, page);
    refs.loaderEl.classList.remove('active');

    if (!data.hits.length) {
      refs.galleryEl.innerHTML = '';

      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      loadMoreButton.hide();
      return;
    }

    refs.galleryEl.innerHTML = createMarkupGalleryCards(data.hits);
    lightbox.refresh();

    if (data.hits.length < data.totalHits) {
      loadMoreButton.show();
      loadMoreButton.button.addEventListener('click', handelLoadMore);
    } else {
      loadMoreButton.hide();
    }
  } catch (err) {
    console.log(err);
  } finally {
    form.reset();
  }
}

async function handelLoadMore() {
  page += 1;
  loadMoreButton.disable();

  try {
    const data = await fetchFotoCard(userQuery, page);

    if (!data.hits.length) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });

      loadMoreButton.hide();
      loadMoreButton.button.removeEventListener('click', handelLoadMore);

      return;
    }

    refs.galleryEl.insertAdjacentHTML(
      'beforeend',
      createMarkupGalleryCards(data.hits)
    );
    lightbox.refresh();
    smoothScroll();

    if (page * 15 >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });

      loadMoreButton.hide();
    } else {
      loadMoreButton.enable();
    }
  } catch (err) {
    console.log(err);
    loadMoreButton.hide();
  }
}

loadMoreButton.button.addEventListener('click', handelLoadMore);

function smoothScroll() {
  const card = document.querySelector('.gallery-card');
  const height = card.getBoundingClientRect().height + 24;

  window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: 'smooth',
  });
}
