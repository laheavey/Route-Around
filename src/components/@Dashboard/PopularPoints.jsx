import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IconButton } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function PopularPoints({popPoint}) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const savedPoints = useSelector((store) => store.savedPoints)
  const [savedStatus, setSavedStatus] = useState(false);
  const [saveLoaded, setSaveLoaded] = useState(false)

  // Most of this is commented out as the save toggle 
  useEffect(() => {
    savedPoints.map((save) => {
      if (popPoint.id === save.poi_id) {
        setSavedStatus(true)
        console.log('Save check!')
        setSaveLoaded(true)
      } 
      setSaveLoaded(true)
      })
  console.log('saveStatusCheck', savedStatus)
  console.log('popPoint', popPoint)
  },[saveLoaded])

  const savePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: popPoint.id
    }
    // console.log('ADD Point Clicked: ', pointClicked);
    dispatch({ type: 'ADD_POI_SAVE', payload: pointClicked })
    setSavedStatus(true);
  }

  const unsavePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: popPoint.id
    }
    // console.log('DELETE Point Clicked: ', pointClicked);
    dispatch({ type: 'DELETE_SAVED_POI', payload: pointClicked })
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

  return (
    <section 
      key={`${popPoint.id}`} 
      id={`${popPoint.name}`}
      className='activeRoute'
      longitude={`${popPoint.longitude}`}
      latitude={`${popPoint.latitude}`}
    >
      <IconButton 
        aria-label="save" 
        onClick={handleSaveClick}
        style={saveLoaded ? {} : {display: 'none'}}
        sx={{ padding: 0 }}
      >
        {savedStatus 
        ? <FavoriteOutlinedIcon />
        : <FavoriteBorderOutlinedIcon />
        }
      </IconButton>
      <Link to={`/pointDetail/${popPoint.id}`}>
        <li>{popPoint.name}</li>
      </Link>                
    </section> 
  );
}