import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPointDetail (action) {
  try {
    const response = yield axios.get(`/pointDetail/${action.payload}`)
    yield put({
      type: 'SET_POINT_DETAIL',
      payload: response.data
      // id, name, image_url, longitude, latitude, description, 
      // sources_cited
    })
  } catch (error) {
    console.error('Error in SAGA/fetchPointDetail:', error);
  }
}

export default function* fetchPointDetailSaga() {
  yield takeLatest('FETCH_POINT_DETAIL/:id', fetchPointDetail);
}