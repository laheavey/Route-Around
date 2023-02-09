const lineReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LINE':
      return action.payload; // shape_pt_lon, shape_pt_lat
    default:
      return state;
  }
};

export default lineReducer;