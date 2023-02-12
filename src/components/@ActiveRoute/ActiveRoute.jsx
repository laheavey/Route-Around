import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import RouteMap from './RouteMap';
import RouteInfo from './RouteInfo';
import { useSelector } from "react-redux";

export default function RouteDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
      dispatch({ type: 'FETCH_ROUTE_DETAIL/:id', payload: id});
  },[])

  return (
    <>
    <RouteMap  />
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
      <RouteInfo />
    </List>
    </>
  );
}