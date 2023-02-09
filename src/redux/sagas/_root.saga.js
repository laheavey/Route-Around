import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import lineSaga from './polyline.saga';
import popPointsSaga from './popularPoints.saga';
import popRoutesSaga from './popularRoutes.saga';
import allRoutesSaga from './allRoutes.saga';
import allPointsSaga from './allPoints.saga';
import routeDetail from './routeDetail.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    lineSaga(),
    popPointsSaga(),
    popRoutesSaga(),
    allRoutesSaga(),
    allPointsSaga(),
    routeDetail(),
  ]);
}
