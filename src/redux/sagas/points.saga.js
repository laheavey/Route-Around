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
    console.error('Error in fetchPopularPoints:', error)
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
    console.error('Error in fetchPointDetail:', error);
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
    console.error('Error in fetchPOIRoutes: ', error)
  }
}

function* fetchPointSave () {
  try {
    const response = yield axios.get('/points/save')
    yield put({
      type: 'SET_SAVED_POIS',
      payload: response.data
    })
  } catch (error) {
    console.error('Error in fetchPointSave ', error)
  }
}

function* addPointSave (action) {
  try {
    yield axios({
      method: 'POST',
      url: '/points/save',
      data: action.payload
    })
  } catch (error) {
    console.log('Error in addPointSave: ', error)
  }
}

export default function* allPointsSaga() {
  yield takeLatest('FETCH_ALL_POINTS', fetchAllPoints);
  yield takeLatest('FETCH_POPULAR_POINTS', fetchPopularPoints);
  yield takeLatest('FETCH_POINT_DETAIL/:id', fetchPointDetail);
  yield takeLatest('FETCH_POINT_DETAIL/ROUTES/:id', fetchPOIRoutes);
  yield takeLatest('ADD_POI_SAVE', addPointSave);
  yield takeLatest('FETCH_POI_SAVE', fetchPointSave);
}