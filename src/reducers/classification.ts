import { CLASSIFY_IMAGE } from '../actions/classify';
import { fulfilled, failed, pending } from '../lib/promiseMiddlewareTypes';

function classification(state = null, action: any): any {
  switch (action.type) {
    case fulfilled(CLASSIFY_IMAGE):
      return formatPayload(action.payload);
    case pending(CLASSIFY_IMAGE):
      return null;
    case failed(CLASSIFY_IMAGE):
      // TODO Error handling ...
      console.log('Could not classify image. Details:' + JSON.stringify(action.payload, null, 2));
      return null;
    default:
      return state;
  }
}

function formatPayload(payload: any) {
  const formattedPayload = {
    minAge: payload.faces.age.min,
    maxAge: payload.faces.age.max,
    gender: payload.faces.gender.gender_label
  }
  payload.classify.forEach((c: any) => {
    if (c.classes[0]) {
      formattedPayload[c.name] = formatClass(c.classes[0].class);
    }
  })
  return formattedPayload;
}

function formatClass(value: string) {
  if (/\d/.test(value)) {
    const numberS = value.replace(/^\D+/g, '');
    const number = parseInt(numberS);
    return (number / 7) * 100;
  } else {
    return value;
  }
}

export default classification;
