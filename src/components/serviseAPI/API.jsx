import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '32806181-ed8f0bef33945c9ae716ebd1a';

export const fetchAPI = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
