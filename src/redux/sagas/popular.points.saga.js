import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPopularPoints () {
  try {
    const response = yield axios.get('/polyline')
      yield put({
        type: 'SET_POPULAR_POINTS',
        payload: response.data
    })
  } catch (error) {
    console.error('Error in fetchPopularPoints:', error)
  }
}

function* popPointsSaga() {
  yield takeLatest('FETCH_POPULAR_POINTS', fetchPopularPoints);
}

export default popPointsSaga;
