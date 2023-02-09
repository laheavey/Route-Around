import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import line from './polyline.reducer';
import popRoutes from './routes/popularRoutes.reducer';
import popPoints from './points/popularPoints.reducer'
import allRoutes from './routes/allRoutes.reducer';
import allPoints from './points/allPoints.reducer'
import routeDetail from './routes/routeDetail.reducer';

import points from './points/points.reducer';

const rootReducer = combineReducers({
  errors, // registrationMessage and loginMessage
  user, // id and username, if someone is logged in
  line, // coordinates for polyline creation
  popRoutes, 
  popPoints,
  allRoutes, 
  allPoints,
  routeDetail, 
  points,
});

export default rootReducer;
