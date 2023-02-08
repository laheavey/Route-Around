import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import line from './polylines.reducer';
import popRoutes from './popularRoutes.reducer';
import popPoints from './popularPoints.reducer';
import allRoutes from './allRoutes.reducer';
import allPoints from './allPoints.reducer';
import routeDetail from './routeDetail.reducer';

const rootReducer = combineReducers({
  errors, // registrationMessage and loginMessage
  user, // id and username, if someone is logged in
  line, // coordinates for polyline creation
  popRoutes, // popular routes
  popPoints, // popular points of interest
  allRoutes, 
  allPoints,
  routeDetail, // id, name, description, url, ride history, and POIs for route
});

export default rootReducer;
