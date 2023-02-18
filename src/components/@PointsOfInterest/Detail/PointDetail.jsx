import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from '!mapbox-gl';
import { useParams } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function PointDetail() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const [mapContent, setMapContent] = useState();
  const { id } = useParams();
  const mapContainer = useRef(null);
  const points = useSelector((store) => store.points);
  const user = useSelector((store) => store.user);

  const savedPoints = useSelector((store) => store.savedPoints)
  const [saveLoaded, setSaveLoaded] = useState(false)
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_POINT_DETAIL/:id', payload: id});
    dispatch({ type: 'FETCH_SAVED_POIS', data: user.id})
  }, [])

  useEffect(() => {
    savedPoints.map((save) => {
      if (points.id === save.poi_id) {
        setSavedStatus(true)
        console.log('Save check!')
        setSaveLoaded(true)
      } 
      setSaveLoaded(true)
    })

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      center: [-93.09, 44.946944],
      zoom: 12,
      // interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    map.on('load', () => {
      setMapContent(map);
      setDataLoaded(true)

      const marker1 = new mapboxgl.Marker()
      .setLngLat([points.longitude, points.latitude])
      .addTo(map);

      if (points) {
        map.setCenter([points.longitude, points.latitude])
      }
      return () => map.remove();
    });

  },[dataLoaded, saveLoaded])

  const savePoint = () => {
    let newPointSave = {
      user_id: user.id,
      poi_id: id
    }
    console.log('ADD Point Clicked: ', newPointSave);
    dispatch({ type: 'ADD_POI_SAVE', payload: newPointSave })
    setSavedStatus(true);
  }

  const unsavePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: id
    }
    console.log('DELETE Point Clicked: ', pointClicked);
    dispatch({ type: 'DELETE_SAVED_POI', payload: pointClicked })
    setSavedStatus(false);
  }

  const handleSaveClick = () => {
    if (savedStatus){
      unsavePoint();
      console.log('Unsaved!')
    } else {
      savePoint();
      console.log('Saved!')
    }
  }

  return (
    <>
      <div 
        id='map'
        ref={mapContainer} 
        className="map-container" 
        style={dataLoaded ? {width: '100%', height: '300px'} : {display: 'none'}} 
      >
      </div>
      <section id="features">
          <h3>{`Point Detail → ${points.name}`}</h3>
            
                {/* <Avatar 
                  variant="square" 
                  // alt={`${points.name}`} 
                  src={`${points.image_url}`}
                  sx= {{ width: 100, height: 100 }}
                /> */}
              
              {/* <IconButton 
                aria-label="save" 
                onClick={handleSaveClick}
                style={saveLoaded ? {} : {display: 'none'}}
              >
                {savedStatus 
                ? <FavoriteOutlinedIcon />
                : <FavoriteBorderOutlinedIcon />
                }
                </IconButton> */}
              {/* <ListItemText primary={`${points.name}`} secondary={`${points.street_address}`} /> */}

        
        
          <li>{points.name}</li>
         <li>{points.description}</li>
        
        
     
    </section>
    </>
  );
}