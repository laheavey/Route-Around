import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function MapDetail () {
  const lineCoordinates = useSelector((store) => store.line);
  const [lng, setLng] = useState(-93.1917);
  const [lat, setLat] = useState(44.9568);
  const [zoom, setZoom] = useState(9.5);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    map.on('load', () => {
      map.addSource('lines', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'properties': {
              // ↓ could use routeDetail.color but no hash - concatenate or fix table?
              'color': '#000000' 
            },
            'geometry': {
              'type': 'LineString',
              'coordinates': (lineCoordinates)
            }
          }]
        }
      });
      map.addLayer({
        'id': 'lines',
        'type': 'line',
        'source': 'lines',
        'paint': {
          'line-width': 3,
          'line-color': ['get', 'color']
        }
      });
        // map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });

      })
  },[])

  return (
    <div ref={mapContainer} className="map-container" style={{width: '100%', height: '300px'}}></div>
  )
}