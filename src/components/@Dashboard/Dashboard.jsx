import React, { useRef, useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

import './Dashboard.css';

//MAPBOX
import mapboxgl from '!mapbox-gl'; 

function Dashboard() {
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
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div>
      
      <div id='map' style={{width: '400px', height: '300px'}}></div>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;