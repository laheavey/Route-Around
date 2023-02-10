import React from "react";
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import UserRouteHistory from "./UserRouteHistory";

export default function UserActivity () {
  const userRouteHistory = useSelector((store) => store.userRouteHistory);

  console.log('UserRouteHistory: ', userRouteHistory)
  // console.log('userRouteHistory[0]: ', userRouteHistory[0].route_name);
  // console.log('userRouteHistory, mapped: ', userRouteHistory.map((ride) => ride.route_name));
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
      <List
        sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
        '& ul': { padding: 0 }
        }}
        subheader={<li />}>
        <ul>

        <ListSubheader>{`Badges Earned →`}</ListSubheader>
        <Divider />

        <ListSubheader>{`Saved Points of Interest →`}</ListSubheader>
        <Divider />
        
        <ListSubheader>{`Ride History →`}</ListSubheader>
        {userRouteHistory.map((ride) => {
          return (
            <UserRouteHistory ride={ride}/>
          )
        })}
        </ul>
        </List> 
      </CardContent>
    </Box>
  )
}