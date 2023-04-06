import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import routes from "../../data/routes";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'

import './Header.css';

const Header = () => {

const navigate = useNavigate();

const logOut = () => {
  navigate(routes.home);
};

  return (
    <div className="header">
      <img src={logo}></img>
      <div className="button-logout">
        <i className="bi bi-box-arrow-right" onClick={logOut}></i>
      </div>
  </div>
  )
};

export default Header;