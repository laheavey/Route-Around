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
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dense, setDense] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-93.19426931505215);
  const [lat, setLat] = useState(44.9480407119586);
  const [zoom, setZoom] = useState(5);

  // ↓ ARRAY: route_name, route_desc by poi id
  const routeDetail = useSelector((store) => store.routeDetail);
  // ↓ OBJECT: Completed_on; poi_id; poi_name; route_desc; route_id; route_name; route_url
  const points = useSelector((store) => store.points);
  const user = useSelector((store) => store.user);

  44.94830546284459, -93.08674043028068
  useEffect(() => {
    dispatch({ type: 'FETCH_POINT_DETAIL/:id', payload: id});
    dispatch({ type: 'FETCH_POINT_DETAIL/ROUTES/:id', payload: id});

    var map = new mapboxgl.Map({
      container: 'map',
      center: [-93.08674043028068, 44.94830546284459],
      zoom: 15,
      interactive: false,
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  
    map.addControl(new mapboxgl.FullscreenControl());
  },[])
  
  const savePoint = () => {
    let newPointSave = {
      user_id: user.id,
      poi_id: id
    }

    dispatch({ type: 'ADD_POI_SAVE', payload: newPointSave })
  }

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
        key={`${points.id}`}
        dense={dense}
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
              <ListItemText primary={`${points.name}`} />
            </ListItem>
            {/* <ListItem>
            {routeDetail.map((route) => {
                return (
                  <ListItemText secondary={`${route.route_name}`}/>
                )
                })}
            </ListItem> */}
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