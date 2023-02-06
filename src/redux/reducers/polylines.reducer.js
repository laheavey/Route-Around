const lineReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LINE':
      return action.payload;
    default:
      return state;
  }
};

export default lineReducer;
