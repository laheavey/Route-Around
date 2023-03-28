import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import '../Routes.css';
import RouteDetailMap from './RouteDetailMap';
import RouteDetailInfo from './RouteDetailInfo';

export default function RouteDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
      dispatch({ type: 'SAGA/FETCH_ROUTE_DETAIL', payload: id});
      dispatch({ type: 'FETCH_LINE/:id', payload: id});
  },[])

  return (
    <>
    <RouteDetailMap  />
    <RouteDetailInfo />
    {/* <div className='grad'></div> */}
    </>
  );
}