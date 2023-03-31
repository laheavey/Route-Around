import { combineReducers } from "redux";

// Run by fetchAllRoutes in routes.saga.js:
const allRoutesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_ROUTES':
      return action.payload; 
      // route_id, route_name, route_desc
    default:
      return state;
  }
}

// Run by fetchPopularRoutes in routes.saga.js:
const popularRoutesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULAR_ROUTES':
      return action.payload; 
      // route_name, route_id
    default:
      return state;
  }
};

// Run by fetchRouteDetail in routes.saga.js:
const routeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ROUTE_DETAIL':
      return action.payload;
      // route_id, route_name, route_desc, route_url, 
      // route_color, poi_id, poi_name
    default:
      return state;
  }
}

// Run by fetchUserRouteHistory in routes.saga.js:
const routeHistoryReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_USER_ROUTE_HISTORY':
        return action.payload; 
        // route_id, route_name, route_desc, route_url, completed_trips
      default:
      return state;
  }
}


export default combineReducers({
  allRoutesReducer,
  popularRoutesReducer,
  routeDetailReducer,
  routeHistoryReducer
});