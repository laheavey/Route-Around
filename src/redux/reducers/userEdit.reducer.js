const userEditReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NEW_EMAIL':
      const newEmailValue = action.payload;
      return {...state, email: newEmailValue}
    default:
      return state;
  }
};

export default userEditReducer;