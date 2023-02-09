import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { ListItemButton } from '@mui/material';




export default function PopularInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const popRoutes = useSelector((store) => store.popRoutes);
  const popPoints = useSelector((store) => store.popPoints);

  useEffect(() => {
      dispatch({ type: 'FETCH_POPULAR_ROUTES' });
      dispatch({ type: 'FETCH_POPULAR_POINTS' });
  },[])

  const sendToDetail = () => {
    history.push(`/routeDetail/${this.route_id}`)
  }

  // List of popular routes and points of interest
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
        '& ul': { padding: 0 }
      }}
      subheader={<li />}
      >
        <ul>
          <ListSubheader>{`Popular Routes →`}</ListSubheader>
          {popRoutes.map((route) => (
            <ListItem key={`${route.route_id}`}>
              <Link to={`/routeDetail/${route.route_id}`}>
              <ListItemText inset secondary={`${route.route_name}`} />
              </Link>
            </ListItem>
          ))}
        </ul>
        <ul>
          <ListSubheader>{`Popular Points of Interest →`}</ListSubheader>
          {popPoints.map((point) => (
            <ListItem key={`${point.id}`}>

              <ListItemText inset secondary={`${point.name}`} />
            </ListItem>
          ))}
        </ul>
    </List>
  );
}