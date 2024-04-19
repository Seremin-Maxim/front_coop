import React, { useState, useEffect } from 'react';
import './navbarHP.css';
import { Link, useNavigate } from 'react-router-dom';
import logo_pic from './assets/logo2.jpeg';
import Axios from 'axios';
const NavBarAuth = () => {
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await Axios.get("/api/getAllCategories");
        setCategories(response.data);
        const responce_brands = await Axios.get("/api/getAllBrands");
        setBrands(responce_brands.data);
        //console.log(brands);
        console.log("token: " + token);

      } catch (error) {
        console.error('Ошибка при работе навбара:', error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className='shit'>
      <nav>
        <a href="/" className="logo ">
          <img src={logo_pic} alt='sos' style={{ height: 80, width: 80 }} />
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
            {categories.map((category) => (
              <Link to={`/categories/${category.id}`} key={category.id}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <ul>
          <li><a href="/brands" className="link">Бренды</a></li>
          <li><a href="/" className="link">Кнопка</a></li>
          <li><a href="/" className="link">Кнопка</a></li>
        </ul>

      </nav>
      <div className="buttons-container">
        {token === undefined ?
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