const pointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_POINTS':
      // console.log(action.payload)
      // let allPointArray = [];
      // allPointArray.push(action.payload);
      // return allPointArray; // id, name
      return action.payload;
    case 'SET_POINT_DETAIL':
      return action.payload;
      // id, name, image_url, longitude, latitude, description, 
      // sources_cited
    case 'SET_POINT_DETAIL/ROUTE/:id':
      // let pointDetailArray = [];
      // pointDetailArray.push(action.payload);
      // return pointDetailArray; // id, name, short_desc
      return action.payload;
    case 'SET_POPULAR_POINTS':
      // let popularPointArray = [];
      // popularPointArray.push(action.payload);
      // return popularPointArray; // name, id, count_saved
      return action.payload;
    case 'SET_SAVED_POIS':
      // let savedPointsArray = [];
      // savedPointsArray.push(action.payload)
      // return savedPointsArray; // user_id, poi_id, name
      return action.payload;
    default:
      return state;
  }
};

export default pointsReducer;