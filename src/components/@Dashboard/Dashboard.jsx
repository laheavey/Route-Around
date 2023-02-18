import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PopularInfo from './PopularInfo.jsx';
import NoLineMap from './NoLineMap.jsx';

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)

  useEffect(() => {
    dispatch({ type: 'FETCH_POPULAR_ROUTES' });
    dispatch({ type: 'FETCH_POPULAR_POINTS' });
    dispatch({ type: 'FETCH_SAVED_POIS', data: user.id})
  },[])

  return (
    <>
      <NoLineMap />
      <PopularInfo />
    </>
  )
};