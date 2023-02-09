import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import line from './polyline.reducer';
import popRoutes from './popularRoutes.reducer';
import popPoints from './popularPoints.reducer';
import allRoutes from './allRoutes.reducer';
import allPoints from './allPoints.reducer';
import routeDetail from './routeDetail.reducer';
import pointDetail from './pointDetail.reducer';

const rootReducer = combineReducers({
  errors, // registrationMessage and loginMessage
  user, // id and username, if someone is logged in
  line, // coordinates for polyline creation
  popRoutes, 
  popPoints, 
  allRoutes, 
  allPoints,
  routeDetail, 
  pointDetail,
});

export default rootReducer;
