import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import PopularPoints from './PopularPoints.jsx';

export default function PopularInfo() {

  const dispatch = useDispatch();
  const popRoutes = useSelector((store) => store.popRoutes);
  const popPoints = useSelector((store) => store.popPoints);
  const savedPoints = useSelector((store) => store.savedPoints);
  const user = useSelector((store) => store.user);

  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
console.log('popPoints: ', popPoints)  },[])

  const saveStatusCheck = (popPoint) => {


      console.log('saveStatusCheck', savedStatus)
      console.log('popPoint', popPoint)

    
  return savedStatus;
}
  
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
        '& ul': { padding: 0 }
      }}
      subheader={<li />}
      >
        <ul>
          <ListSubheader>{`Popular Routes →`}</ListSubheader>
          {popRoutes.map((route) => (
            <ListItem key={`${route.route_id}`}>
              <Link to={`/routeDetail/${route.route_id}`}>
              <ListItemText inset secondary={`${route.route_name}`} />
              </Link>
            </ListItem>
          ))}
        </ul>

        <ul>
          <ListSubheader>{`Popular Points of Interest →`}</ListSubheader>
          {popPoints?.map((popPoint) => {
            return (
              <PopularPoints popPoint={popPoint} key={popPoint.id} savedStatus={savedStatus}/>
            )
          }
          
           )}
        </ul>
    </List>
  );
}