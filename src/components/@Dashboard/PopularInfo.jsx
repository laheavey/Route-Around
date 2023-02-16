import React, { useEffect, useState, useRef} from 'react';
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
  const ref = useRef();
  const dispatch = useDispatch();
  const popRoutes = useSelector((store) => store.popRoutes);
  const popPoints = useSelector((store) => store.popPoints);
  const savedPoints = useSelector((store) => store.savedPoints);
  const user = useSelector((store) => store.user);
  const [savedStatus, setSavedStatus] = useState(false);

  // useEffect(() => {
  //   console.log('popPoints: ', popPoints)  
  //   console.log('Saved Points: ', savedPoints)
  // },[])
  
  return (
    <div id='features' ref={ref}>
      <h3>{`Popular Routes →`}</h3>
      {popRoutes.map((route) => (
        <section key={`${route.route_id}`}>
          <Link to={`/routeDetail/${route.route_id}`}>
          {route.route_name}
          </Link>
        </section>
      ))}

      <h3>{`Popular Points of Interest →`}</h3>
      {popPoints?.map((popPoint) => {
        return (
          <PopularPoints popPoint={popPoint} key={popPoint.id} />
        )
      }
        )}
    </div>
  );
}