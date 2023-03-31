import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllRoutes () {
  try {
    const response = yield axios.get('/routes/all')
    yield put({
      type: 'SET_ALL_ROUTES',
      payload: response.data 
      // Array: route_id, route_name, route_desc
    })
  } catch (error) {
    console.log('Error in fetchAllRoutes saga:', error);
  }
}

function* fetchPopularRoutes () {
  try {
    const response = yield axios.get('/routes/popular')
    yield put({
      type: 'SET_POPULAR_ROUTES',
      payload: response.data 
      // Array: route_name, route_id
    })
  } catch (error) {
    console.log('Error in fetchPopularRoutes saga:', error);
  }
}

function* fetchRouteDetail (action) {
  try {
    const response = yield axios.get(`/routes/detail/${action.payload}`)
    yield put({
      type: 'SET_ROUTE_DETAIL',
      payload: response.data
      // Object: route_id, route_name, route_desc, route_url, route_color, 
      // poi_id, poi_name
    })
  } catch (error) {
    console.log('Error in fetchRouteDetail saga:', error);
  }
}

// function* fetchRouteDetailPOI (action) {
//   try {
//     const response = yield axios.get(`/routes/point/${action.payload}`)
//     yield put({
//       type: 'SET_ROUTE_DETAIL_BY_POI_ID',
//       payload: response.data
//       //
//     })
//   } catch (error) {
//     console.log('Error in fetchRouteDetailPOI saga: ', error)
//   }
// }

function* fetchUserRouteHistory (action) {
  console.log('fetchUserRouteHistory: ', action.payload)
  try {
    const response = yield axios.get(`/routes/user/${action.payload}`)
    yield put({
      type: 'SET_USER_ROUTE_HISTORY',
      payload: response.data
      // Array: route_id, route_name, route_desc, route_url, completed_trips
    })
  } catch (error) {
    console.log('Error in fetchUserRouteHistory saga:', error);
  }
}

export default function* fetchRouteDetailSaga() {
  yield takeLatest('SAGA/FETCH_ALL_ROUTES', fetchAllRoutes);
  yield takeLatest('SAGA/FETCH_POPULAR_ROUTES', fetchPopularRoutes);
  yield takeLatest('SAGA/FETCH_ROUTE_DETAIL', fetchRouteDetail);
  // yield takeLatest('SAGA/FETCH_ROUTE_DETAIL/POI/:id', fetchRouteDetailPOI)
  yield takeLatest('SAGA/FETCH_USER_ROUTE_HISTORY', fetchUserRouteHistory)
}