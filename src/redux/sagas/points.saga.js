import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllPoints () {
  try {
    const response = yield axios.get('/points/all')
    yield put({
      type: 'SET_ALL_POINTS',
      payload: response.data 
      // Array: id, name, longitude, latitude
    })
  } catch (error) {
    console.log('Error in fetchAllPoints saga:', error);
  }
}

function* fetchPopularPoints () {
  try {
    const response = yield axios.get('/points/popular')
    yield put({
      type: 'SET_POPULAR_POINTS',
      payload: response.data 
      // Array: name, id, count_saved
    })
  } catch (error) {
    console.log('Error in fetchPopularPoints saga:', error)
  }
}

function* fetchPointDetail (action) {
  try {
    const response = yield axios.get(`/points/detail/${action.payload}`)
    yield put({
      type: 'SET_POINT_DETAIL',
      payload: response.data
      // Object: id, name, image_url, street address, longitude, latitude, description
    })
  } catch (error) {
    console.log('Error in fetchPointDetail saga:', error);
  }
}

function* fetchPointDetailSources (action) {
  try {
    const response = yield axios.get(`/points/detail/sources/${action.payload}`)
    yield put({
      type: 'SET_POINT_DETAIL_SOURCES',
      payload: response.data 
      // Array: id, name, url, poi_id 
    })
  } catch (error) {
    console.log('Error in fetchPointDetailSources saga:', error);
  }
}

function* fetchPointsByRoute (action){
  try {
    const response = yield axios.get(`/points/route/${action.payload}`)
    yield put({
      type: 'SET_POINTS_BY_ROUTE',
      payload: response.data 
      // Array: id, name, short_desc, image_url, street_address, longitude,
      // latitude
    })
  } catch (error) {
    console.log('Error in fetchPointsByRoute saga:', error);
  }
}

function* fetchPointSave () {
  try {
    const response = yield axios.get('/points/saved')
    yield put({
      type: 'SET_SAVED_POIS',
      payload: response.data 
      // Array: id, user_id, poi_id, name
    })
  } catch (error) {
    console.log('Error in fetchPointSave saga: ', error)
  }
}

function* addPointSave (action) {
  try {
    yield axios({
      method: 'POST',
      url: '/points/save',
      data: action.payload 
      // user_id, poi_id
    })
  } catch (error) {
    console.log('Error in addPointSave saga: ', error)
  }
}

function* deletePointSave (action) {
  try {
    yield axios({
      method: 'DELETE',
      url: '/points/saved/delete',
      data: action.payload 
      // user_id, poi_id
    })
  } catch (error) {
    console.log('Error in deletePointSave saga: ', error)
  }
}

export default function* allPointsSaga() {
  yield takeLatest('SAGA/FETCH_ALL_POINTS', fetchAllPoints);
  yield takeLatest('SAGA/FETCH_POPULAR_POINTS', fetchPopularPoints);
  yield takeLatest('SAGA/FETCH_POINT_DETAIL', fetchPointDetail);
  yield takeLatest('SAGA/FETCH_POINT_DETAIL_SOURCES', fetchPointDetailSources)
  yield takeLatest('SAGA/FETCH_POINTS_BY_ROUTE', fetchPointsByRoute)
  yield takeLatest('SAGA/ADD_POI_SAVE', addPointSave);
  yield takeLatest('SAGA/FETCH_SAVED_POIS', fetchPointSave);
  yield takeLatest('SAGA/DELETE_SAVED_POI', deletePointSave);
}