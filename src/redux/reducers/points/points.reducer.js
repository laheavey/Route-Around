const pointsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ALL_POINTS':
      console.log(action.payload)
      let newArray = [];
      newArray.push(action.payload);
      return newArray; // id, name
    case 'SET_POINT_DETAIL':
      return action.payload;
      // id, name, image_url, longitude, latitude, description, 
      // sources_cited
    // case 'SET_POPULAR_POINTS':
    //   let newerArray = [];
    //   newerArray.push(action.payload);
    //   return newerArray; // name, id, count_saved
    //   return action.payload
    default:
      return state;
  }
};

export default pointsReducer;