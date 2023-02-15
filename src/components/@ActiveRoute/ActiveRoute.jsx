import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import mapboxgl from '!mapbox-gl';
import { useCallback } from 'react';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import './ActiveStyles.css'

import ActiveMap from './ActiveMap';
import ActiveInfo from './ActiveInfo';



export default function RouteDetail() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const ref = useRef();
  const [centerCoords, setCenterCoords] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false);
  const lineCoordinates = useSelector((store) => store.line);
  const dispatch = useDispatch();
  const { id } = useParams();
  const points = useSelector((store) => store.points) 
  let activeChapterName = 'Great Northern Building'

  mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';
  useEffect(() => {
      dispatch({ type: 'FETCH_POINT_DETAIL/ROUTE/:id', payload: id})
      dispatch({ type: 'FETCH_LINE/:id', payload: id})
  },[])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [-93.08674043028068, 44.94830546284459],
      center: [-93.08674043028068, 44.94830546284459],
      zoom: 15,
      interactive: false,
    });

    points.map((point) => {
      let popup = new mapboxgl.Popup({ offset: 25 })
        .setText(`${point.name}`);
      let marker = new mapboxgl.Marker()
      .setLngLat([point.longitude, point.latitude])
      .addTo(map)
      .setPopup(popup)
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
    //     // map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
    return () => map.remove();
      })
  },[dataLoaded])


  // const mapTest = () => {
  //   const map = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [-93.08674043028068, 44.94830546284459],
  //     zoom: 15,
  //     // interactive: false,
  //   });

  //   points.map((point) => {
  //     let popup = new mapboxgl.Popup({ offset: 25 })
  //       .setText(`${point.name}`);
  //     let marker = new mapboxgl.Marker()
  //     .setLngLat([point.longitude, point.latitude])
  //     .addTo(map)
  //     .setPopup(popup)
  //   })

  //   map.on('load', () => {
  //     map.addSource('lines', {
  //       'type': 'geojson',
  //       'data': {
  //         'type': 'FeatureCollection',
  //         'features': [{
  //           'type': 'Feature',
  //           'properties': {
  //             // ↓ could use routeDetail.color but no hash - concatenate or fix table?
  //             'color': '#000000' 
  //           },
  //           'geometry': {
  //             'type': 'LineString',
  //             'coordinates': lineCoordinates
  //           }
  //         }]
  //       }
  //     });
  //     map.addLayer({
  //       'id': 'lines',
  //       'type': 'line',
  //       'source': 'lines',
  //       'paint': {
  //         'line-width': 3,
  //         'line-color': ['get', 'color']
  //       }
  //     });
  //     setDataLoaded(true)
  //   //     // map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });

  //     })
  // }


  function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    document.getElementById(chapterName).classList.add('active');
    document.getElementById(activeChapterName).classList.remove('active');
    
    // let lng = document.getElementById(chapterName).getAttribute('longitude');
    // let lat = document.getElementById(chapterName).getAttribute('latitude')

    // setCenterCoords([lng,lat])
    activeChapterName = chapterName;
    console.log('ActiveChapterName: ', activeChapterName)
    console.log('This: ', this)
    // mapContainer.jumpTo({ 'center': [lng, lat], 'zoom': 14 })
    // map.setCenter([lng, lat]);
  }

  function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.bottom > 400;
  }

  const handleScroll = (event) => {
    for (const child of ref.current.childNodes) {
      if (isElementOnScreen(child.id)){
        setActiveChapter(child.id)
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
    {/* <ActiveMap  /> */}
    <div id="map" ref={mapContainer} style={dataLoaded ? {width: '100%', height: '300px'} : {display: 'none'}}>
    </div>

    <div id='features' ref={ref}>
      {points.map((point) => {
        return (
          <section 
            key={`${point.id}`} 
            id={`${point.name}`}
            longitude={`${point.longitude}`}
            latitude={`${point.latitude}`}>
            <h3>{`${point.name}`}</h3>
            <p>{`${point.short_desc}`}</p>
          </section>
        )

      })}
      {/* <section id="test1" className="active">
        <h3>Union Depot</h3>
        <p>The first Union Depot was built near the river in 1881. After a second fire destroyed the station, the design for the grand neo-classical building standing today was commissioned in 1913. The railroads, the post office and Saint Paul Union Depot Co. offered opportunities for jobs and travel from this historic neighborhood.

        The last passenger train (Burlington’s Afternoon Zephyr) serving Union Depot in the 20th century departed on April 30, 1971. The building never stood empty and its use as a passenger station was never far from peoples’ hearts and minds.

        Ramsey County Regional Railroad Authority bought Union Depot and began a massive two-year restoration of the 33-acre property in 2011.</p>
      </section> */}

    </div>


{/* <ActiveInfo /> */}

    </div>
  );
}