const pointsReducer = (state = {}, action) => {
  switch (action.type) {
    // case 'SET_ALL_POINTS':
      // console.log(action.payload)
      // let newArray = [];
      // newArray.push(action.payload);
      // return newArray; // id, name
    case 'SET_POINT_DETAIL':
      return action.payload;
      // id, name, image_url, longitude, latitude, description, 
      // sources_cited
    default:
      return state;
  }
};

export default pointsReducer;