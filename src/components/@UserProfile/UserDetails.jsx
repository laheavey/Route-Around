import React, { useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { pink } from '@mui/material/colors';

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
       setProfileImg(<Face5Icon fontSize="large" color="action"/>);
       break;
      case '6':
       setProfileImg(<Face6Icon fontSize="large" sx={{ color: pink[500] }} />);
       break;
    }
  }

  return (
    <div className='user-details'>
      <section className='flex-container details'>
      <section className='userImg'>
      {/* <h2 className='detailh2 top-left'>User Details -></h2> */}
      {profileImg}
        <Link to={`/edit/profile/${user.id}`}>
          Edit Details
        </Link>
      </section>
      <section className='userInfo'>
      <ul className='userInfoList'>
        <li>
        <h2 className='user-detail-h2'>Username:</h2> {user.username}</li>
        <li>
        <h2 className='user-detail-h2'>Email:</h2> {user.email}</li>
        <li>
        <h2 className='user-detail-h2'>Account Created:</h2> {user.account_created}</li>
      </ul>
      </section>
      </section>
    </div>
  )
}