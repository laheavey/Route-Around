import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../UserLogin/LoginPage';
import RegistrationPage from '../UserLogin/RegistrationPage';
import Dashboard from '../Dashboard/Dashboard';
import AllRoutes from '../Routes/AllRoutes';
import AllPoints from '../PointsOfInterest/AllPoints';
import RouteDetail from '../Routes/Detail/RouteDetail';
import PointDetail from '../PointsOfInterest/PointDetail';
import UserProfile from '../UserProfile/UserProfile'
import UserEdit from '../UserProfile/UserEdit/UserEdit';
import ActiveRoute from '../ActiveRoute/ActiveRoute';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>

          <Redirect exact from="/" to="/home" />

          <Route exact path="/about">
            <AboutPage />
          </Route>

          <ProtectedRoute exact path="/dashboard">
            <Nav />
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute exact path="/allRoutes">
            <Nav />
            <AllRoutes />
          </ProtectedRoute>

          <ProtectedRoute exact path="/allPoints">
            <Nav />
            <AllPoints />
          </ProtectedRoute>

          <ProtectedRoute exact path="/routeDetail/:id">
            <Nav />
            <RouteDetail />
          </ProtectedRoute>

          <ProtectedRoute exact path="/pointDetail/:id">
            <Nav />
            <PointDetail />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile/:id">
            <Nav />
            <UserProfile />
          </ProtectedRoute>

          <ProtectedRoute exact path="/activeRoute/:id">
            <Nav />
            <ActiveRoute />
          </ProtectedRoute>
            <ProtectedRoute exact path="/activeRoute/reverse/:id">
              <Nav />
              <ActiveRoute />
            </ProtectedRoute>

          <ProtectedRoute exact path="/edit/profile/:id">
            <Nav />
            <UserEdit />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id 
            ? <Redirect to="/dashboard" />
            : <LoginPage />
            }
          </Route>

          <Route exact path="/registration" >
            {user.id 
            ? <Redirect to="/dashboard" />
            : <RegistrationPage />
            }
          </Route>

          <Route exact path="/home">
            {user.id 
            ? <Redirect to="/dashboard" />
            : <Redirect to="/login" />
            }
          </Route>

          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
