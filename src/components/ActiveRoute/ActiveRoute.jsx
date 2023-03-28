import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';
import './ActiveRoute.css';
import ActivePointInfo from './ActivePointInfo';

// Map, info component
export default function ActiveRoute() {
  document.title = 'RouteAround';
  const { id } = useParams();
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();
  const ref = useRef();
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [mapTest, setMapTest] = useState([0,0]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const lineCoordinates = useSelector((store) => store.line);
  const pointsByRoute = useSelector((store) => store.points.pointsByRouteReducer) 
  let reversePointsByRoute = [...pointsByRoute].reverse()
  let activePointName = 'METRO Green Line'
  let lng;
  let lat;

  mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';
  useEffect(() => {
    dispatch({ type: 'SAGA/FETCH_POINTS_BY_ROUTE', payload: id})
    dispatch({ type: 'FETCH_LINE/:id', payload: id})
  },[])


  useEffect(() => {
    // Builds map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: 
        (routeMatch.path.includes('reverse') 
      ? [-93.278596, 44.983472]
      : [-93.08674043028068, 44.94830546284459]
      ),
      zoom: 15,
    });

    // On load, instructions for map (data sources for line)
    map.on('load', () => {
      map.addSource('lines', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'properties': {
              // ↓ tried lineCoordinates[0][2], not rendering, revisit.
              'color': '#008144'
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

      setDataLoaded(true) // Toggles 'dataLoaded' state, ensures display when loaded
      setMapTest(map) // Used for centering animation on scroll
      return () => map.remove(); // removes map
    })

    pointsByRoute?.map((point) => {
      // Pop-ups that show when clicking individual markers
      let popup = new mapboxgl.Popup({ 
        offset: 25,
        // closeButton: false,
        // closeOnClick: false 
      })
        .setText(`${point.name}`);
      // Marker indicates point location on map
      let marker = new mapboxgl.Marker()
        .setLngLat([point.longitude, point.latitude])
        .setPopup(popup)
        .addTo(map);
    })
    
  },[dataLoaded])

  function setActivePoint(pointName) {
    if (pointName === activePointName) return; 
    document.getElementById(pointName).classList.add('active'); // Adds 'active' class to new point
    document.getElementById(activePointName).classList.remove('active'); // Removes class from old point
    lng = document.getElementById(pointName).getAttribute('longitude'); // Grabs longitude
    lat = document.getElementById(pointName).getAttribute('latitude') // Grabs latitude

    mapTest.flyTo({center: [lng,lat], zoom: 17}); // Centers map according to active point
  }

  // Checks to see if a point is on screen
  function isPointOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.bottom > 450;
  }

  // Sets point to active if on screen
  const handleScroll = (event) => {
    for (const child of ref.current.childNodes) {
      if (isPointOnScreen(child.id)){
        setActivePoint(child.id)
        break;
      }
    }
  }



  // On load, adds event listener for scroll
  useEffect(() => {
    const elemCurrent = ref.current
    elemCurrent.addEventListener("scroll", handleScroll, {passive: true})
  }, [handleScroll])

  return (
    <>
      <div id="map" ref={mapContainer} style={dataLoaded ? {width: '100%', height: '38%'} : {display: 'none'}}></div>
      <section id='features' ref={ref}>
        {routeMatch.path.includes('reverse')
        ? <ActivePointInfo pointsByRoute={reversePointsByRoute}/>
        : <ActivePointInfo pointsByRoute={pointsByRoute}/>
        }
        
      </section>
    </>
    
  );
}