import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import line from './polyline.reducer';
import popPoints from './points/popularPoints.reducer'
import allPoints from './points/allPoints.reducer'
import pointDetail from './points/pointDetail.reducer';
import savedPoints from './points/savedPoints.reducer';
import points from './points/points.reducer';
import userEdit from './userEdit.reducer'
import mapCenter from './map.reducer'
import routes from './route.reducer'

const rootReducer = combineReducers({
  errors, // registrationMessage and loginMessage
  user, // id and username, if someone is logged in
  line, // coordinates for polyline creation
  routes, // allRoutes, popularRoutes, routeDetail, routeHistory reducers
  popPoints,
  allPoints,
  pointDetail,
  points,
  savedPoints,
  userEdit,
  mapCenter,
});

export default rootReducer;
