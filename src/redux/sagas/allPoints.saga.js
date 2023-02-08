import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllPoints () {
  try {
    const response = yield axios.get('/allPoints')
      yield put({
        type: 'SET_ALL_POINTS',
        payload: response.data
    })
  } catch (error) {
    console.error('Error in fetchAllPoints:', error)
  }
}

function* allPointsSaga() {
  yield takeLatest('FETCH_ALL_POINTS', fetchAllPoints)
}

export default allPointsSaga;
