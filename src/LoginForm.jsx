/*
import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await Axios.post('http://localhost:3000/api/auth/signin', formData);
      console.log('Ответ от сервера:', response.data);

      localStorage.setItem('token', response.data.token);

      Axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';

 
      navigate('/profile', {replace: true});
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div>
      <h2>SignIn</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="name"
            className="form-control custom-width"
            placeholder="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            className ="form-control custom-width"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div></div>
        <button type="submit" className="btn btn-primary button-m">Submit</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default LoginForm;
*/
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginType: 'name',
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    identifier: '',
    password: ''
  });

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9]{4,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Очищаем ошибку при изменении значения
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Форма отправлена:', formData);

      const requestData = {};

      if (formData.loginType === 'name') {
        requestData.name = formData.identifier;
      } else if (formData.loginType === 'phone_number') {
        requestData.phone_number = formData.identifier;
      }

      if (!isValidPhoneNumber(requestData.phone_number) && formData.loginType === 'phone_number') {
        setErrors({
          ...errors,
          identifier: 'Некорректный формат телефона'
        });
        return;
      }

      if (!isValidPassword(requestData.password)) {
        setErrors({
          ...errors,
          password: 'Пароль должен быть не менее 4 символов и содержать только английские буквы'
        });
        return;
      }

      requestData.password = formData.password;

      console.log('Отправляемые данные на сервер:', requestData);

      const response = await Axios.post('/api/auth/signin', requestData);

      console.log("response_log: ", response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);
      Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      //console.log("token log: ", response.data.token);
      navigate('/home', { replace: true });
    } catch (error) {
      alert('Неправильное имя пользователя или пароль')
      console.log('Full responce from server:', error.response);
      console.error('Ошибка при отправке данных:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    //console.log("token !!!!!! : " + token);
    if (token) {
      // Если токен присутствует, перенаправляем пользователя на страницу профиля
      
      navigate('/home', { replace: true });
    }
  }, []); // Пустой массив зависимостей означает, что useEffect будет вызываться только при монтировании компонента

  return (
    <div className='reg'>
      <h2>SignIn</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login Type:</label>
          <select
            name="loginType"
            className="form-control custom-width"
            value={formData.loginType}
            onChange={handleInputChange}
          >
            <option value="name">Username</option>
            <option value="phone_number">Phone Number</option>
          </select>
        </div>
        <div>
          <label>{formData.loginType === 'name' ? 'Name' : 'Phone Number'}:</label>
          <input
            type={formData.loginType === 'phone_number' ? 'tel' : 'text'}
            name="identifier"
            className="form-control custom-width"
            placeholder={formData.loginType === 'name' ? 'Name' : 'Phone Number'}
            value={formData.identifier}
            onChange={handleInputChange}
          />
          {errors.identifier && <p style={{ color: 'red' }}>{errors.identifier}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control custom-width"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div></div>
        <button type="submit" className="btn btn-primary button-m">
          Submit
        </button>
      </form>
      <p>
        Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default LoginForm;

