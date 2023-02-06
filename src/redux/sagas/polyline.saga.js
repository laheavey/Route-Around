import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLine () {
  try {
    const response = yield axios.get('/polyline')
      yield put({
        type: 'SET_LINE',
        payload: response.data
    })
  } catch (error) {
    console.error('Error in fetchLine:', error)
  }
}

function* lineSaga() {
  yield takeLatest('FETCH_LINE', fetchLine);
}

export default lineSaga;
