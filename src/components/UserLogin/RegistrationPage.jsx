import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function RegistrationPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {event.preventDefault();};

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <section className='login-header'>
      <h2 className='login-h1'>Route Around</h2>
      <h4 className='form-small-text'>USER REGISTRATION</h4>
      </section>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Stack spacing={2} direction="column" justifyContent="center" alignItems='center'>
      <div>
      <FormControl>
        <InputLabel htmlFor="outlined-size-small" size='small'>
          Username
        </InputLabel>
        <OutlinedInput
          id="outlined-size-small"
          type='text'
          name="username"
          required
          size='small'
          value={username}
          sx={{ marginBottom: 1.5}}
          onChange={(event) => setUsername(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          label="Username"
        />
      </FormControl>
      </div>

      <div>
      <FormControl>
        <InputLabel htmlFor="outlined-size-small" size='small'>
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-size-small"
          type={showPassword ? 'text' : 'password'}
          name="password"
          required
          size='small'
          value={password}
          sx={{ marginBottom: 1.5}}
          onChange={(event) => setPassword(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        </FormControl>
      </div>
      <div className='btn-center'>
      <Stack spacing={1} direction="column" >
        <Button variant="contained" size="small" type="submit" name="submit" value="Register" sx={{ marginTop: 2}}>
          Register
        </Button>
        <Button variant="text" size="small" onClick={() => {history.push('/login');}}>Log In</Button>
      </Stack>
      </div>
      </Stack>
    </form>
  );
}


