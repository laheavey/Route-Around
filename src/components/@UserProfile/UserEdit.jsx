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
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import UserEditDetails from './UserEditDetails'

export default function UserEdit() {
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.user)

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_ROUTE_HISTORY', payload: user.id});
  },[])

  return (
    <>
    <Card sx={{ 
      display: 'flex', 
      width: 350, 
      marginTop: 10, 
      alignItems:"center",
      marginLeft: 1.5
    }}>
      <UserDetails />
    </Card>

    <Card sx={{ 
      display: 'flex', 
      width: 350, 
      align:"center",
      marginTop: 1,
      marginLeft: 1.5,
    }}>
      <UserEditDetails />
    </Card>

    </>

  )

}