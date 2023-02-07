import React, { useRef, useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import mapboxgl from '!mapbox-gl';

import PopularInfo from './PopularInfo.jsx';
import './Dashboard.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

function Dashboard() {

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
  
  return (
    <>
      <div id='map' style={{width: '100%', height: '300px'}}></div>
      <PopularInfo />
    </>
  )
}

export default Dashboard;