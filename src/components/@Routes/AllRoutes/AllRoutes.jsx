import React, { useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';

export default function AllRoutes() {
  const mapContainer = useRef(null);
  const dispatch = useDispatch();
  const allRoutes = useSelector((store) => store.allRoutes)

  useEffect(() => {
      dispatch({ type: 'FETCH_ALL_ROUTES' });

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-93.19426931505215, 44.9480407119586],
        zoom: 10,
        interactive: false,
        style: 'mapbox://styles/mapbox/streets-v11'
      });
  },[])

  // List of all routes
  return (
    <>
    <div id='map' ref={mapContainer} style={{width: '100%', height: '300px'}}></div>
      <section id='features'> 
      <h1>{`All Routes →`}</h1>
      {allRoutes.map((route) => (
        <li>
          <Link to={`/routeDetail/${route.id}`} key={`${route.id}`}>
          {route.route_name}
          </Link>
        </li>
      ))}
    </section>
    <div className='grad'></div>
    </>
  );
}