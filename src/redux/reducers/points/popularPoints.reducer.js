const popularPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULAR_POINTS':
      console.log('action.payload: ', action.payload)
      return action.payload; // name, id, count_saved
    default:
      return state;
  }
};

export default popularPointsReducer;