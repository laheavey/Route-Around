const savedPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SAVED_POIS':
      return action.payload; // 
    default:
      return state;
  }
};

export default savedPointsReducer;