const pointDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POINT_DETAIL':
      return action.payload;
      // id, name, image_url, longitude, latitude, description, 
      // sources_cited
    default:
      return state;
  }
}

export default pointDetailReducer;