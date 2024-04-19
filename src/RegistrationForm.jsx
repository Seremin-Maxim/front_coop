import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phone_number: '',
    password: ''
  });

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    // Очистка ошибок при изменении полей
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, phone_number, password } = formData;

      if (!isValidEmail(email) || !isValidPhoneNumber(phone_number) || !isValidPassword(password)) {
        if (!isValidEmail(email)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Некорректный формат email'
          }));
        }
        if (!isValidPhoneNumber(phone_number)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone_number: 'Некорректный формат телефона'
          }));
        }
        if (!isValidPassword(password)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Пароль должен состоять только из английских букв и цифр, и быть не менее 4 символов'
          }));
        }
      } else {
        const response = await Axios.post('/api/auth/signup', formData);
        console.log('Ответ от сервера:', response.data);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);

        Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Если токен присутствует, перенаправляем пользователя на страницу профиля
      navigate('/home', { replace: true });
    }
  }, []);

  return (
    <div className='registration-container reg'>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <input
            type='text'
            name='name'
            className='form-control custom-width'
            placeholder='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Email address:</label>
          <input
            className='form-control custom-width'
            type='text'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div className='form-group'>
          <label>Phone number:</label>
          <input
            className='form-control custom-width'
            type='number'
            name='phone_number'
            placeholder='8(800)800-00-80'
            value={formData.phone_number}
            onChange={handleInputChange}
          />
          {errors.phone_number && <p style={{ color: 'red' }}>{errors.phone_number}</p>}
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            className='form-control custom-width'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type='submit' className='btn btn-primary button-m'>
          Submit
        </button>
      </form>
      <p>
        Уже есть аккаунт? <Link to='/signin'>Войти</Link>
      </p>
    </div>
  );
}

export default RegistrationForm;
