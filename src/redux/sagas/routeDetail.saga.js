import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRouteDetail (action) {
  try {
    const response = yield axios.get(`/routeDetail/${action.payload}`)
    yield put({
      type: 'SET_ROUTE_DETAIL',
      payload: response.data
      // payload: route_id, route_name, route_desc, route_url, 
      // route_color, completed_on, poi_id, poi_name
    })
  } catch (error) {
    console.error('Error in SAGA/fetchRouteDetail:', error);
  }
}

export default function* fetchRouteDetailSaga() {
  yield takeLatest('FETCH_ROUTE_DETAIL/:id', fetchRouteDetail);
}