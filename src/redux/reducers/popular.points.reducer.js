const popularPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULAR_POINTS':
      return action.payload;
    default:
      return state;
  }
};

export default popularPointsReducer;