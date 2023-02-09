import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPopularRoutes () {
  try {
    const response = yield axios.get('/popular/routes')
    yield put({
      type: 'SET_POPULAR_ROUTES',
      payload: response.data // route_name, route_id
    })
  } catch (error) {
    console.error('Error in SAGA/fetchPopularRoutes:', error);
  }
}

export default function* popRoutesSaga() {
  yield takeLatest('FETCH_POPULAR_ROUTES', fetchPopularRoutes);
}