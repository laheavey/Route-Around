// SET_ROUTE_DETAIL contains the following for route id specified:
// completed_on; poi_id; poi_name; route_desc; route_id; route_name; route_url

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