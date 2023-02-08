import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllRoutes () {
  try {
    const response = yield axios.get('/allRoutes')
      yield put({
        type: 'SET_ALL_ROUTES',
        payload: response.data
    })
  } catch (error) {
    console.error('Error in fetchPopularRoutes:', error)
  }
}

function* allRoutesSaga() {
  yield takeLatest('FETCH_ALL_ROUTES', fetchAllRoutes);
}

export default allRoutesSaga;
