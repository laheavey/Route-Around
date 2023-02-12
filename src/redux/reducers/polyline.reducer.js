const lineReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LINE':
      const coordinateObjects = action.payload; 
      const usableCoordinates = (coordinateObjects.map((pair) => Object.values(pair))); 
      return usableCoordinates; // shape_pt_lon, shape_pt_lat
      // return action.payload;
    default:
      return state;
  }
};

export default lineReducer;