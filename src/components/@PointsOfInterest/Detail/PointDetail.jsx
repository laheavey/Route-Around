import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from '!mapbox-gl';
import { useParams } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function PointDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-93.0918);
  const [lat, setLat] = useState(44.9481);
  const [zoom, setZoom] = useState(14);

  // ↓ ARRAY: route_name, route_desc by poi id
  const routeDetail = useSelector((store) => store.routeDetail);
  // ↓ OBJECT: Completed_on; poi_id; poi_name; route_desc; route_id; route_name; route_url
  const pointDetail = useSelector((store) => store.pointDetail);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_POINT_DETAIL/:id', payload: id});
    dispatch({ type: 'FETCH_POINT_DETAIL/ROUTES/:id', payload: id});

    var map = new mapboxgl.Map({
      container: 'map',
      center: [-93.19426931505215, 44.9480407119586],
      zoom: 10,
      interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  
    map.addControl(new mapboxgl.FullscreenControl());
  },[])
  
  return (
    <>
      <div id='map' style={{width: '100%', height: '300px'}}></div>
      <List
        sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
        '& ul': { padding: 0 }
      }}
      key={`${pointDetail.id}`}
      subheader={<li />}>
        <ul>
          <ListSubheader>{`Point Detail →`}</ListSubheader>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={`${pointDetail.name}`} src={`${pointDetail.image_url}`} />
              </ListItemAvatar>
              <ListItemText primary={`${pointDetail.name}`} />
            </ListItem>
            <ListItem>
            {routeDetail.map((route) => {
                return (
                  <ListItemText secondary={`${route.route_name}`}/>
                )
                })}
            </ListItem>
        </ul>
        <ul>
          <ListItem>
            <ListItemText secondary={`${pointDetail.description}`} />
          </ListItem>
          <ListItem key={`${pointDetail.id}`}>
            <ListItemText primary={`${pointDetail.sources_cited}`} />
          </ListItem>
        </ul>
        
    </List>  
    </>
  );
}