import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserActivity from './UserActivity';
import UserDetails from './UserDetails'

export default function UserProfile() {
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.user)

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_ROUTE_HISTORY', payload: user.id});
    dispatch({ type: 'FETCH_SAVED_POIS', data: user.id})
  },[])

  return (
    <div>
      <UserDetails />
      <UserActivity />
    </div>
  )

}