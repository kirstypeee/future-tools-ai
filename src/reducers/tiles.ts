import { GET_TILES } from '../actions/tiles';
import { fulfilled, failed, pending } from '../lib/promiseMiddlewareTypes';
import { ITile } from 'src/types';

function allTiles(state = [], action: any): any {
  switch (action.type) {
    case fulfilled(GET_TILES):
      return action.payload as ITile[];
    case pending(GET_TILES):
      return [];
    case failed(GET_TILES):
      // TODO Error handling ...
      console.log('Could not load Tiles. Details:' + JSON.stringify(action.payload, null, 2));
      return [];
    default:
      return state;
  }
}

export default allTiles;
