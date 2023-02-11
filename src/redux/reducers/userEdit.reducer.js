const userEditReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_TO_EDIT':
      return action.payload
    case 'SET_NEW_EMAIL':
      const newEmailValue = action.payload;
      return {...state, email: newEmailValue}
    case 'SET_NEW_IMG':
      const newImgValue = action.payload;
      return {...state, profile_img: newImgValue}
    default:
      return state;
  }
};

export default userEditReducer;