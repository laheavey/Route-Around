import { combineReducers } from "redux";

// Run by fetchAllPoints in points.saga.js:
const allPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_POINTS':
      return action.payload; 
      // id, name, longitude, latitude
    default:
      return state;
  }
};

// Run by fetchPopularPoints in points.saga.js:
const popularPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULAR_POINTS':
      return action.payload; 
      // id, name, count_saved
    default:
      return state;
  }
};

// Run by fetchPointDetail in points.saga.js:
const pointDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_POINT_DETAIL':
      return action.payload;
      // id, name, image_url, street_address, longitude, latitude,
      // description, sources_cited
    default:
      return state;
  }
};

// Run by fetchPointDetailSources in points.saga.js:
const pointDetailSourcesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POINT_DETAIL_SOURCES':
      return action.payload; 
      // id, name, url, poi_id
    default:
      return state;
  }
};

// Run by fetchPointsByRoute in points.saga.js:
const pointsByRouteReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POINTS_BY_ROUTE':
      return action.payload; 
      // id, name, short_desc, image_url, street_address, longitude,
      // latitude
    default:
      return state;
  }
};

// Run by fetchPointSave in points.saga.js:
const savedPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SAVED_POIS':
      return action.payload; 
      // id, user_id, poi_id, name
    default:
      return state;
  }
};

export default combineReducers({
  allPointsReducer,
  popularPointsReducer,
  pointDetailReducer,
  pointDetailSourcesReducer,
  pointsByRouteReducer,
  savedPointsReducer
});