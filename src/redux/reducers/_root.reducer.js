import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import line from './polyline.reducer';
import userEdit from './userEdit.reducer'
import mapCenter from './map.reducer'
import routes from './route.reducer'
import points from './point.reducer'

const rootReducer = combineReducers({
  errors, // registrationMessage and loginMessage
  user, // id and username, if someone is logged in
  line, // coordinates for polyline creation
  routes, // allRoutes, popularRoutes, routeDetail, routeHistory reducers
  points, // allPoints, popularPoints, pointDetail, pointDetailSources, pointsByRoute, savedPoints reducers
  userEdit,
  mapCenter,
});

export default rootReducer;
