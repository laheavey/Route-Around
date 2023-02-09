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
  // 💡 Zoom out; find array midpoint, use as center?
  const [lng, setLng] = useState(-93.0918);
  const [lat, setLat] = useState(44.9481);
  const [zoom, setZoom] = useState(9.5);

  // ARRAY OF ARRAYS: ↓ Coordinates for polyline, can probably be refactored. REVIEW
  const lineCoordinates = useSelector((store) => store.line);
  const usableCoordinates = (lineCoordinates.map((pair) => Object.values(pair)));

  // OBJECT: ↓ Completed_on; poi_id; poi_name; route_desc; route_id; route_name; route_url
  const routeDetail = useSelector((store) => store.routeDetail) 
  
  let completedTrips = routeDetail.completed_trips;

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
                'color': `#${routeDetail.route_color}` || '#33C9EB' 
              },
              'geometry': {
                'type': 'LineString',
                'coordinates': (usableCoordinates && usableCoordinates)
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

  const setCenter = () => {
    let halfArray = parseInt((usableCoordinates.length)/2)
    setLng(usableCoordinates[halfArray][0]);
    setLat(usableCoordinates[halfArray][1]);

    return [lng, lat];
  }

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
    </List>
    </>
  );
}