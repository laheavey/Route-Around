import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';

import './Points.css';

import { IconButton } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function PointDetail() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const [mapContent, setMapContent] = useState();
  const { id } = useParams();
  const mapContainer = useRef(null);
  const points = useSelector((store) => store.points.pointDetailReducer);
  const pointSources = useSelector((store) => store.points.pointDetailSourcesReducer);
  const user = useSelector((store) => store.user);

  const savedPoints = useSelector((store) => store.points.savedPointsReducer)
  const [saveLoaded, setSaveLoaded] = useState(false)
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SAGA/FETCH_POINT_DETAIL', payload: id});
    dispatch({ type: 'SAGA/FETCH_POINT_DETAIL_SOURCES', payload: id});
    dispatch({ type: 'SAGA/FETCH_SAVED_POIS', data: user.id})
  }, [])

  useEffect(() => {
    if (points) {
      setDataLoaded(true)
    }

    if (savedPoints){
      setSaveLoaded(true)
      savedPoints.map((save) => {
        if (points.id === save.poi_id) {
          setSavedStatus(true)
        } 
      })
    }
  }, [points, savedPoints, pointSources]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      center: [-93.09, 44.946944],
      zoom: 13,
      // interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    map.on('load', () => {
      setMapContent(map);

      const marker1 = new mapboxgl.Marker()
      .setLngLat([points.longitude, points.latitude])
      .addTo(map);

      if (points) {
        map.setCenter([points.longitude, points.latitude])
      }
      return () => map.remove();
    });
  },[points, pointSources])

  const savePoint = () => {
    let newPointSave = {
      user_id: user.id,
      poi_id: id
    }
    // console.log('ADD Point Clicked: ', newPointSave);
    dispatch({ type: 'SAGA/ADD_POI_SAVE', payload: newPointSave })
    setSavedStatus(true);
  }

  const unsavePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: id
    }
    // console.log('DELETE Point Clicked: ', pointClicked);
    dispatch({ type: 'SAGA/DELETE_SAVED_POI', payload: pointClicked })
    setSavedStatus(false);
  }

  const handleSaveClick = () => {
    if (savedStatus){
      unsavePoint();
      // console.log('Unsaved!')
    } else {
      savePoint();
      // console.log('Saved!')
    }
  }

  if(!points && !pointSources) {
    return null;
  } else {

  return (
    <>
      <div id='map' ref={mapContainer} style={{width: '100%', height: '38%'}}></div>
      <section id="features" >
        <img alt={`${points.name}`} src={`${points.image_url}`} className='box pd-img'/>
        <section className='pd-header'>
          <IconButton 
            aria-label="save" 
            onClick={handleSaveClick}
            sx={{ padding: 0 }}
          >
            {savedStatus 
            ? <FavoriteOutlinedIcon />
            : <FavoriteBorderOutlinedIcon />
            }
          </IconButton>
          <h2 className='pd-h2'>{`${points.name}`}</h2>
        </section> 
        <p className='pd-h3'>{points.street_address}</p>
        <section>
          <p className='pd-description'>{points.description}</p>
        </section>
        <section className='sources-section'>
          <h2 className='pd-h2'>Sources:</h2>
          <ul>
            {pointSources.map((source) => {
              return (
                <a href={`${source.url}`} key={source.id}>
                <li>
                  {source.name}
                </li>
                </a>
              )
            })}
          </ul>
        </section>
      </section>
      <div className='grad'></div>
    </>
  );
}}