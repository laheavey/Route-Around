import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PopularInfo() {
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
            {[0, 1, 2,3,4].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}