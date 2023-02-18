import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RouteInfo () {
  const routeDetail = useSelector((store) => store.routeDetail) 
  const completedTrips = routeDetail.completed_trips;

  console.log('Route detail: ', routeDetail)
  
  return (
    <section id='features' >
      
        <h3>{`Route Detail →`}</h3>
          
            <h4>{routeDetail.route_name}</h4>
            {routeDetail.route_desc}
          
      
        
          <Link to={`${routeDetail.route_url}`}>
          {'Learn more at MetroTransit.org'}
          </Link>

        
          {`Begin Trip:`}
        
          <Link to={`/activeRoute/${routeDetail.route_id}`}>
          {`Eastbound /`}
          </Link>
          <Link to={`/activeRoute/${routeDetail.route_id}`}>
          {`/ Westbound`}
          </Link>
        
      
      {/* Removing POI list for now, too long. */}
      {/* <ul>
      <ListSubheader disableSticky>{`Points of Interest →`}</ListSubheader>
        <ListItem >
        <Link to={`/pointDetail/${routeDetail.poi_id}`}>
          <ListItemText inset secondary={`${routeDetail.poi_name}`} />
          </Link>
        </ListItem>
      </ul> */}
      {/* {completedTrips && 
      <ul>
      <ListSubheader disableSticky>{`Ride History →`}</ListSubheader>
        {completedTrips.map((trip) => {
          return (
            <ListItem key={`1-${trip}-${routeDetail.route_id}`}>
              <ListItemText inset secondary={`${trip}`} />
            </ListItem>
          )
        })}
      </ul>
      } */}
    </section>
  )
}