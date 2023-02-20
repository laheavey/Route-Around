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
    <section className='flex-container user-details'>

      <section className='user-img'>
        <h2 className='top-h2'>{`User Detail →`}</h2>
        <div className='user-img-edit'>
          {profileImg}
          <Link to={`/edit/profile/${user.id}`} >
            Edit Details
          </Link>
        </div>
      </section>

      <section className='user-info'>
        <ul className='ud-list'>
          <li>
            <h2 className='ud-h2'>Username:</h2> 
            {user.username}
          </li>
          <li>
            <h2 className='ud-h2'>Email:</h2> 
            {user.email}
          </li>
          <li>
            <h2 className='ud-h2'>Account Created:</h2> 
            {/* {user.account_created} */}{`02/05/2023`}
          </li>
      </ul>
      </section>
      
    </section>
  )
}