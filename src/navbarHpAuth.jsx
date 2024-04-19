import React, { useState, useEffect } from 'react';
import './navbarHP.css';
import { Link, useNavigate } from 'react-router-dom'; 
import logo_pic from './assets/logo2.jpeg';

const NavBarAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  /*
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // Если токен присутствует, перенаправляем пользователя на страницу профиля
        navigate('/home', { replace: true });
      }
    }, []);
    */
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
                  <a href="/categories/3">Телефоны</a>
                  <a href="/categories/10">Планшеты</a>
                  <a href="/categories/4">Телевизоры</a>
                  <a href="/categories/14">Ноутбуки</a>
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
  
  export default NavBarAuth;