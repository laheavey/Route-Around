import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './User.css';
import UserActivity from './UserActivity';
import UserDetails from './UserDetails'

export default function UserProfile() {
  document.title = 'RouteAround - User Profile';
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.user)

  useEffect(() => {
    dispatch({ type: 'SAGA/FETCH_USER_ROUTE_HISTORY', payload: user.id});
    dispatch({ type: 'SAGA/FETCH_SAVED_POIS', data: user.id})
  },[])

  return (
    <>
      <UserDetails />
      <UserActivity />
    </>
  )

}