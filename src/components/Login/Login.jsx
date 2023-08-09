import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [erroeMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }


  const renderErrorMsg = () => (
    <p className='login-error-msg'>{erroeMessage}</p>
  )

  const onSubmitSuccess = (jwt_token) => {
    Cookies.set("jwt_token", jwt_token, { expires: 1 });
    setShowErrorMessage(false);
    navigate('/');
  };

  const onSubmitFailure = (erroeMessage) => {
    setShowErrorMessage(true);
    setErrorMessage(erroeMessage);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apis.ccbp.in/login';
    const userDetails = { username, password };
    const option = {
      method: "POST",
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json() 
     if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    }
    else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }
  else {
    return (
      <div className="main-container">
        <div className="login-card">
          <div className="website-logo">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="username-container">
              <label for="username">USERNAME</label>
              <br />
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsername}
                placeholder="UserName"
              />
            </div>
            <div className="password-container">
              <label for="password">PASSWORD</label>
              <br />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
              />
            </div>
            <div className="login-submit">
            <button type='submit' className='login-btn'>Login</button>
            {showErrorMessage && renderErrorMsg()}
      
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login