import React from "react";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function UserRouteHistory ({ride}) {
  return (
    <ListItem>
      <ListItemText inset secondary={`${ride.route_name}`} />
    </ListItem>
  )

}