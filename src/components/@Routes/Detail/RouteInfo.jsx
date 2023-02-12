import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function RouteInfo () {
  const routeDetail = useSelector((store) => store.routeDetail) 
  const completedTrips = routeDetail.completed_trips;
  
  return (
    <>
      <ul>
        <ListSubheader>{`Route Detail →`}</ListSubheader>
          <ListItem >
            <ListItemText secondary={`${routeDetail.route_name}`} />
            <ListItemText secondary={`${routeDetail.route_desc}`} />
          </ListItem>
      </ul>
      <ul>
        <ListItem >
          <ListItemText inset secondary={`${routeDetail.route_url}`} />
        </ListItem>
      </ul>
      <ul>
      <ListSubheader disableSticky>{`Points of Interest →`}</ListSubheader>
        <ListItem >
          <ListItemText inset secondary={`${routeDetail.poi_name}`} />
        </ListItem>
      </ul>
      {completedTrips && 
      <ul>
      <ListSubheader disableSticky>{`Ride History →`}</ListSubheader>
        {completedTrips.map((trip) => {
          return (
            <ListItem key={`1-${trip}-${routeDetail.id}`}>
              <ListItemText inset secondary={`${trip}`} />
            </ListItem>
          )
        })}
      </ul>
      }
    </>
  )
}