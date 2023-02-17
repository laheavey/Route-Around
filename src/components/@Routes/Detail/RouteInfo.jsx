import React from 'react';
import { useSelector } from 'react-redux';

export default function RouteInfo () {
  const routeDetail = useSelector((store) => store.routeDetail) 
  const completedTrips = routeDetail.completed_trips;

  console.log('Route detail: ', routeDetail)
  
  return (
    <section id='features' >
      
        <h3>{`Route Detail →`}</h3>
          <section >
            <h6>{routeDetail.route_name}</h6>
            {routeDetail.route_desc}
          </section>
      
        {/* <ListItem >
          <Link to={`${routeDetail.route_url}`}>
          <ListItemText secondary={'Learn more at MetroTransit.org'} />
          </Link>

        </ListItem>
        <ListItem>
          <ListItemText secondary={`Begin Trip:`}/>
        </ListItem>
        <ListItem>
          <Link to={`/activeRoute/${routeDetail.route_id}`}>
          <ListItemText inset secondary={`Eastbound /`}/>
          </Link>
          <Link to={`/activeRoute/${routeDetail.route_id}`}>
          <ListItemText secondary={`/ Westbound`} />
          </Link>
        </ListItem> */}
      
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