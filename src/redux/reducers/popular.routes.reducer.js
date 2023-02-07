const popularRoutesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULAR_ROUTES':
      return action.payload;
    default:
      return state;
  }
};

export default popularRoutesReducer;