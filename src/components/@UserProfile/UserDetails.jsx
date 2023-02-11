import React, { useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { pink, white } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';

export default function UserDetails () {
  const user = useSelector((store) => store.user)
  const [profileImg, setProfileImg] = useState('')

  useEffect(()=> {
    evalProfileImg();
  },[])

  const evalProfileImg = () => {
    switch (user.profile_img) {
      case '1':
       setProfileImg(<FaceIcon fontSize="large" color="warning"/>);
       break;
      case '2':
       setProfileImg(<Face2Icon fontSize="large" color="primary"/>);
       break;
      case '3':
       setProfileImg(<Face3Icon fontSize="large" color="secondary"/>);
       break;
      case '4':
       setProfileImg(<Face4Icon fontSize="large" color="success"/>);
       break;
      case '5':
       setProfileImg(<Face5Icon fontSize="large"color="action"/>);
       break;
      case '6':
       setProfileImg(<Face6Icon fontSize="large" sx={{ color: pink[500] }} />);
       break;
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:"center", margin: 1.5 }}>
        {profileImg}
        
        
        <Typography variant="caption" color="text.secondary" >
          <Link to={`/edit/profile/${user.id}`}>
        Edit Details
        </Link>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 'auto' }}>
          <List>
          <Typography variant="body2" component="div" >
            {"Username: "}{user.username} <br/>
            {"Email: "}{user.email}<br/>
            {"Account Created: "}{user.account_created}<br/>
          </Typography>
          </List>
        </CardContent>
      </Box>
    </>
  )
}