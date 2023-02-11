const routeDetailReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_USER_ROUTE_HISTORY':
        return action.payload; 
        // route_id, route_name, route_desc, route_url, completed_trips
      default:
      return state;
  }
}

export default routeDetailReducer;