const routeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ROUTE_DETAIL':
      return action.payload;
      // route_id, route_name, route_desc, route_url, 
      // route_color, completed_on, poi_id, poi_name
      case 'SET_ROUTE_DETAIL/POI/:id':
        return action.payload; // route_name, route_desc
      default:
      return state;
  }
}

export default routeDetailReducer;