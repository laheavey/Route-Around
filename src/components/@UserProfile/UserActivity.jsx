import React from "react";
import { useSelector } from 'react-redux';

import Divider from '@mui/material/Divider';

export default function UserActivity () {
  const userRouteHistory = useSelector((store) => store.userRouteHistory);
  const savedPoints = useSelector((store) => store.savedPoints)
  
  return (
    <section id='feature'>
      <h2>{`Badges Earned →`}</h2>
      <Divider />

      <h2>{`Saved Points of Interest →`}</h2>
      {savedPoints.map((save) => {
        return (
          <p key={save.id}>{save.name}</p>
        )
      })}
      <Divider />

      <h2>{`Ride History →`}</h2>
      {userRouteHistory.map((ride) => {
        return (
          <p key={ride.route_id}>{ride.route_name}</p>
        )
      })}
    </section>
  )
}