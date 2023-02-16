import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import line from './polyline.reducer';
import popRoutes from './routes/popularRoutes.reducer';
import popPoints from './points/popularPoints.reducer'
import allRoutes from './routes/allRoutes.reducer';
import allPoints from './points/allPoints.reducer'
import routeDetail from './routes/routeDetail.reducer';
import pointDetail from './points/pointDetail.reducer';
import savedPoints from './points/savedPoints.reducer';
import points from './points/points.reducer';
import userRouteHistory from './routes/userRouteHistory.reducer';
import userEdit from './userEdit.reducer'
import mapCenter from './routes/mapCenter.reducer'

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
  points,
  savedPoints,
  userRouteHistory,
  userEdit,
  mapCenter,
});

export default rootReducer;
