import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { IconButton } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import SaveIcon from './SaveIcon.jsx';

function HeartIcon({popPoint, savedStatus}) {
  return (
    <>
    {savedStatus 
      ? <FavoriteOutlinedIcon />
      : <FavoriteBorderOutlinedIcon />
      }
      </>
  )

}

export default function PopularPoints({popPoint}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const savedPoints = useSelector((store) => store.savedPoints)
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    // saveStatusCheck()

    savedPoints?.map((save) => {
      if (popPoint.id === save.poi_id) {
        setSavedStatus(true)
        console.log('Save check!')
        setDataLoaded(true)
      } 
      setDataLoaded(true)
  })
  console.log('saveStatusCheck', savedStatus)
  console.log('popPoint', popPoint)

  },[dataLoaded])

  const savePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: popPoint.id
    }
    console.log('ADD Point Clicked: ', pointClicked);
    dispatch({ type: 'ADD_POI_SAVE', payload: pointClicked })
    setSavedStatus(true);
    // history.push('/');
  }

  const unsavePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: popPoint.id
    }
    console.log('DELETE Point Clicked: ', pointClicked);
    dispatch({ type: 'DELETE_SAVED_POI', payload: pointClicked })
    setSavedStatus(false);
    // history.push('/');
  }

  const saveStatusCheck = () => {
    savedPoints?.map((save) => {
      if (popPoint.id === save.poi_id) {
        setSavedStatus(true)
        console.log('Save check!')
      } 
      setDataLoaded(true)
  })
  console.log('saveStatusCheck', savedStatus)
  console.log('popPoint', popPoint)
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
        
            <section 
            key={`${popPoint.id}`} 
            id={`${popPoint.name}`}
            longitude={`${popPoint.longitude}`}
            latitude={`${popPoint.latitude}`}
            style={dataLoaded ? {} : {display: 'none'}}
            >
            <IconButton aria-label="save" onClick={handleSaveClick}>

            {savedStatus 
            ? <FavoriteOutlinedIcon />
            : <FavoriteBorderOutlinedIcon />
            }
            </IconButton>
          <Link to={`/pointDetail/${popPoint.id}`}>
              {popPoint.name}
            </Link>
            

                  
                
            </section> 
        
  );
}