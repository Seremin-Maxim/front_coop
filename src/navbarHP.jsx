import React, { useState, useEffect } from 'react';
import './navbarHP.css';
import { Link, useNavigate } from 'react-router-dom'; 
import logo_pic from './assets/logo2.jpeg';


const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
    return (
      <div className='shit'>
        <nav>
            <a href="/" className="logo ">
              <img src={logo_pic} alt='sos' style={{height: 80, width: 80}}/>
              <div className='logo-text'>
                <p className="tagline">Slavic</p>
                <p className="tagline">Electronic</p>
              </div>
            </a>

            <div className="dropdown">
                <a href="/categories">
                  <button className="dropbtn">Категории </button>
                </a>
                <div className="dropdown-content">
                  <a href="/3">Телефоны</a>
                  <a href="/10">Планшеты</a>
                  <a href="/4">Телевизоры</a>
                  <a href="/14">Ноутбуки</a>
                </div>
              </div> 
            <ul>
              <li><a href="/" className="link">Кнопка</a></li>
              <li><a href="/" className="link">Кнопка</a></li>
              <li><a href="/" className="link">Кнопка</a></li>
            </ul>
            
          </nav>
          <div className="buttons-container">
            {token ? 
                <div>
                  <Link to="/testing" className='login-button'>Admin</Link>
                  <Link to="/profile" className='login-button'>Профиль</Link>
                </div> : 
                <div>
                  <Link to="/signin" className='login-button'>Вход</Link>
                  <Link to="/signup" className='register-button'>Регистрация</Link>
                </div>
            }
              
          </div>
    
      </div>
    );
  };
  
  export default NavBar;