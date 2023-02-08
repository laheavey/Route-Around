const allRoutesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_ROUTES':
      return action.payload;
    default:
      return state;
  }
};

export default allRoutesReducer;