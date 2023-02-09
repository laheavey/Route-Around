import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import mapboxgl from '!mapbox-gl';

import LogOutButton from '../LogOutButton/LogOutButton.jsx';
import PopularInfo from './PopularInfo.jsx';
import './Dashboard.css';

// Access token for MapBox, public scope
mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

function Dashboard() {
  // Map rendering specifications
  useEffect(() => {
    var map = new mapboxgl.Map({
      container: 'map',
      center: [-93.19426931505215, 44.9480407119586],
      zoom: 10,
      interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    map.addControl(new mapboxgl.FullscreenControl());
  })
  
  // Div where map renders, PopularInfo component lists routes & 
  // points of interest
  return (
    <>
      <div id='map' style={{width: '100%', height: '300px'}}></div>
      <PopularInfo />
      <LogOutButton />
    </>
  )
}

export default Dashboard;