import React, { useEffect } from 'react';
import './HomePage.css';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import DeviceList from './DeviceList';
import NavBarAuth from './navbarHpAuth';
//import NavBar from './navbarHP';
import CardCarousel from './CardCarousel';
const HomePageAuth = () => {
    const navigate = useNavigate();
    const { category_id } = useParams();
    const location = useLocation();
    const path = location.pathname;
    console.log("path = " + path);
    //const token = localStorage.getItem('token');

    /*
    if (!token) {
      navigate("/", { replace: true });
      console.log("No token provided!");
      return null; // Добавлено возвращение null, чтобы избежать рендеринга остального контента на неавторизованных страницах
    }
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    */
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         // Если токена нет, перенаправляем пользователя на главную страницу
    //         navigate("/", { replace: true });
    //     } 
    // }, []);

  return (
    <div>
        <NavBarAuth/>
        {path == '/' ? <CardCarousel/> : <div/>}
        <div className="home-container">
              <div className="">
                <DeviceList category_id={category_id}/>
              </div>              
        </div>
    </div>

  );
};

export default HomePageAuth;