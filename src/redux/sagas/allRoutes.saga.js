import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllRoutes () {
  try {
    const response = yield axios.get('/allRoutes')
    yield put({
      type: 'SET_ALL_ROUTES',
      payload: response.data // id, route_name, route_desc
    })
  } catch (error) {
    console.error('Error in fetchAllRoutes:', error);
  }
}

export default function* allRoutesSaga() {
  yield takeLatest('FETCH_ALL_ROUTES', fetchAllRoutes);
}