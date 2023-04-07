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
  color,
) {
  this.username = username;
  this.email = email;
  this.password = password;
  this.color = color;
}


function App() {

  const [user,setUser] = useState({});

  const onSuccessfullyLogin = (user) => {
    setUser(user);
  };

  const router = createBrowserRouter([
    {
      path: routes.home,
      element: <Login onSuccessfullyLogin={onSuccessfullyLogin}/>,
    },
    {
      path: routes.chat,
      element: <Chat user={user}/>,
    },
  ]);

  return <div>
  <RouterProvider router={router} /><Footer /></div>;
}

export default App;
