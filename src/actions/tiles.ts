import { apiCall } from '../lib/fetch';
export const GET_TILES = 'tiles/GET_TILES';

export const loadAllTiles = () => ({
  type: GET_TILES,
  payload: apiCall('/api/tiles'),
});