import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFoZWF2ZXkiLCJhIjoiY2xkczZ5MzlsMDJhNTNwbWx6Nnk1bm1hNyJ9.7_Y-O03vhnebg8xOsSN0GQ';

export default function AllPoints() {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const allPoints = useSelector((store) => store.allPoints)
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
      dispatch({ type: 'FETCH_ALL_POINTS' });

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-93.19426931505215, 44.9480407119586],
        zoom: 10,
        style: 'mapbox://styles/mapbox/streets-v11'
      });
  
      allPoints.map((point) => {
        let popup = new mapboxgl.Popup({ offset: 25 })
          .setText(`${point.name}`);

        let marker = new mapboxgl.Marker()
          .setLngLat([point.longitude, point.latitude])
          .addTo(map)
          .setPopup(popup)
        
      })

      map.on('load', () => {
        setDataLoaded(true)
      })
  },[dataLoaded])

  // List of all points
  return (
    <>
    <div id='map' ref={mapContainer} style={dataLoaded ? {width: '100%', height: '300px'} : {display: 'none'}}></div>
    <section id='features' >
      <h1>{`All Points of Interest →`}</h1>
      {allPoints.map((point) => (
        <li>
          <Link to={`/pointDetail/${point.id}`} key={`${point.id}`}>
            {`${point.name}`}
          </Link>
        </li>
      ))}
    </section>
    </>
  );
}