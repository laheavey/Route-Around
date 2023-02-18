const routeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ROUTE_DETAIL':
      return action.payload;
      // route_id, route_name, route_desc, route_url, 
      // route_color, poi_id, poi_name
    default:
      return state;
  }
}

export default routeDetailReducer;