import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import line from './polylines.reducer';
import popRoutes from './popular.routes.reducer';
import popPoints from './popular.points.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // registrationMessage and loginMessage
  user, // id and username, if someone is logged in
  line, // coordinates for polyline creation
  popRoutes, // popular routes
  popPoints // popular points of interest
});

export default rootReducer;
