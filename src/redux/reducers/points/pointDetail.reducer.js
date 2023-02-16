const pointDetailReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_POINT_DETAIL/ROUTE/:id':
        return action.payload; 
      default:
      return state;
  }
}

export default pointDetailReducer;