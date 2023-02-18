import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RouteMap from './RouteMap';
import RouteInfo from './RouteInfo';

export default function RouteDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
      dispatch({ type: 'FETCH_ROUTE_DETAIL/:id', payload: id});
  },[])

  return (
    <>
    <RouteMap  />
    <RouteInfo />
    </>
  );
}