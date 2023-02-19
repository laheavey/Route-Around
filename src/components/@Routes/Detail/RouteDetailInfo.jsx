import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RouteDetailInfo () {
  const routeDetail = useSelector((store) => store.routeDetail) 
  const [routeType, setRouteType] = useState('')
  const [routeAgency, setRouteAgency] = useState('')
  // const completedTrips = routeDetail.completed_trips;

  // console.log('routeType: ', routeType)
  // console.log('routeAgency: ', routeAgency)

  useEffect(() => {
    evalRouteType();
    evalAgency();
  },[routeType])

  const evalRouteType = () => {
    switch (routeDetail.route_type) {
      case '0':
        setRouteType('Light Rail');
        break;
      case '2':
        setRouteType('Commuter Rail');
        break;
      case '3':
        setRouteType('Bus');
        break;
    }
  }

  const evalAgency = () => {
    switch (routeDetail.agency_id) {
      case '0':
        setRouteAgency('Local');
        break;
      case '1':
        setRouteAgency('Regional');
        break;
      case '2':
        setRouteAgency('Regional');
        break;
      case '4':
        setRouteAgency('Maple Grove Transit');
        break;
      case '5':
        setRouteAgency('Plymouth');
        break;
      case '6':
        setRouteAgency('SouthWest');
        break;
      case '10':
        setRouteAgency('Airport');
        break;
      case '11':
        setRouteAgency('University of Minnesota');
        break;
      case '15':
        setRouteAgency('Northstar Link');
        break;
    }
  }
  
  return (
    <section className='flex-container dashboard' >
      <section className='route-detail-section'>
        <h2 className='route-detail-h2'>{`${routeDetail.route_name} `}</h2>
        { routeType && <h3 className='route-detail-h3'> // {routeAgency} {routeType}</h3>}
        
          

      </section>
      <section className='route-detail-section'>
      <h4 className='smallText'>Route Description</h4>
      <p className='route-desc'>{routeDetail.route_desc}</p>
      <a className='route-desc' href={`${routeDetail.route_url}`}>
      {'See schedule & cost information'}
      </a>
      </section>

      <section className='trip-start'>
        <h2 className='route-detail-h4'>{`Begin Trip:`}</h2>
          
            <Link to={`/activeRoute/${routeDetail.route_id}`}>
            {`Westbound`} 
            </Link>
          
          {` // `}
            <Link to={`/activeRoute/${routeDetail.route_id}`}>
            {`Eastbound`} 
            </Link>
          
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