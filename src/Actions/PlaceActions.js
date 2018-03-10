import { database } from '../Firebase';
import { storage } from '../Firebase';
export const FETCH_PLACES = 'fetch_places';
export const PLACE_STATUS = 'place_status';

export function getPlaces() {
  return dispatch => {
    dispatch({
      type: PLACE_STATUS,
      payload: true
    });
    database.on('value', snapshot => {
      dispatch({
        type: FETCH_PLACES,
        payload: snapshot.val()
      });
      dispatch({
        type: PLACE_STATUS,
        payload: false
      });
    }, () => {
      dispatch({
        type: PLACE_STATUS,
        payload: -1
      });
    });
  };
}

export function addPlace(place) {
  return dispatch => database.push(place);
}

export function deletePlace(id) {
  return dispatch => database.child(id).remove();
}

export function saveComment(placeId, comment, uid) {
  return dispatch => database.child(placeId).child('comments').push({
    comment: comment.comment,
    name: comment.name,
    rating: comment.rating
  });
}

export function deleteComment(placeId,key) {
  return dispatch => database.child(placeId).child('comments').child(key).remove();
}

export function storageUpload(placeId,file){
  return dispatch => storage.ref(placeId).put(file);
}

export function storageDownload(placeId){
    return dispatch => storage.ref(placeId).getDownloadURL().then((url) => {
        document.getElementById('image').src = url;
    }).catch(e => console.error("Image does not exist!"));
}
