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
  // const lineCoordinates = useSelector((store) => store.line);
  // const [lng, setLng] = useState(-93.1917);
  // const [lat, setLat] = useState(44.9568);

  useEffect(() => {
      dispatch({ type: 'FETCH_ROUTE_DETAIL/:id', payload: id});
      // dispatch({ type: 'FETCH_LINE/:id', payload: id});// Only rendering sometimes? REVIEW 
      
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