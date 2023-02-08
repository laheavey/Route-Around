import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRouteDetail (action) {
  console.log('fetchRouteDetail, action.payload: ', action.payload)
  try {
    const response = yield axios.get(`/routeDetail/${action.payload}`)
      yield put({
        type: 'SET_ROUTE_DETAIL',
        payload: response.data
    })
    console.log('fetchRouteDetail, response.data: ', response.data);
  } catch (error) {
    console.error('Error in fetchRouteDetail:', error)
  }
}

function* fetchRouteDetailSaga() {
  yield takeLatest('FETCH_ROUTE_DETAIL', fetchRouteDetail)
}

export default fetchRouteDetailSaga;
