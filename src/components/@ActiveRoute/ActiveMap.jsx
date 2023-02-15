import React from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import mapboxgl from '!mapbox-gl';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './ActiveStyles.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function ActiveMap (props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const points = useSelector((store) => store.points) 
  const lineCoordinates = useSelector((store) => store.line);
  const mapContainer = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-93.08674043028068, 44.94830546284459],
      zoom: 15,
      // interactive: false,
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

      })
  },[dataLoaded])


  return (
    <>
    <div id="map" ref={mapContainer} style={dataLoaded ? {width: '100%', height: '300px'} : {display: 'none'}}>
    </div>
    {/* <div id='features'>
      <section id="test1" class="active">
        <h3>Union Depot</h3>
        <p>The first Union Depot was built near the river in 1881. After a second fire destroyed the station, the design for the grand neo-classical building standing today was commissioned in 1913. The railroads, the post office and Saint Paul Union Depot Co. offered opportunities for jobs and travel from this historic neighborhood.

        The last passenger train (Burlington’s Afternoon Zephyr) serving Union Depot in the 20th century departed on April 30, 1971. The building never stood empty and its use as a passenger station was never far from peoples’ hearts and minds.

        Ramsey County Regional Railroad Authority bought Union Depot and began a massive two-year restoration of the 33-acre property in 2011.</p>
      </section>
      <section id="test2">
        <h3>Pioneer and Endicott Buildings</h3>
        <p>The Pioneer and Endicott Buildings are two office buildings located in downtown Saint Paul, Minnesota, United States. The 1890-built Endicott building forms an L-shape around the 1889-built Pioneer Building. At its completion, the Pioneer building was the tallest in Saint Paul. The Endicott building was designed by Cass Gilbert and James Knox Taylor; the Pioneer Building was designed by Solon Spencer Beman in the Romanesque style; it was the first building in the United States to have a glass elevator. Connected in the 1940s, they are together listed in the National Register of Historic Places. The Pioneer Building was the tallest building in Saint Paul, Minnesota from its construction in 1889 until 1915 when the Cathedral of St. Paul was constructed. </p>
      </section>
    </div> */}
    </>
    
  )
}