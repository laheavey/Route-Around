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

export default function PopularPoints({popPoint, savedStatus}) {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const savedPoints = useSelector((store) => store.savedPoints)
  // const [savedStatus, setSavedStatus] = useState(false);

  // useEffect(() => {
  //   saveStatusCheck()
  // },[])

  const savePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: popPoint.id
    }
    console.log('ADD Point Clicked: ', pointClicked);
    dispatch({ type: 'ADD_POI_SAVE', payload: pointClicked })
    setSavedStatus(true);
    history.push('/');
  }

  const unsavePoint = () => {
    let pointClicked = {
      user_id: user.id,
      poi_id: popPoint.id
    }
    console.log('DELETE Point Clicked: ', pointClicked);
    dispatch({ type: 'DELETE_SAVED_POI', payload: pointClicked })
    setSavedStatus(false);
    history.push('/');
  }

  const saveStatusCheck = () => {
      savedPoints.map((save) => {
        if (popPoint.id === save.poi_id) {
          setSavedStatus(true)
        } 
    })
  }

  const handleSaveClick = () => {
    if (savedStatus){
      unsavePoint();
    } else {
      savePoint();
    }
  }

  // console.log('PopPoint: ', popPoint)
  // console.log('PopPoint.id: ', popPoint.id)
  // console.log('Savedpoints: ', savedPoints)
  console.log('savedStatus: ', savedStatus)
  // console.log('PP Key: ', key)
  return (
        <ul>
            <ListItem >
            <IconButton aria-label="save" onClick={handleSaveClick}>
            <HeartIcon />
            </IconButton>
            <Link to={`/pointDetail/${popPoint.id}`}>
              <ListItemText inset secondary={`${popPoint.name}`} />
            </Link>
            

                  
                
            </ListItem> 
        </ul>
  );
}