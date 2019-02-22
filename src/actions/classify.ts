import { apiCall } from 'src/lib/fetch';

export const CLASSIFY_IMAGE = 'classify/CLASSIFY_IMAGE';
export const SET_NAME = 'classify/SET_NAME';

export const classify = (imgData: any) => ({
  type: CLASSIFY_IMAGE,
  payload: apiCall('/classify', 'POST', { image_data: imgData }),
});

export const setName = (name: string) => ({
  type: SET_NAME,
  payload: name
});


