const centerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CENTER':
      const centerArray = [...state]
      let secondCoordinateObjects = action.payload; 
      const secondUsableCoordinates = (secondCoordinateObjects.map((pair) => Object.values(pair))); 
      let halfArray = parseInt((secondUsableCoordinates.length)/2)
      centerArray.push(secondUsableCoordinates[halfArray][0]);
      centerArray.push(secondUsableCoordinates[halfArray][1]);
      return centerArray;
    default:
      return state;
  }
}

export default centerReducer;