import mapboxgl from '!mapbox-gl';
import React, { useEffect, useRef } from 'react';

// Access token for MapBox, public scope
mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function NoLineMap () {
  const mapContainer = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      center: [-93.19426931505215, 44.9480407119586],
      zoom: 10,
      // interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

  },[])

  return (
    <div id='map' ref={mapContainer} style={{width: '100%', height: '300px'}}></div>
  )
}