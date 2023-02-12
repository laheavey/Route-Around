import React from 'react';
import Card from '@mui/material/Card';

import UserDetails from './UserDetails'
import UserEditDetails from './UserEditDetails'

export default function UserEdit() {
  
  return (
    <>
    <Card sx={{ 
      display: 'flex', 
      width: 350, 
      marginTop: 1, 
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