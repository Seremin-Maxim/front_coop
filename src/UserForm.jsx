import React from 'react';
import Axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function UserForm() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

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

  return (
    <div>
      <div>
        <Link to='/home'>
          <button style={{position:'absolute', top:0, left:0, margin:15}}>Назад</button>
        </Link>
      </div>
      <h2>Successful User</h2>
      <button onClick={handleLogout} className='btn btn-danger button-m butn-ex'>
        Выйти
      </button>
      
    </div>
    
  );
}

export default UserForm;
