import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './CategoryMenu.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import pic1 from './assets/item_pic.png';
import { Button } from 'react-bootstrap'; // Импортируйте Button из react-bootstrap
import NavBarAuth from './navbarHpAuth';
import NavBar from './navbarHP';
const BrandMenu = () => {
    const token = localStorage.getItem("token");
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBrandData = async () => {
          try {
            const response = await Axios.get("/api/getAllBrands");
            setBrands(response.data);
            //console.log(categories);
          } catch (error) {
            console.error('Ошибка при получении brands:', error);
          }
        };
    
        fetchBrandData();
      }, []);
      return (
        <div>
          <div>{<NavBarAuth/> }</div>
          <h2 className='headName'>Бренды</h2>
        <div className="category-grid">
          {brands.map((brand) => (
            <Link to={`/brands/${brand.id}`} key={brand.id}>
            <div className="category-card" >
              <img src={pic1} alt={brand.name} />
              <h2>{brand.name}</h2>
            </div>
            </Link>
          ))}
        </div>
        </div>
      );
      
};

export default BrandMenu;




