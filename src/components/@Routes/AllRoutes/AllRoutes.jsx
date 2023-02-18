import React, { useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from '!mapbox-gl';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function AllRoutes() {
  const mapContainer = useRef(null);
  const dispatch = useDispatch();
  const allRoutes = useSelector((store) => store.allRoutes)

  useEffect(() => {
      dispatch({ type: 'FETCH_ALL_ROUTES' });

      var map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-93.19426931505215, 44.9480407119586],
        zoom: 10,
        interactive: false,
        style: 'mapbox://styles/mapbox/streets-v11'
      });

  },[])

  // List of all routes
  return (
    <>
    <div id='map' ref={mapContainer} style={{width: '100%', height: '300px'}}></div>
    <section id='features'> 
          <h3>{`All Routes →`}</h3>
          {allRoutes.map((route) => (
          <li>
          <Link to={`/routeDetail/${route.id}`} key={`${route.id}`}>
          {route.route_name}
          </Link> </li>

          ))}
          </section>
    </>
  );
}