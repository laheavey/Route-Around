import React, { useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';

import './Routes.css';

export default function AllRoutes() {
  document.title = 'RouteAround - All Routes';
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const allRoutes = useSelector((store) => store.routes.allRoutesReducer)

  useEffect(() => {
      dispatch({ type: 'SAGA/FETCH_ALL_ROUTES' });
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
    <div id='map' ref={mapContainer} style={{width: '100%', height: '38%'}}></div>
    <section className='flex-container route-detail' >
      <section className='ar-section'>
      <h2 className='top-h2'>{`All Routes →`}</h2>
      <ul className='ar-list'>
      {allRoutes.map((route) => (
        <li key={`${route.route_id}`}>
          <Link to={`/routeDetail/${route.route_id}`} >
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