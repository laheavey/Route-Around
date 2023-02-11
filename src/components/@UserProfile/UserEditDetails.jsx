import React from "react";
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import UserRouteHistory from "./UserRouteHistory";
import UserSavedPoints from './UserSavedPoints';

export default function UserEditDetails () {
  const user = useSelector((store) => store.user)
  // console.log('User: ', user)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{ marginLeft: 2, marginTop: 2, marginBottom: 1}} variant="body2">{`Update Email Address →`}</Typography>
      <CardContent >
        <TextField
          disabled
          label="Current Email Address"
          id="outlined-size-small"
          defaultValue={user.email}
          size="small"
          fullWidth
          sx={{ marginBottom: 1.5}}
        />
         <TextField
          label="New Email Address"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          fullWidth
          sx={{ marginBottom: 1.5}}
        />
        <TextField
          label="Confirm New Email Address"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          fullWidth
          sx={{ marginBottom: 1.5}}
        />

        <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{mb:1.5}}>
          <Button variant="text" size="small">Text</Button>
          <Button variant="contained" size="small">Contained</Button>
        </Stack>
        <Divider />

        <ListSubheader>{`Update Profile Image →`}</ListSubheader>

        <Divider />

      </CardContent>
    </Box>
  )
}