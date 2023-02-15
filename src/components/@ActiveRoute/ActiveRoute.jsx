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
  const ref = useRef();
  const [dataLoaded, setDataLoaded] = useState(false);
  const lineCoordinates = useSelector((store) => store.line);
  const mapContainer = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const points = useSelector((store) => store.points) 
  const textBox = document.querySelector("div#features");
  let activeChapterName = 'Minnesota Building';

  mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';
  useEffect(() => {
      dispatch({ type: 'FETCH_POINT_DETAIL/ROUTE/:id', payload: id})
      dispatch({ type: 'FETCH_LINE/:id', payload: id})
  },[])

  // useEffect(() => {
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
  // },[dataLoaded])
  const myRef = ref.current
  var bbTop = 0	
var bbBottom = 0
var height = 0
var prevStep = 0
var currentStep = 0
var numSteps = 0
const viewportHeight = 667;
// const halfViewportHeight = viewportHeight/2


// var checkTrigger = function() {
// 	if (bbTop < viewportHeight && bbBottom > 0) {
// 		var progress = Math.abs(bbTop - halfViewportHeight) / height * numSteps
//     console.log('Progress: ', progress)
// 		var step = Math.floor(progress)
//     console.log('Step: ', step)
// 		currentStep = Math.min(Math.max(step, 0), numSteps - 1)
//     console.log('Current step: ', currentStep);
// 	}
// }

// var checkEnterExit = function() {
// 	var bottomFromTop = bbBottom - viewportHeight
// 	var bottom
// 	var fixed

// 	if (bbTop < 0 && bottomFromTop > 0) {
// 		bottom = false
// 		fixed = true
// 	} else if (bbTop < 0 && bottomFromTop < 0) {
// 		bottom = true
// 		fixed = false
// 	} else {
// 		bottom = false
// 		fixed = false
// 	}
	
// 	// toggle(fixed, bottom)
// }

// var handleScroll = function() {
// 	var bb = ref.current.getBoundingClientRect()
// 	bbTop = bb.top
// 	bbBottom = bb.bottom
	
// 	checkTrigger()
// 	checkEnterExit()
// }

// let activeChapterName = 'baker';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;
 
// map.flyTo(chapters[chapterName]);
 
document.getElementById(chapterName).classList.add('active');
document.getElementById(activeChapterName).classList.remove('active');
 
activeChapterName = chapterName;
console.log('Active element: ', activeChapterName)
console.log('Element bounds.top: ', document.getElementById(chapterName).getBoundingClientRect().top)
console.log('Element bounds.bottom: ', document.getElementById(chapterName).getBoundingClientRect().bottom)
}

    function isElementOnScreen(id) {
      const element = document.getElementById(id);
      const bounds = element.getBoundingClientRect();
      // console.log('window.innerHeight ', (window.innerHeight/2))
      // console.log('Element: ', element.id)
      // console.log('bounds.bottom: ', bounds.bottom);
      // console.log('bounds.top: ', bounds.top);
      // console.log('window.innerHeight: ', window.innerHeight)
      // console.log('Length?: ', ref.current.childNodes.length)
      return bounds.top < 300 && bounds.bottom > 325;
      }


    const handleScroll = (event) => {
      // let children = parentElement.children;
      // let firstChild = myElement.firstElementChild;
      // console.log(ref.current)
      // console.log(document.getElementById('features'))
      const myRef = ref.current;
      // const myElement = document.getElementById('features');
// console.log('myRef.height: ', ref.current.getBoundingClientRect().height)
// console.log(ref.current.childNodes)
// console.log(ref.current.childNodes[3].id)
      for (const child of ref.current.childNodes) {
        // console.log('ID? ', child.id);
        if (isElementOnScreen(child.id)){
          setActiveChapter(child.id)
          // console.log(child.id)
          break;
        }
      }
        }
      
    useEffect(() => {

      const elemCurrent = ref.current
      // console.log('myRef.height: ', ref.current.getBoundingClientRect().height)
      console.log('Length?', ref.current.childNodes.length)
      numSteps = ref.current.childNodes.length;
      height = ref.current.getBoundingClientRect().height;
      // const element = document.getElementById('features')
      elemCurrent.addEventListener("scroll", handleScroll)

      // console.log(elemCurrent)
      // console.log(element);
    }, [handleScroll])
  
  return (
    <div id="top">
    {/* <ActiveMap  /> */}
    <div id="map" ref={mapContainer} style={dataLoaded ? {width: '100%', height: '300px'} : {display: 'none'}}>
    </div>

    <div id='features' ref={ref}>
      {points.map((point) => {
        return (
          <section id={`${point.name}`}>
            <h3>{`${point.name}`}</h3>
            <p>{`${point.short_desc}`}</p>
          </section>
        )

      })}
      <section id="test1" className="active">
        <h3>Union Depot</h3>
        <p>The first Union Depot was built near the river in 1881. After a second fire destroyed the station, the design for the grand neo-classical building standing today was commissioned in 1913. The railroads, the post office and Saint Paul Union Depot Co. offered opportunities for jobs and travel from this historic neighborhood.

        The last passenger train (Burlington’s Afternoon Zephyr) serving Union Depot in the 20th century departed on April 30, 1971. The building never stood empty and its use as a passenger station was never far from peoples’ hearts and minds.

        Ramsey County Regional Railroad Authority bought Union Depot and began a massive two-year restoration of the 33-acre property in 2011.</p>
      </section>

    </div>


{/* <ActiveInfo /> */}

    </div>
  );
}