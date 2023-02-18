import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import UserActivity from './UserActivity';
import UserDetails from './UserDetails'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import UserRouteHistory from "./UserRouteHistory";
import UserSavedPoints from './UserSavedPoints';

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