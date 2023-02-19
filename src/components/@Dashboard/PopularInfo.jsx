import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PopularPoints from './PopularPoints.jsx';

export default function PopularInfo() {
  const popRoutes = useSelector((store) => store.popRoutes);
  const popPoints = useSelector((store) => store.popPoints);
  const savedPoints = useSelector((store) => store.savedPoints)
  const [savedStatus, setSavedStatus] = useState(false);
  
  const saveCheck = (popPoint) => {
    savedPoints.map((save) => {
      if (popPoint.id === save.poi_id) {
        return 'saved';
      } 
      return 'unsaved';
    })
    console.log('popPoints: ', popPoints)
  }

  return (
    <section id='features' >
      <h1 className='detailh3'>Dashboard →</h1>

      <section >
      <h2 className='detailh2'>{`Popular Routes →`}</h2>
      {popRoutes.map((route) => (
        
          <Link to={`/routeDetail/${route.route_id}`} key={`${route.route_id}`} >
            <li>{route.route_name}</li>
          </Link>
        
      ))}
      </section>
      <section>
      <h2 className='detailh2'>{`Popular Points of Interest →`}</h2>
      {popPoints?.map((popPoint) => {
        return (
          <PopularPoints popPoint={popPoint} key={popPoint.id} className={saveCheck(popPoint)} />
        )
      })}
      </section>
    </section>
  );
};