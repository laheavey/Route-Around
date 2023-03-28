import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import '../Routes.css';
import RouteDetailMap from './RouteDetailMap';
import RouteDetailInfo from './RouteDetailInfo';

export default function RouteDetail() {
  document.title = 'RouteAround - Route Detail';
  const dispatch = useDispatch();
  const { id } = useParams();
  const lineCoordinates = useSelector((store) => store.line);
  const routeDetail = useSelector((store) => store.routes.routeDetailReducer);
  const routeBundle = {routeDetail, lineCoordinates}

  useEffect(() => {
      dispatch({ type: 'SAGA/FETCH_ROUTE_DETAIL', payload: id});
      dispatch({ type: 'FETCH_LINE/:id', payload: id});
  },[])

  return (
    <>
    <RouteDetailMap routeBundle={routeBundle} />
    <RouteDetailInfo />
    {/* <div className='grad'></div> */}
    </>
  );
}