import React from "react";
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function UserDetails () {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:"center" }}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        src="https://cdn-icons-png.flaticon.com/512/18/18601.png"
        />
        <Typography variant="body2" color="text.secondary">
        Edit Details
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="body1" component="div" >
            username <br/>
            email<br/>
            joined on<br/>
          </Typography>
        </CardContent>
      </Box>
    </>
  )
}