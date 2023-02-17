import mapboxgl from '!mapbox-gl';
import React, { useEffect } from 'react';

// Access token for MapBox, public scope
mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function NoLineMap () {
  useEffect(() => {
    var map = new mapboxgl.Map({
      container: 'map',
      center: [-93.19426931505215, 44.9480407119586],
      zoom: 10,
      interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

  },[])

  return (
    <div id='map' style={{width: '100%', height: '300px'}}></div>
  )
}