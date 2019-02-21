import { CLASSIFY_IMAGE } from '../actions/classify';
import { fulfilled, failed, pending } from '../lib/promiseMiddlewareTypes';

function loading(state = [], action: any): any {
    switch (action.type) {
        case fulfilled(CLASSIFY_IMAGE):
        case failed(CLASSIFY_IMAGE):
            return false;
        case pending(CLASSIFY_IMAGE):
            return true;
        default:
            return state;
    }
}

export default loading;
