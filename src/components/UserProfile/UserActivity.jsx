import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserActivity () {
  const userRouteHistory = useSelector((store) => store.userRouteHistory);
  const savedPoints = useSelector((store) => store.savedPoints)
  
  return (
    <section className='flex-container user-activity'>

      <section className='ua-section badges-earned'>
        <h2 className='top-h2'>{`Badges Earned →`}</h2>
        <ul className='ua-list'>
        </ul>
      </section>

      <section className='ua-section saved-points'>
        <h2 className='top-h2'>{`Saved Points of Interest →`}</h2>
        <ul className='ua-list'>
          {savedPoints.map((save) => {
          return (
            <li key={`save-${save.id}`}>
              <Link to={`/pointDetail/${save.poi_id}`}>
                {save.name}
              </Link>
            </li>
          )
          })}
        </ul>
      </section>

      <section className='ua-section ride-history'>
        <h2 className='top-h2'>{`Ride History →`}</h2>
        <ul className='ua-list'>
          {userRouteHistory.map((ride) => {
          return (
            <li key={`route-${ride.route_id}`} >
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