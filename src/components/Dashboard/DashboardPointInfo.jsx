import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IconButton } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function DashboardPointInfo({save}) {
  const dispatch = useDispatch();
  const [savedStatus, setSavedStatus] = useState(true);
  const user = useSelector((store) => store.user);

  const savePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: save.poi_id
    }
    // console.log('ADD Point Clicked: ', pointClicked);
    dispatch({ type: 'SAGA/ADD_POI_SAVE', payload: pointClicked })
    setSavedStatus(true);
  }

  const unsavePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: save.poi_id
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

  return (
    <section key={`${save.poi_id}`} className='db-list-item'>
      <IconButton aria-label="save" onClick={handleSaveClick} sx={{ padding: 1 }}>
        {savedStatus 
        ? <FavoriteOutlinedIcon fontSize='small'/>
        : <FavoriteBorderOutlinedIcon fontSize='small'/>
        }
      </IconButton>
      <Link to={`/pointDetail/${save.poi_id}`}>
        <li>{save.name}</li>
      </Link>                
    </section> 
  );
}