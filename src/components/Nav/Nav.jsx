import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';

import './Nav.css';

export default function Nav() {
  let pathname;
  const params = useParams();
  const location = useLocation();
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

  const handleNavBarTitle = () => {
    pathname = location.pathname;
    switch(pathname) {
      case '/allRoutes':
        pathname = 'Route Around > All Routes';
        return pathname;
      case `/activeRoute`:
        pathname = 'Route Around > Active Route';
        return pathname;
      case '/dashboard':
        pathname = 'Route Around > Dashboard';
        return pathname;
      case '/allPoints':
        pathname = 'Route Around > All Points';
        return pathname;
      case `/profile/${user.id}`:
        pathname = 'Route Around > User Profile';
        return pathname;
      case `/routeDetail/${params.id}`:
        pathname = `Route Around > Route Detail`;
        return pathname;
      case `/pointDetail/${params.id}`:
        pathname = `Route Around > Point Detail`;
        return pathname;
      default:
        pathname = 'Route Around';
        return pathname;
    }
  }
  
  return (
    <div className="nav">
      <div className='dropdown'>
        <button className="dropbtn">+</button>
        <div className="dropdown-content">
          <h1 className='nav-title'>{'Route Around'}</h1>
            {/* If no user is logged in, show login/registration links */}
            {!user.id && (<a className="navLink" to="/login">Login / Register</a>)}
            {/* If a user is logged in, show these links */}
            {user.id && (
            <>
              <Link className="navLink" to={`/`}>Dashboard</Link><br/>
              <Link className="navLink" to={`/profile/${user.id}`}>Profile</Link><br/>
              <Link className="navLink" to={`/allPoints`}>All Points</Link><br/>
              <Link className="navLink" to={`/allRoutes`}>All Routes</Link><br/>
              <button className="navLink" onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button><br/>
            </>
          )}
          <a className="navLink" to="/about">About This App</a>
        </div>
      </div>
      <div className="navBarTitle">{handleNavBarTitle()}</div>
    </div>
  );
};

