import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLine (action) {
  try {
    const response = yield axios.get(`/polyline/${action.payload}`)
    yield put({
      type: 'SET_LINE',
      payload: response.data // shape_pt_lon, shape_pt_lat
    })
  } catch (error) {
    console.error('Error in fetchLine:', error);
  }
}

export default function* lineSaga() {
  yield takeLatest('FETCH_LINE/:id', fetchLine);
}