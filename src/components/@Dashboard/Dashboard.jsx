import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import DashboardMap from './DashboardMap.jsx';
import DashboardPointInfo from './DashboardPointInfo.jsx';

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  const popRoutes = useSelector((store) => store.popRoutes);
  const savedPoints = useSelector((store) => store.savedPoints)

  useEffect(() => {
    dispatch({ type: 'FETCH_POPULAR_ROUTES' });
    dispatch({ type: 'FETCH_SAVED_POIS', data: user.id})
  },[])

  return (
    <>
      <DashboardMap />

      <section className='flex-container dashboard' >
      <section className='dash-pop'>
        <h2 className='top-h2'>{`Popular Routes →`}</h2>
        <ul className='dash-pop-list'>
        {popRoutes.map((route) => (
          <Link to={`/routeDetail/${route.route_id}`} key={`${route.route_id}`} >
            <li>{route.route_name}</li>
          </Link>
        ))}
        </ul>
      </section>
      <section className='dash-pop'>
        <h2 className='top-h2'>{`Saved Points of Interest →`}</h2>
        <ul className='dash-pop-list list-icon'>
        {savedPoints?.map((save) => {
          return (
          <DashboardPointInfo save={save} key={save.poi_id} />
          )
        })}
        </ul>
      </section>
    </section>
    </>
  )
};