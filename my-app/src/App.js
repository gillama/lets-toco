import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./data/routes";
import Chat from './pages/Chat';
import Login from './pages/Login';
import { useState } from 'react';

import Footer from './components/Chat/Footer';

import './App.css';


export function User(
  username,
  email,
  password,
) {
  this.username = username;
  this.email = email;
  this.password = password;
}


function App() {

  const [loginUsername,setLoginUsername] = useState();

  const onSuccessfullyLogin = (name) => {
    const newLoginUsername = name;
    console.log(newLoginUsername);
    setLoginUsername(newLoginUsername);
  };

  const router = createBrowserRouter([
    {
      path: routes.home,
      element: <Login onSuccessfullyLogin={onSuccessfullyLogin}/>,
    },
    {
      path: routes.chat,
      element: <Chat username={loginUsername} />,
    },
  ]);

  return <div>
  <RouterProvider router={router} /><Footer /></div>;
}

export default App;
