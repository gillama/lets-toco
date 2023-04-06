import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./data/routes";
import Chat from './pages/Chat';
import Login from './pages/Login';
import { useState } from 'react';

import Footer from './components/Chat/Footer';

import './App.css';


export function Contact(
  username,
  email,
  password,
) {
  this.username = username;
  this.email = email;
  this.password = password;
}

  const contacts = [
    new Contact (
      'Ana',
      'ana.anic@email.com',
      '12345abcd'
    ),
    new Contact (
      'Petar',
      'petar.peric@email.com',
      'abcdefgh'
    ),
    new Contact (
      'Jure',
      'jure.juric@email.com',
      '12ab34cd'
    )
];


function App() {

  const [contactList, setContactList] = useState(contacts);

  const onSuccessfullyRegister = (contact) => {
    const newList = [...contactList, contact];
    setContactList(newList);
    alert ("Hello! Welcome to Let's Toco - web chat application. You have successfuly registered. Please login now to use app!")
  };

  const router = createBrowserRouter([
    {
      path: routes.home,
      element: <Login contactList ={contactList} onSuccessfullyRegister={onSuccessfullyRegister}/>,
    },
    {
      path: routes.chat,
      element: <Chat contacts={contacts} />,
    },
  ]);

  return <div>
  <RouterProvider router={router} /><Footer /></div>;
}

export default App;
