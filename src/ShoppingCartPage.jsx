import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './CategoryMenu.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import pic1 from './assets/item_pic.png';
import { Button } from 'react-bootstrap'; // Импортируйте Button из react-bootstrap
import NavBarAuth from './navbarHpAuth';
import NavBar from './navbarHP';
const ShoppingCartPage = () => {
    const token = localStorage.getItem("token");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || token === undefined) {
            navigate('/', { replace: true });
        }
        const fetchSHKData = async () => {
          try {
                
          } catch (error) {
            console.error('Ошибка при получении товаров в корзине:', error);
          }
        };
    
        fetchSHKData();
      }, []);
      return (
        <div>
          <div>{<NavBarAuth/> }</div>
          <h2 className=''>Корзина</h2>
        <div className="">
          {products.map((product) => (
            <Link to={`/item/${product.id}`} key={product.id}>
            <div className="" >
              <img src={pic1} alt={brand.name} />
              <div>{product.SDK}</div>
              <div>{product.price}</div>
            </div>
            </Link>
          ))}
        </div>
        </div>
      );
      
};

export default ShoppingCartPage;




