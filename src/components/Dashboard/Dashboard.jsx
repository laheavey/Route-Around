import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './Dashboard.css';
import DashboardMap from './DashboardMap.jsx';
import DashboardPointInfo from './DashboardPointInfo.jsx';

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  const popRoutes = useSelector((store) => store.routes.popularRoutesReducer);
  const savedPoints = useSelector((store) => store.savedPoints)

  useEffect(() => {
    dispatch({ type: 'FETCH_POPULAR_ROUTES' });
    dispatch({ type: 'FETCH_SAVED_POIS', data: user.id})
  },[])

  return (
    <>
      <DashboardMap />
      <section className='flex-container dashboard' >
        <section className='db-section'>
          <h2 className='top-h2'>{`Popular Routes →`}</h2>
          <ul className='db-list'>
          {popRoutes.map((route) => {
            return (
              <Link to={`/routeDetail/${route.route_id}`} key={`${route.route_id}`} >
                <li>{route.route_name}</li>
              </Link>
            )
          })}
          </ul>
        </section>
        
        <section className='db-section'>
          <h2 className='top-h2'>{`Saved Points of Interest →`}</h2>
          <ul className='db-list list-icon'>
          {savedPoints?.map((save) => {
            return (
            <DashboardPointInfo save={save} key={save.poi_id} />
            )
          })}
          </ul>
        </section>
      </section>
      <div className='grad'></div>
    </>
  )
};