import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Divider from '@mui/material/Divider';

export default function UserActivity () {
  const userRouteHistory = useSelector((store) => store.userRouteHistory);
  const savedPoints = useSelector((store) => store.savedPoints)
  
  return (
    
      <section className='flex-container activity'>
      <section className='user-activity-section'>
      <h2 className='top-h2'>{`Badges Earned →`}</h2>
      <ul className='activity-list'>
        <li></li>
      </ul>
      </section>
      <Divider />

      <section className='user-activity-section'>
      <h2 className='top-h2'>{`Saved Points of Interest →`}</h2>
      <ul className='activity-list'>
      {savedPoints.map((save) => {
        return (
          <li key={save.id}>
            <Link to={`/pointDetail/${save.poi_id}`}>{save.name}</Link>
          </li>
        )
      })}
      </ul>
      </section>
      <Divider />

      <section className='user-activity-section'>
      <h2 className='top-h2'>{`Ride History →`}</h2>
      <ul className='activity-list'>
      {userRouteHistory.map((ride) => {
        return (
          <li key={ride.route_id} >
            <Link to={`/routeDetail/${ride.route_id}`}>
            {ride.route_name}
            </Link>
            
            </li>
        )
      })}
      </ul>
      </section>
      </section>
    
  )
}