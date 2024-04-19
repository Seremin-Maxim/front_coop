//HomePage.jsx
import React, { useEffect } from 'react';
import './HomePage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeviceList from './DeviceList';
import NavBar from './navbarHP'

const HomePage = () => {

    const { category_id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          // Если токен присутствует, перенаправляем пользователя на страницу профиля
          navigate('/home', { replace: true });
        }
      }, []);
  return (
    <div>
        <NavBar></NavBar>
        <div className="home-container">
            <div className='container-plug'>
              <div className="homepage__container">
                <DeviceList category_id={category_id}/>
              </div>

              
            </div>
            {/*доп. контент главной страницы */}
        </div>
    </div>
    
  );
};

export default HomePage;