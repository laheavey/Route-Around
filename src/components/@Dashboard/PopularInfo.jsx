import React, { useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { IconButton } from '@mui/material';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import PopularPoints from './PopularPoints.jsx';
import LogOutButton from '../LogOutButton/LogOutButton';

export default function PopularInfo() {
  const user = useSelector((store) => store.user);
  const popRoutes = useSelector((store) => store.popRoutes);
  const popPoints = useSelector((store) => store.popPoints);
  
  return (
    <section id='features' >
            <LogOutButton />
            <button><Link to={`profile/${user.id}}`}>Profile</Link></button>
            <button><Link to={`allPoints`}>All Points</Link></button>
      <h3>{`Popular Routes →`}</h3>
      {popRoutes.map((route) => (
        <section>
          {/* <IconButton>
          <FavoriteBorderOutlinedIcon />
          </IconButton> */}
          <Link to={`/routeDetail/${route.route_id}`} key={`${route.route_id}`}>
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
    </section>
  );
}