import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const defaultParams = {
  key: '44571009-8d5b9c16825d4f8c021db4d6b',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: 'cat',
};

export const getPhotos = async params => {
  try {
    const result = await axios.get('/', {
      params: { ...defaultParams, ...params },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
