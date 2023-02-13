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
    const response = yield axios.get(`/points/detail/${action.payload}`)
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

function* fetchPointDetailRoute (action){
  try {
    const response = yield axios.get(`/points/route/${action.payload}`)
    yield put({
      type: 'SET_POINT_DETAIL/ROUTE/:id',
      payload: response.data
      // id, name, image_url, longitude, latitude, description, 
      // sources_cited
    })
  } catch (error) {
    console.error('Error in fetchPointDetail:', error);
  }
}

function* fetchPointSave () {
  try {
    const response = yield axios.get('/points/saved')
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

function* deletePointSave (action) {
  try {
    yield axios({
      method: 'DELETE',
      url: '/points/saved/delete',
      data: action.payload
    })
  } catch (error) {
    console.log('Error in deletePointSave: ', error)
  }
}

export default function* allPointsSaga() {
  yield takeLatest('FETCH_ALL_POINTS', fetchAllPoints);
  yield takeLatest('FETCH_POPULAR_POINTS', fetchPopularPoints);
  yield takeLatest('FETCH_POINT_DETAIL/:id', fetchPointDetail);
  yield takeLatest('FETCH_POINT_DETAIL/ROUTE/:id', fetchPointDetailRoute)
  yield takeLatest('ADD_POI_SAVE', addPointSave);
  yield takeLatest('FETCH_SAVED_POIS', fetchPointSave);
  yield takeLatest('DELETE_SAVED_POI', deletePointSave);
}