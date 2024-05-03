import React, { useState, useEffect, useRef } from 'react';
import './navbarHP.css';
import { Link, useNavigate } from 'react-router-dom';
import logo_pic from './assets/logo2.jpeg';
import Axios from 'axios';
import pic2 from './assets/itemSL.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const NavBarAuth = () => {
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  let isValid;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  // const handleSearchChange = (e) => {
  //   const value = e.target.value;
  //   if (/^[а-яА-ЯёЁa-zA-Z0-9 ]+$/.test(value) || value === '') {
  //     setSearchTerm({ name: value });
  //   }
  // };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      setIsDropdownVisible(true);
      handleSearch(value);
    } else {
      setIsDropdownVisible(false);
      setSearchResults([]);
    }
  };

  // Функция для скрытия выпадающего списка при клике вне его
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };



  // const handleSearchSubmit = async () => {
  //   console.log('Поиск:', searchTerm.name);
  //   const params = {
  //     name: searchTerm.name
  //   }
  //   try {
  //     const response = await Axios.get("/api/getProductByName", { params });
  //     if (response.data && response.data.product_name) {
  //       setSearchResult(response.data); 
  //     } else {
  //       setSearchResult(null); 
  //     }
  //   } catch (error) {
  //     //console.error('Ошибка при поиске товара:', error);
  //     setSearchResult(null);
  //   }
  //   setSearchTerm({ name: '' });
  // };

  const handleSearch = async (value) => {
    try {
      const response = await Axios.get("/api/searchProducts", { params: { name: value } });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Ошибка при поиске товара:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await Axios.get("/api/getAllCategories");
        setCategories(response.data);
        const responce_brands = await Axios.get("/api/getAllBrands");
        setBrands(responce_brands.data);

      } catch (error) {
        console.error('Ошибка при работе навбара:', error);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    // Добавление обработчика клика вне выпадающего списка
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Удаление обработчика при размонтировании компонента
      document.removeEventListener('mousedown', handleClickOutside);
    };
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


      <div className="search-container">
          <input
            type="text"
            placeholder="Поиск товара..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {/* Удаление кнопки "Найти" */}
          <div className="dropdown-content" ref={dropdownRef} style={{ display: isDropdownVisible ? 'block' : 'none' }}>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div className="dropdown-item" key={result.id}>
                  <Link to={`/item/${result.id}`}>
                  <img src={pic2} alt={result.product_name} />
                  <span>{result.product_name}</span>
                  </Link>
                </div>
              ))
            ) : (
              <div>Не найдено</div>
            )}
          </div>
        </div>



      <div className="buttons-container">
        {token === undefined || !token ?
          <div>
            <Link to="/signin" className='login-button'>Вход</Link>
            <Link to="/signup" className='register-button'>Регистрация</Link>
          </div> :
          <div>
                        <Link to="/shoppingcart" className="shopping-cart-button">
              <FontAwesomeIcon icon={faShoppingCart} size="2x" color="white"/>
            </Link>
            <Link to="/testing" className='login-button'>Admin</Link>
            <Link to="/profile" className='login-button'>Профиль</Link>
          </div>
        }
      </div>

    </div>
  );
};

export default NavBarAuth;
