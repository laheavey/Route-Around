import { combineReducers } from "redux";

const pointDetailReducer = (state = {}, action) => {
    // console.log('In pointsReducer; action.payload: ', action.payload)
  switch (action.type) {
    case 'SET_POINT_DETAIL':
        // console.log('pointsReducer response: ', action.payload)
      return action.payload;
    default:
      return state;
  }
};

const pointDetailSourcesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POINT_DETAIL_SOURCES':
      return action.payload; 
    default:
      return state;
  }
}

export default combineReducers({
  pointDetailReducer,
  pointDetailSourcesReducer
});