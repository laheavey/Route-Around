import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Fetches and returns the following for route id specified:
// completed_on; poi_id; poi_name; route_desc; route_id; route_name; route_url
function* fetchRouteDetail (action) {
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
  yield takeLatest('FETCH_ROUTE_DETAIL/:id', fetchRouteDetail)
}

export default fetchRouteDetailSaga;
