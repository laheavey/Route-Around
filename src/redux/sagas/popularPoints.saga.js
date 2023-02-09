import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPopularPoints () {
  try {
    const response = yield axios.get('/popular/points')
    yield put({
      type: 'SET_POPULAR_POINTS',
      payload: response.data // name, id, count_saved
    })
  } catch (error) {
    console.error('Error in SAGA/fetchPopularPoints:', error)
  }
}

export default function* popPointsSaga() {
  yield takeLatest('FETCH_POPULAR_POINTS', fetchPopularPoints);
}