import { apiCall } from 'src/lib/fetch';

export const CLASSIFY_IMAGE = 'classify/CLASSIFY_IMAGE';

export const classify = (imgData: any) => ({
  type: CLASSIFY_IMAGE,
  payload: apiCall('/classify', 'POST', { image_data: imgData }),
});


