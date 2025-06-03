import axios from 'axios';

const API_KEY = '50661011-0ce0d2a716009781924e103de';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    };
  
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  }