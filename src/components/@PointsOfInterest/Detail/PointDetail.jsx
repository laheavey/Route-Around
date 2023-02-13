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
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function PointDetail() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  // ↓ OBJECT: Completed_on; poi_id; poi_name; route_desc; route_id; route_name; route_url
  const points = useSelector((store) => store.points);
  // const user = useSelector((store) => store.user);

  console.log("Points.latitude + longitude: ", points.latitude, points.longitude)

  useEffect(() => {
    dispatch({ type: 'FETCH_POINT_DETAIL/:id', payload: id});
    dispatch({ type: 'FETCH_POINT_DETAIL/ROUTES/:id', payload: id});
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      center: {
        lng: lng, 
        lat: lat
      },
      zoom: 15,
      interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    const marker1 = new mapboxgl.Marker()
      .setLngLat({
        lng: lng, 
        lat: lat
      })
      .addTo(map)
  
  },[dataLoaded])
  
  const savePoint = () => {
    let newPointSave = {
      user_id: user.id,
      poi_id: id
    }

    dispatch({ type: 'ADD_POI_SAVE', payload: newPointSave })
  }

  useEffect(() => {
    if (mapContainer) {
      setLng(points.longitude);
      setLat(points.latitude);
      setDataLoaded(true)
    }
  }, [dataLoaded])

  return (
    <>
      <div className="map-wrapper" style={dataLoaded ? undefined : {display: 'none'}}>
        <div ref={mapContainer} className="map-container" style={{width: '100%', height: '300px'}}></div>
      </div>
      <List
        sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
        '& ul': { padding: 0 }
        }}
        key={`${points.id}`}
        subheader={<li />}>
        <ul>
          <ListSubheader>{`Point Detail → ${points.name}`}</ListSubheader>
            <ListItem >
              <ListItemAvatar>
                <Avatar 
                  variant="square" 
                  alt={`${points.name}`} 
                  src={`${points.image_url}`}
                  sx= {{ width: 120, height: 100 }}
                />
              </ListItemAvatar>
              <IconButton 
                aria-label="save"
                onClick={savePoint}
              >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
              <ListItemText primary={`${points.name}`} secondary={`${points.street_address}`} />
            </ListItem>
        </ul>
        <ul>
          <ListItem>
            <ListItemText secondary={`${points.description}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`${points.sources_cited}`} />
          </ListItem>
        </ul>
        
    </List>  
    </>
  );
}