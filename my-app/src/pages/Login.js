import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../data/routes';
import { useState } from 'react';
import { Contact } from '../App';
import Logo from '../assets/logo.png';

import './Login.css';


const Login = (props) => {

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
    }



    for (let index = 0; index < props.contactList.length; index++) {
      const contact = props.contactList[index];
      const loginUsername = contact.username;
      const loginPassword = contact.password;
      if (loginUsername === loginDataValues[0] && loginPassword === loginDataValues[1]) {
        navigate(routes.chat);
        return;
      }
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
    const contact = new Contact(...registerDataValues);
    props.onSuccessfullyRegister(contact);
    setIsHidden(true);
    event.currentTarget.reset();
  };

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