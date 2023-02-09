import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllPoints () {
  try {
    const response = yield axios.get('/points/all')
    yield put({
      type: 'SET_ALL_POINTS',
      payload: response.data // id, name
    })
  } catch (error) {
    console.error('Error in fetchAllPoints:', error);
  }
}

function* fetchPopularPoints () {
  try {
    const response = yield axios.get('/points/popular')
    yield put({
      type: 'SET_POPULAR_POINTS',
      payload: response.data // name, id, count_saved
    })
  } catch (error) {
    console.error('Error in SAGA/fetchPopularPoints:', error)
  }
}

function* fetchPointDetail (action) {
  try {
    const response = yield axios.get(`/points/${action.payload}`)
    yield put({
      type: 'SET_POINT_DETAIL',
      payload: response.data
      // id, name, image_url, longitude, latitude, description, 
      // sources_cited
    })
  } catch (error) {
    console.error('Error in SAGA/fetchPointDetail:', error);
  }
}

// Confusing, reducer is tied to routeDetail; flag for adjustment?
function* fetchPOIRoutes (action) {
  try {
    const response = yield axios.get(`/points/route/${action.payload}`)
    yield put({
      type: 'SET_POI_ROUTE_DETAIL',
      payload: response.data
    })
  } catch (error) {
    console.error('Error in SAGA/pointDetail/route/:id: ', error)
  }
}

function* addPointSave (action) {
  console.log('SAGA action.payload: ', action.payload);
  try {
    yield axios({
      method: 'POST',
      url: '/points',
      data: action.payload
    })
    console.log('SAGA action.payload: ', action.payload);
  } catch (error) {
    console.log('Error in SAGA/addPointSave: ', error)
  }
}

export default function* allPointsSaga() {
  yield takeLatest('FETCH_ALL_POINTS', fetchAllPoints);
  yield takeLatest('FETCH_POPULAR_POINTS', fetchPopularPoints);
  yield takeLatest('FETCH_POINT_DETAIL/:id', fetchPointDetail);
  yield takeLatest('FETCH_POINT_DETAIL/ROUTES/:id', fetchPOIRoutes);
  yield takeLatest('ADD_POI_SAVE', addPointSave);
}