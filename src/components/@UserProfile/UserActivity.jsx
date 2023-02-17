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
    <div id='feature'>
    <section >
      
      
        

        {/* <ListSubheader>{`Badges Earned →`}</ListSubheader>
        <Divider /> */}

        {`Saved Points of Interest →`}
        {savedPoints.map((save) => {
          return (
            <UserSavedPoints save={save} key={save.poi_id}/>
          )
        })}
        <Divider />

        {`Ride History →`}
        {userRouteHistory.map((ride) => {
          return (
            // <UserRouteHistory ride={ride} key={ride.route_id}/>
            <p>{`${ride.route_name}`}</p>
          )
        })}
        

    </section>
    </div>
  )
}