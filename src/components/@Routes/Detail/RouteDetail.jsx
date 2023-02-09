import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from '!mapbox-gl';
import { useParams } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function RouteDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-93.0918);
  const [lat, setLat] = useState(44.9481);
  const [zoom, setZoom] = useState(14);

  // ↓ Coordinates for polyline, can probably be refactored. REVIEW
  const lineCoordinates = useSelector((store) => store.line);
  const usableCoordinates = (lineCoordinates.map((pair) => Object.values(pair)));

  // ↓ Completed_on; poi_id; poi_name; route_desc; route_id; route_name; route_url
  const routeDetail = useSelector((store) => store.routeDetail) 
  

  useEffect(() => {
      dispatch({ type: 'FETCH_ROUTE_DETAIL/:id', payload: id});
      // Only rendering sometimes? REVIEW ⤵
      dispatch({ type: 'FETCH_LINE/:id', payload: id});

      if (map.current) return; // initialize map once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });
  
      // Had to add .current for this to work, found solution in StackOverflow;
      // Otherwise, map.on was not a function.
      map.current.on('load', () => {
        map.current.addSource('lines', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'properties': {
                // ↓ could use routeDetail.color but no hash - concatenate or fix table?
                'color':  '#33C9EB' 
              },
              'geometry': {
                'type': 'LineString',
                'coordinates': usableCoordinates
              }
            }]
          }
        });
        map.current.addLayer({
          'id': 'lines',
          'type': 'line',
          'source': 'lines',
          'paint': {
            'line-width': 3,
            'line-color': ['get', 'color']
          }
        });
      });
  },[])

  return (
    <>
    <div ref={mapContainer} className="map-container" style={{width: '100%', height: '300px'}}></div>
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
          <ListSubheader>{`Route Detail →`}</ListSubheader>
          {routeDetail.map((route) => (
            <ListItem key={`${route.route_id}`}>
              <ListItemText secondary={`${route.route_name}`} />
              <ListItemText secondary={`${route.route_desc}`} />
              
            </ListItem>
          ))}
        </ul>
        <ul>
          {routeDetail.map((route) => (
          <ListItem key={`${route.route_id}`}>
            <ListItemText inset secondary={`${route.route_url}`} />
          </ListItem>
          ))}
        </ul>
        <ul>
        <ListSubheader disableSticky>{`Points of Interest →`}</ListSubheader>
          {routeDetail.map((route) => (
          <ListItem key={`${route.route_id}`}>
            <ListItemText inset secondary={`${route.poi_name}`} />
          </ListItem>
          ))}
        </ul>
        <ul>
        <ListSubheader disableSticky>{`Ride History →`}</ListSubheader>
          {routeDetail.map((route) => (
          <ListItem key={`${route.route_id}`}>
            <ListItemText inset secondary={`${route.completed_on}`} />
          </ListItem>
          ))}
        </ul>
    </List>
    </>
  );
}