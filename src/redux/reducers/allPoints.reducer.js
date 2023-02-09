const allPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_POINTS':
      return action.payload; // id, name
    default:
      return state;
  }
};

export default allPointsReducer;