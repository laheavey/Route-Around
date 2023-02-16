import React from "react";
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import UserRouteHistory from "./UserRouteHistory";
import UserSavedPoints from './UserSavedPoints';

export default function UserActivity () {
  const userRouteHistory = useSelector((store) => store.userRouteHistory);
  const savedPoints = useSelector((store) => store.savedPoints)
  
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

        {/* <ListSubheader>{`Badges Earned →`}</ListSubheader>
        <Divider /> */}

        <ListSubheader>{`Saved Points of Interest →`}</ListSubheader>
        {savedPoints.map((save) => {
          return (
            <UserSavedPoints save={save} key={save.poi_id}/>
          )
        })}
        <Divider />

        <ListSubheader>{`Ride History →`}</ListSubheader>
        {userRouteHistory.map((ride) => {
          return (
            <UserRouteHistory ride={ride} key={ride.route_id}/>
          )
        })}
        </ul>
        </List> 
      </CardContent>
    </Box>
  )
}