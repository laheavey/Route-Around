import React from "react";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function UserRouteHistory ({save}) {
  console.log('Save: ', save)
  return (
    <ListItem>
      <ListItemText inset secondary={`${save.name}`} />
    </ListItem>
  )

}