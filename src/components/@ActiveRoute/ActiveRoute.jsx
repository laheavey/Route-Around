import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import mapboxgl from '!mapbox-gl';

import ActiveInfo from './ActiveInfo';

export default function RouteDetail() {
  let lng;
  let lat;

  const mapContainer = useRef(null);
  const [mapTest, setMapTest] = useState([0,0]);
  const map = useRef(null);
  const ref = useRef();
  const [dataLoaded, setDataLoaded] = useState(false);
  const lineCoordinates = useSelector((store) => store.line);
  const dispatch = useDispatch();
  const { id } = useParams();
  const pointDetail = useSelector((store) => store.pointDetail) 
  let activePointName = 'METRO Green Line'

  mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';
  useEffect(() => {
      dispatch({ type: 'FETCH_POINT_DETAIL/ROUTE/:id', payload: id})
      dispatch({ type: 'FETCH_LINE/:id', payload: id})
  },[])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-93.08674043028068, 44.94830546284459],
      zoom: 15,
      // interactive: false
    });

    pointDetail?.map((point) => {
      let popup = new mapboxgl.Popup({ 
        offset: 25,
        // closeButton: false,
        // closeOnClick: false 
      })
      .setText(`${point.name}`);
      
      let marker = new mapboxgl.Marker()
      .setLngLat([point.longitude, point.latitude])
      .setPopup(popup)
      .addTo(map);
      
    })

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
      setMapTest(map)
      return () => map.remove();
    })
  },[dataLoaded])
  

  function setActivePoint(pointName) {
    if (pointName === activePointName) return;
    document.getElementById(pointName).classList.add('active');
    document.getElementById(activePointName).classList.remove('active');
    lng = document.getElementById(pointName).getAttribute('longitude');
    lat = document.getElementById(pointName).getAttribute('latitude')

    mapTest.flyTo({center: [lng,lat], zoom: 17});
  }

  function isPointOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.bottom > 450;
  }

  const handleScroll = (event) => {
    for (const child of ref.current.childNodes) {
      if (isPointOnScreen(child.id)){
        setActivePoint(child.id)
        break;
      }
    }
  }
      
  useEffect(() => {
    const elemCurrent = ref.current
    elemCurrent.addEventListener("scroll", handleScroll, {passive: true})
  }, [handleScroll])

  return (
    <div id="top">
    <div id="map" ref={mapContainer} style={dataLoaded ? {width: '100%', height: '300px'} : {display: 'none'}}>
    </div>

    <div id='features' ref={ref}>
      <ActiveInfo />
    </div>
    </div>
  );
}