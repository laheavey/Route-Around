const popularRoutesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POPULAR_ROUTES':
      return action.payload; // route_name, route_id
    default:
      return state;
  }
};

export default popularRoutesReducer;