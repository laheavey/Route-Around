import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PopularInfo() {
  const dispatch = useDispatch();
  const popRoutes = useSelector((store) => store.popRoutes)

  useEffect(() => {
      dispatch({ type: 'FETCH_POPULAR_ROUTES' });
      // dispatch({ type: 'FETCH_POPULAR_POINTS' });
  },[])

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
      {['Popular Routes ->', 'Popular Points of Interest ->' ].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`${sectionId}`}</ListSubheader>
            {popRoutes.map((route) => (
              <ListItem key={`item-${sectionId}-${route}`}>
                <ListItemText primary={`${route.route_long_name}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}