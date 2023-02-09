const allRoutesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_ROUTES':
      return action.payload; // id, route_name, route_desc
    default:
      return state;
  }
}

export default allRoutesReducer;