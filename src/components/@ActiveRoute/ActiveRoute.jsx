import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import ActiveMap from './ActiveMap';

export default function RouteDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const routeDetail = useSelector((store) => store.routeDetail) 
  const allPoints = useSelector((store) => store.allPoints);

  useEffect(() => {
      dispatch({ type: 'FETCH_ROUTE_DETAIL/:id', payload: id});
      dispatch({ type: 'FETCH_POINT_DETAIL/ROUTE/:id', payload: id})
  },[])

  return (
    <>
    <ActiveMap  />
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
        '& ul': { padding: 0 }
      }}
      subheader={<li />}
      >
      <ul>
        <ListSubheader>{`${routeDetail.route_name} Detail →`}</ListSubheader>
        {allPoints.map((point) => {
          return (
            <ListItem >
            <ListItemText 
              key={`${point.id}`}
              primary={`${point.name}`}
              secondary={`${point.short_desc}`}></ListItemText>
            </ListItem>
            
          )
        })}

      </ul>
    </List>
    </>
  );
}