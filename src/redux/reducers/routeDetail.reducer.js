const routeDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ROUTE_DETAIL':
      console.log('routeDetail reducer, action.payload: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default routeDetailReducer;