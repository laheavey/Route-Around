import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="navBarTest">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><Link to={`/`}>Dashboard</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to={`/profile/${user.id}`}>Profile</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to={`/allPoints`}>All Points</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to={`/allRoutes`}>All Routes</Link></MenuItem>
          </Menu>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            RouteAround
          </Typography>
          <Button color="inherit" variant="body2" onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )


  // return (
  //   <div className="nav">
  //     <Link to="/home">
  //       <h2 className="nav-title">Prime Solo Project</h2>
  //     </Link>
  //     <div>
  //       {/* If no user is logged in, show these links */}
  //       {!user.id && (
  //         // If there's no user, show login/registration links
  //         <Link className="navLink" to="/login">
  //           Login / Register
  //         </Link>
  //       )}

  //       {/* If a user is logged in, show these links */}
  //       {user.id && (
  //         <>
  //           <Link className="navLink" to="/user">
  //             Home
  //           </Link>

  //           <Link className="navLink" to="/info">
  //             Info Page
  //           </Link>

  //           <LogOutButton className="navLink" />
  //         </>
  //       )}

  //       <Link className="navLink" to="/about">
  //         About
  //       </Link>
  //     </div>
  //   </div>
  // );
};

