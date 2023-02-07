import React, { useRef, useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

import PopularInfo from './PopularInfo.jsx';
import './Dashboard.css';



import mapboxgl from '!mapbox-gl'; 

function Dashboard(props) {
  const user = useSelector((store) => store.user);

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
      <div id='map' style={{width: '400px', height: '300px'}}></div>
      <PopularInfo />
    </>
  )
}

export default Dashboard;