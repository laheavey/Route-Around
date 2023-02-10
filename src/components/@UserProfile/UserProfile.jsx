import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';

import UserActivity from './UserActivity';
import UserDetails from './UserDetails'

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  // const userRouteHistory = useSelector((store) => store.userRouteHistory)

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_ROUTE_HISTORY', payload: user.id});
    dispatch({ type: 'FETCH_SAVED_POIS', data: user.id})
  },[])

  return (
    <>
    <Card sx={{ display: 'flex', width: 350, marginTop: 10}}>
      <UserDetails />
    </Card>
    <Card sx={{ display: 'flex', width: 350, marginTop: 1}}>
      <UserActivity />
    </Card>
    </>

  )

}