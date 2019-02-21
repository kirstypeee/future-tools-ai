import { CLASSIFY_IMAGE } from '../actions/classify';
import { fulfilled, failed, pending } from '../lib/promiseMiddlewareTypes';

function classification(state = [], action: any): any {
  switch (action.type) {
    case fulfilled(CLASSIFY_IMAGE):
      return action.payload;
    case pending(CLASSIFY_IMAGE):
      return [];
    case failed(CLASSIFY_IMAGE):
      // TODO Error handling ...
      console.log('Could not classify image. Details:' + JSON.stringify(action.payload, null, 2));
      return [];
    default:
      return state;
  }
}

export default classification;
