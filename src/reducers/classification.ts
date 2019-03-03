import { CLASSIFY_IMAGE } from '../actions/classify';
import { fulfilled, failed, pending } from '../lib/promiseMiddlewareTypes';

/*const test = {
  minAge: 20,
  maxAge: 23,
  gender: 'female',
  likeability: 0,
  agreeableness: 'high',
  neuroticism: 'high',
  trustworthiness: 71.42857142857143,
  emotion: 'suprised',
  conscientiousness: 'high',
  dominance: 85.71428571428571,
  extroversion: 85.71428571428571,
  extraversion: 'high',
  openness: 'high',
  clothing: 'bohemian',
  competance: 85.71428571428571
};*/

function classification(state = null, action: any): any {
  switch (action.type) {
    case fulfilled(CLASSIFY_IMAGE):
      return formatPayload(action.payload);
      //return test;
    case pending(CLASSIFY_IMAGE):
      return null;
    case failed(CLASSIFY_IMAGE):
      // TODO Error handling ...
      console.log('Could not classify image. Details:' + JSON.stringify(action.payload, null, 2));
      return null;
    default:
      return null;
      //return test;
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
  const classification = value.split('_').pop() as string;
  if (/\d/.test(value)) {
    const numberS = value.replace(/^\D+/g, '');
    const number = parseInt(numberS);
    return (number / 7) * 100;
  } if (classification.includes('high')) {
    return 'high';
  } if (classification.includes('low')) {
    return 'low';
  }
  else {
    return value;
  }
}

export default classification;
