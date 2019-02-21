import { apiCall } from '../lib/fetch';
export const GET_BANNER = 'banner/GET_BANNER';

export const loadBanner = () => ({
  type: GET_BANNER,
  payload: apiCall('/api/banners'),
});
