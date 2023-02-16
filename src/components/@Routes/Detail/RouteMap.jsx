import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import mapboxgl from '!mapbox-gl';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function MapDetail () {
  const [dataLoaded, setDataLoaded] = useState(false);
  const lineCoordinates = useSelector((store) => store.line);
  const mapContainer = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_LINE/:id', payload: id});
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-93.1917, 44.9568],
      zoom: 10,
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
              'coordinates': lineCoordinates
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
      setDataLoaded(true)
      return () => map.remove();
      })
  },[dataLoaded])

  return (
    <>
    <div className="map-wrapper" style={dataLoaded ? undefined : {display: 'none'}}>
    <div ref={mapContainer} className="map-container" style={{width: '100%', height: '300px'}}></div>
    </div>
    </>
    
  )
}