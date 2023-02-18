import React, { useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PopularPoints from './PopularPoints.jsx';

export default function PopularInfo() {
  const popRoutes = useSelector((store) => store.popRoutes);
  const popPoints = useSelector((store) => store.popPoints);
  
  return (
    <section id='features' >
      <h1>Dashboard</h1>
      <h2>{`Popular Routes →`}</h2>
      {popRoutes.map((route) => (
        <section key={`${route.route_id}`}>
          <Link to={`/routeDetail/${route.route_id}`} >
            <li>{route.route_name}</li>
          </Link>
        </section>
      ))}
      <h2>{`Popular Points of Interest →`}</h2>
      {popPoints?.map((popPoint) => {
        return (
          <PopularPoints popPoint={popPoint} key={popPoint.id} />
        )
      })}
    </section>
  );
};