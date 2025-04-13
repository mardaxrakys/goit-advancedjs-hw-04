import axios from 'axios';
import { API_KEY } from './utils/constants';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchFotoCard(query, page = 1) {
  const params = {
    q: query.trim(),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const { data } = await axios.get(`/${API_KEY}`, { params });

  return data;
}
