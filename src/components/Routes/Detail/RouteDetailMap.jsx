import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function RouteDetailMap ({routeBundle}) {
  const mapContainer = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  // const lineCoordinates = useSelector((store) => store.line);
  // const routeDetail = useSelector((store) => store.routes.routeDetailReducer)

  useEffect(() => {
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
              'color': routeBundle.routeDetail.route_color 
            },
            'geometry': {
              'type': 'LineString',
              'coordinates': routeBundle.lineCoordinates
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
    <div id='map' ref={mapContainer} style={dataLoaded ? {width: '100%', height: '38%'} : {display: 'none'}}></div>
    </>
  )
}