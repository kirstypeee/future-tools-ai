import { GET_BANNER } from '../actions/banner';
import { fulfilled, failed, pending } from '../lib/promiseMiddlewareTypes';
import { IBanner } from 'src/types';

function allTiles(state = [], action: any): any {
  switch (action.type) {
    case fulfilled(GET_BANNER):
      return action.payload[0] as IBanner;
    case pending(GET_BANNER):
      return [];
    case failed(GET_BANNER):
      // TODO Error handling ...
      console.log('Could not load Tiles. Details:' + JSON.stringify(action.payload, null, 2));
      return [];
    default:
      return state;
  }
}

export default allTiles;
