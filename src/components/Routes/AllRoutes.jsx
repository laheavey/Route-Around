import React, { useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';

import './Routes.css';

export default function AllRoutes() {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const allRoutes = useSelector((store) => store.allRoutes)

  useEffect(() => {
      dispatch({ type: 'FETCH_ALL_ROUTES' });

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-93.19426931505215, 44.9480407119586],
        zoom: 10,
        // interactive: false,
        style: 'mapbox://styles/mapbox/streets-v11'
      });
  },[])

  // List of all routes
  return (
    <>
    <div id='map' ref={mapContainer} style={{width: '100%', height: '300px'}}></div>
    <section className='flex-container route-detail' >
      <section className='ar-section'>
      <h2 className='top-h2'>{`All Routes →`}</h2>
      <ul className='ar-list'>
      {allRoutes.map((route) => (
        <li key={`${route.id}`}>
          <Link to={`/routeDetail/${route.id}`} >
          {route.route_name}
          </Link>
        </li>
      ))}
      </ul>
      </section>
    </section>
    <div className='grad'></div>
    </>
  );
}