import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import './ProfileSt.css';
import NavBarAuth from './navbarHpAuth';
function ProfilePage() {

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone_number: ''
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  //console.log("token 1 : ", localStorage.getItem('token'));
  const id_us = localStorage.getItem('id');
  //console.log("user id _prof : ", id_us);
  if (!token) {
    navigate("/", { replace: true });
    console.log("No token provided!");
    return null; // Добавлено возвращение null, чтобы избежать рендеринга остального контента на неавторизованных страницах
  }
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleLogout = () => {
    // Очистка токена при выходе
    localStorage.removeItem('token');
    // Перенаправление на страницу входа
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await Axios.get(`/api/user/profile/${id_us}`);
        setProfileData(response.data);
        //console.log('Data for profile:', profileData);
      } catch (error) {
        console.error('Ошибка при получении профиля пользователя:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
<div>
  <NavBarAuth/>

    {profileData ? (
       
      <div className='mainProf'>
        <div className='designations'>          
          <span className='label'>Имя:</span> 
      
          <span className='label'>Email:</span> 
        
          <span className='label'>Номер телефона:</span> 
        </div>

        <div className='values'>
          <p>{profileData.name}</p>
          <p>{profileData.email}</p>
          <p>{profileData.phone_number}</p>
        </div>

        <p><button>Изменить пароль</button></p>
      </div>
    ) : (
      <p>Загрузка данных...</p>
    )}
    <button onClick={handleLogout} className='btn-out'>
      Выйти
    </button>
  </div>
  );
}

export default ProfilePage;
