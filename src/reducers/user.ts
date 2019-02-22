import { SET_NAME } from '../actions/classify';

function loading(state = "", action: any): any {
    switch (action.type) {
        case SET_NAME:
            return action.payload;
        default:
            return state;
    }
}

export default loading;
