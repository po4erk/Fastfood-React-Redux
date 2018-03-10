import { FETCH_PLACES } from '../Actions/PlaceActions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PLACES:
      return action.payload;
    default:
      return state;
  }
}