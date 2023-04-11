import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../data/routes';
import { useState, useEffect } from 'react';
import { User } from '../App';
import Logo from '../assets/logo.png';
import sha256 from 'crypto-js/sha256';

import './Login.css';
import { initScaledrone } from '../services/Messaging';

const Login = (props) => {
  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

  const [registeredUser, setRegisteredUser] = useState(() => {
    const saved = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
      email: localStorage.getItem("email"),
      color: localStorage.getItem("color"),
    };
    return saved || {};
  });

  const [isHidden, setIsHidden] = useState(true);
  const showRegisterForm = () => {
    setIsHidden(false);
  }

  const navigate = useNavigate();

  const registerDataNames = [
    "username",
    "email",
    "password",
  ];

  const loginDataNames = [
    "username",
    "password",
  ];

  const onLogIn = (event) => {
    event.preventDefault();
    const loginData = new FormData(event.currentTarget);
    const loginDataValues = loginDataNames.map(value => loginData.get(value));
    const loginDataMissing = loginDataValues.some(value => !value);
    if (loginDataMissing) {
      alert("Please fill all the fields!");
      return;
    } else if (registeredUser.username === loginDataValues[0] && registeredUser.password == sha256(loginDataValues[1]).toString()) {
        props.onSuccessfullyLogin(registeredUser);
        initScaledrone(registeredUser.username);
        navigate(routes.chat);
        return;
    }
    return alert ("Invalid username or password!");
  };

  const onRegister = (event) => {
    event.preventDefault();

    const registerData = new FormData(event.currentTarget);
    const registerDataValues = registerDataNames.map(value => registerData.get(value));

    const registerDataMissing = registerDataValues.some(value => !value);
    if (registerDataMissing) {
      alert("Please fill all the fields!");
      return;
    }
    let user = new User(...registerDataValues, randomColor());
    user.password = sha256(user.password);
    setRegisteredUser(user);
    alert ("Hello! Welcome to Let's Toco - web chat application. You have successfuly registered. Please login now to use app!")
    setIsHidden(true);
    event.currentTarget.reset();
  };

  useEffect(() => {
    localStorage.setItem("username", registeredUser.username);
    localStorage.setItem("email", registeredUser.email);
    localStorage.setItem("password", registeredUser.password);
    localStorage.setItem("color", registeredUser.color);
  }, [registeredUser]);

  return (
    <div className='homepage'>
      <img src ={Logo}></img>
      <div className='homepage-content'>
        <form className='login-form'onSubmit={onLogIn} >
          <input type="text"  name ='username' placeholder='Username' />
          <input type="password" name='password' placeholder='Password' />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account?</p>
        <i className="bi bi-chevron-double-down" onClick={showRegisterForm}></i>
          <form className='register-form' onSubmit={onRegister} style={{ visibility: isHidden ? 'hidden' : 'visible' }}>
            <input type="text" name ='username' placeholder='Username' />
            <input type="email" name ='email' placeholder='Email' />
            <input type="password" name ='password' placeholder='Password' />
            <button type='submit'>Register</button>
          </form>
      </div>
    </div>
  )
};

export default Login;