import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RouteDetailInfo () {
  const [dataLoaded, setDataLoaded] = useState(false);
  const routeDetail = useSelector((store) => store.routes.routeDetailReducer) 
  const [routeType, setRouteType] = useState('')
  const [routeAgency, setRouteAgency] = useState('')
  // const completedTrips = routeDetail.completed_trips;

  // useEffect(() => {
  //   evalRouteType();
  //   evalAgency();
  // },[dataLoaded])

  // const evalRouteType = () => {
  //   switch (routeDetail.route_type) {
  //     case '0':
  //       setRouteType('Light Rail');
  //       break;
  //     case '2':
  //       setRouteType('Commuter Rail');
  //       break;
  //     case '3':
  //       setRouteType('Bus');
  //       break;
  //   }
  // }

  // const evalAgency = () => {
  //   switch (routeDetail.agency_id) {
  //     case '0':
  //       setRouteAgency('Local');
  //       break;
  //     case '1':
  //       setRouteAgency('Regional');
  //       break;
  //     case '2':
  //       setRouteAgency('Regional');
  //       break;
  //     case '4':
  //       setRouteAgency('Maple Grove Transit');
  //       break;
  //     case '5':
  //       setRouteAgency('Plymouth');
  //       break;
  //     case '6':
  //       setRouteAgency('SouthWest');
  //       break;
  //     case '10':
  //       setRouteAgency('Airport');
  //       break;
  //     case '11':
  //       setRouteAgency('University of Minnesota');
  //       break;
  //     case '15':
  //       setRouteAgency('Northstar Link');
  //       break;
  //   }
  //   setDataLoaded(true);
  // }
  
  return (
    <section className='flex-container route-detail'>
      <section className='rd-section'>
        <h2 className='rd-h2'>{`${routeDetail.route_name} `}</h2>

          <h3 className='rd-h3'> // {routeDetail.agency_name} {routeDetail.route_type_name}</h3>
      </section>

      <section className='rd-section'>
        <h4 className='smallText'>Route Description</h4>
        <p className='rd-description'>{routeDetail.route_desc}</p>
        <a className='rd-description' href={`${routeDetail.route_url}`}>
          {'See schedule & cost information'}
        </a>
      </section>

      <section className='rd-trip-start'>
        <h2 className='rd-h4'>{`Begin Trip:`}</h2>
        <Link to={`/activeRoute/${routeDetail.route_id}`}>{`Westbound`}</Link>
        {` // `}
        <Link to={`/activeRoute/${routeDetail.route_id}`}>{`Eastbound`}</Link>
      </section>
      
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