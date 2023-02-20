import React from 'react';
import Card from '@mui/material/Card';

import '../User.css';
import UserDetails from '../UserDetails'
import UserEditDetails from './UserEditDetails'

export default function UserEdit() {
  
  return (
    <>
      <UserDetails />
      <UserEditDetails />
    </>
  )

}