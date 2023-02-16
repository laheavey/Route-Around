import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

// import AllPointsMap from './AllPointsMap';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function AllPoints() {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const allPoints = useSelector((store) => store.allPoints)
  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
      dispatch({ type: 'FETCH_ALL_POINTS' });

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-93.19426931505215, 44.9480407119586],
        zoom: 10,
        style: 'mapbox://styles/mapbox/streets-v11'
      });
  
      allPoints.map((point) => {
        let popup = new mapboxgl.Popup({ offset: 25 })
          .setText(`${point.name}`);

        let marker = new mapboxgl.Marker()
        .setLngLat([point.longitude, point.latitude])
        .addTo(map)
        .setPopup(popup)
        
        
      })


      map.on('load', () => {
        setDataLoaded(true)
      })
  },[dataLoaded])

  // List of all points
  return (
    <>
    <div id='map' ref={mapContainer} style={dataLoaded ? {width: '100%', height: '300px'} : {display: 'none'}}></div>
    {/* <AllPointsMap /> */}
    <div id='features' >
          <ListSubheader>{`All Points of Interest →`}</ListSubheader>
          {allPoints.map((point) => (
            <ListItem key={`${point.id}`}>
              <Link to={`/pointDetail/${point.id}`}>
              <ListItemText primary={`${point.name}`} />
              </Link>
            </ListItem>
          ))}
    </div>
    </>
  );
}