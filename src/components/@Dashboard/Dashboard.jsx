import React, { useRef, useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

import './Dashboard.css';

//MAPBOX
import mapboxgl from '!mapbox-gl'; 

function Dashboard() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-93.0918);
  const [lat, setLat] = useState(44.9481);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    dispatch({ type: 'FETCH_LINE'})
    /** ---------- MAPBOX ---------- **/
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11?',
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
              'color': '#33C9EB' // red
            },
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [-93.086713,44.948219],
                [-93.087345,44.947911],
                [-93.088155,44.947522],
                [-93.088719,44.947252],
                [-93.090019,44.946589],
                [-93.091183,44.946032],
                [-93.091282,44.946012],
                [-93.092301,44.946146],
                [-93.093202,44.946264],
                [-93.093226,44.946311],
                [-93.093956,44.947111],
                [-93.095451,44.948627],
                [-93.095805,44.948982],
                [-93.096473,44.949649],
                [-93.096985,44.950156],
                [-93.097036,44.950183],
                [-93.097103,44.950285],
                [-93.097513,44.950651],
                [-93.097836,44.950939],
                [-93.097925,44.950975],
                [-93.098157,44.951209],
                [-93.098287,44.951336],
                [-93.098469,44.951509],
                [-93.098576,44.951608],
                [-93.098608,44.951653],
                [-93.098644,44.951718]
              ]
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
  },[]);


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div>
      <div ref={mapContainer} className="map-container" />
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;