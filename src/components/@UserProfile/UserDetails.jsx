import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function UserDetails () {
  const user = useSelector((store) => store.user)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:"center", margin: 1.5 }}>
        <CardMedia
        component="img"
        sx={{ width: 50 }}
        src={`${user.profile_img}`}
        />
        <Typography variant="caption" color="text.secondary" >
          <Link to={`/edit/profile/${user.id}`}>
        Edit Details
        </Link>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 'auto' }}>
          <List>
          <Typography variant="body2" component="div" >
            {"Username: "}{user.username} <br/>
            {"Email: "}{user.email}<br/>
            {"Account Created: "}{user.account_created}<br/>
          </Typography>
          </List>
        </CardContent>
      </Box>
    </>
  )
}