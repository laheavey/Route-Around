import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from '!mapbox-gl';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function AllRoutes() {
  const dispatch = useDispatch();
  const allRoutes = useSelector((store) => store.allRoutes)

  useEffect(() => {
      dispatch({ type: 'FETCH_ALL_ROUTES' });

      var map = new mapboxgl.Map({
        container: 'map',
        center: [-93.19426931505215, 44.9480407119586],
        zoom: 10,
        interactive: false,
        style: 'mapbox://styles/mapbox/streets-v11'
      });
  
      map.addControl(new mapboxgl.FullscreenControl());

  },[])

  // List of all routes
  return (
    <>
    <div id='map' style={{width: '100%', height: '300px'}}></div>
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
          <ListSubheader>{`All Routes →`}</ListSubheader>
          {allRoutes.map((route) => (
            <ListItem key={`${route.id}`}>
              <ListItemText inset secondary={`${route.route_name} // ${route.route_desc}`} />
            </ListItem>
          ))}
        </ul>
    </List>
    </>
  );
}