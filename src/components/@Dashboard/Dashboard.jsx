import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton.jsx';
import PopularInfo from './PopularInfo.jsx';
import NoLineMap from './NoLineMap.jsx';
import './Dashboard.css';


function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)

  useEffect(() => {
    dispatch({ type: 'FETCH_POPULAR_ROUTES' });
    dispatch({ type: 'FETCH_POPULAR_POINTS' });
    dispatch({ type: 'FETCH_SAVED_POIS', data: user.id})
  },[])

  // Div where map renders, PopularInfo component lists routes & 
  // points of interest
  return (
    <>
      <NoLineMap />
      <PopularInfo />
      <LogOutButton />
    </>
  )
}

export default Dashboard;