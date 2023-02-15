import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from "react-router-dom";

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { pink } from '@mui/material/colors';
import Alert from '@mui/material/Alert';

import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';

export default function UserEditDetails () {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector((store) => store.user)
  const userEdit = useSelector((store) => store.userEdit)
  const [secondEmailValue, setSecondEmailValue] = useState('')
  const [error, setError] = useState(false);
  
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

  const handleImgChange = (event) => {
    dispatch({
      type: 'SET_NEW_IMG',
      payload: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (secondEmailValue && userEdit.email === secondEmailValue){
      let newUserEdit = {
        id: user.id,
        email: userEdit.email,
        profile_img: userEdit.profile_img
      }
      dispatch({ type: 'UPDATE_USER', payload: newUserEdit })
      history.push(`/profile/${user.id}`)
    } else if (secondEmailValue && userEdit.email !== secondEmailValue){
      setError(true);
    } else {
      
      let newUserEdit = {
        id: user.id,
        email: user.email,
        profile_img: userEdit.profile_img
      }
      
      dispatch({ type: 'UPDATE_USER', payload: newUserEdit })
      history.push(`/profile/${user.id}`)
    }

 
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <FormControl>
      <FormGroup>
        <Typography sx={{ marginLeft: 2, marginTop: 2, marginBottom: 1}} variant="body2">{`Update Email Address →`}</Typography>
        <CardContent >
          { error && <Alert severity="error">New email address inputs must match.</Alert>}  
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
        </CardContent>
      </FormGroup>
      <Divider />
      <FormGroup>
        <Typography sx={{ marginLeft: 2, marginTop: 2, marginBottom: 1}} variant="body2">{`Update Profile Image →`}</Typography>
        <CardContent>
          <RadioGroup
            row
            value={userEdit.profile_img || ''}
            name="row-radio-buttons-group"
            sx={{alignItems:"center", justifyContent: "space-around"}}
            onChange={handleImgChange}
          ><Box>
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
            /></Box><Box>
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
            /></Box>
          </RadioGroup>
        </CardContent>
        <Divider />
        <Box sx={{m:1.5}}>
          <Stack spacing={2} direction="row" justifyContent="flex-end" >
            <Link to={`/profile/${user.id}`}>
            <Button variant="text" size="small" >Cancel</Button>
            </Link>
            <Button variant="contained" size="small" onClick={handleSubmit}>Submit</Button>
          </Stack>
          </Box>
      </FormGroup>
      </FormControl>
    </Box>
  )
}