import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PopularInfo() {
  const dispatch = useDispatch();
  const popRoutes = useSelector((store) => store.popRoutes);
  const popPoints = useSelector((store) => store.popPoints);

  useEffect(() => {
      dispatch({ type: 'FETCH_POPULAR_ROUTES' });
      dispatch({ type: 'FETCH_POPULAR_POINTS' });
  },[])

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
            <ListItem key={`${route.id}`}>
              <ListItemText inset secondary={`${route.route_name}`} />
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