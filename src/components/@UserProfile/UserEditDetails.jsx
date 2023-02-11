import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

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
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { pink } from '@mui/material/colors';

import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';

import UserRouteHistory from "./UserRouteHistory";
import UserSavedPoints from './UserSavedPoints';

export default function UserEditDetails () {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((store) => store.user)
  const userEdit = useSelector((store) => store.userEdit)
  const [imgValue, setImgValue] = useState('')
  const [emailValue, setEmailValue] = useState('');
  const [secondEmailValue, setSecondEmailValue] = useState('')
  
  console.log('User: ', user)
  console.log('userEdit: ', userEdit)

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_TO_EDIT',
      payload: params.id
    })
  },[])

  const handleEmailChange = (event) => {
      dispatch({
        type: 'SET_NEW_EMAIL',
        payload: event.target.value
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userEdit && userEdit.email === secondEmailValue){
      let newUserEdit = {
        id: user.id,
        email: userEdit.email,
        profile_img: imgValue
      }
      dispatch({ type: 'UPDATE_USER', payload: newUserEdit })
    } else {
      let newUserEdit = {
        id: user.id,
        email: user.email,
        profile_img: imgValue
      }
      dispatch({ type: 'UPDATE_USER', payload: newUserEdit })
    }
  }

  const handleImgChange = (event) => {
    event.preventDefault();
    setImgValue(event.target.value);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <FormControl>
      <FormGroup>
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
            type='text'
            value={userEdit.email || ''}
            size="small"
            fullWidth
            sx={{ marginBottom: 1.5}}
            onChange={handleEmailChange}
          />
          <TextField
            label="Confirm New Email Address"
            id="outlined-size-small"
            value={secondEmailValue}
            size="small"
            fullWidth
            sx={{ marginBottom: 0}}
            onChange={() => setSecondEmailValue(event.target.value)}
          />
          {/* <Stack spacing={2} direction="row" justifyContent="flex-end" >
            <Button variant="text" size="small">Cancel</Button>
            <Button variant="contained" size="small">Submit</Button>
          </Stack> */}
        </CardContent>
      </FormGroup>
      <Divider />
      <FormGroup>
        <Typography sx={{ marginLeft: 2, marginTop: 2, marginBottom: 1}} variant="body2">{`Update Profile Image →`}</Typography>
        <CardContent>
          <RadioGroup
            row
            value={imgValue}
            name="row-radio-buttons-group"
            sx={{alignItems:"center", justifyContent: "space-around"}}
            onChange={() => setImgValue(event.target.value)}
          >
            <FormControlLabel 
              value="1" 
              control={<Radio size="small"/>} 
              label={<FaceIcon fontSize="large" color="warning"/>}
              labelPlacement="top"
            />
            <FormControlLabel 
              value="2" 
              control={<Radio size="small"/>} 
              label={<Face2Icon fontSize="large" color="primary"/>}
              labelPlacement="top"
            />
            <FormControlLabel 
              value="3" 
              control={<Radio size="small"/>} 
              label={<Face3Icon fontSize="large" color="secondary"/>}
              labelPlacement="top"
            />
          </RadioGroup>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            sx={{alignItems:"center", justifyContent: "space-around"}}
          >
            <FormControlLabel 
              value="4" 
              control={<Radio size="small"/>} 
              label={<Face4Icon fontSize="large" color="success"/>}
              labelPlacement="top"
            />
            <FormControlLabel 
              value="5" 
              control={<Radio size="small"/>} 
              label={<Face5Icon fontSize="large"color="action"/>}
              labelPlacement="top"
            />
            <FormControlLabel 
              value="6" 
              control={<Radio size="small"/>} 
              label={<Face6Icon fontSize="large" sx={{ color: pink[500] }} />}
              labelPlacement="top"
            />
          </RadioGroup>
        </CardContent>
        <Divider />
        <Box sx={{m:1.5}}>
          <Stack spacing={2} direction="row" justifyContent="flex-end" >
            <Button variant="text" size="small" >Cancel</Button>
            <Button variant="contained" size="small" onClick={handleSubmit}>Submit</Button>
          </Stack>
          </Box>
      </FormGroup>
      </FormControl>
    </Box>
  )
}