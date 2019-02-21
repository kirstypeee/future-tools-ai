import { apiCall } from '../lib/fetch';
import { IAttendee } from 'src/types';
export const CREATE_ATTENDEE = 'attendee/CREATE_ATTENDEE';

export const createAttendee = (body: IAttendee) => ({
  type: CREATE_ATTENDEE,
  payload: apiCall('/api/attendees', 'POST', body),
});
