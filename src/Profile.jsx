import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileSt.css';
import NavBarAuth from './navbarHpAuth';

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone_number: ''
  });
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState({}); // Добавлено для хранения продуктов каждого заказа
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const id_us = localStorage.getItem('id');

  if (!token) {
    navigate("/", { replace: true });
    console.log("No token provided!");
    return null;
  }
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await Axios.get(`/api/user/profile/${id_us}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Ошибка при получении профиля пользователя:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const customer_id = id_us;
        const responseOrders = await Axios.get(`/api/getAllOrders/${customer_id}`);
        setOrders(responseOrders.data);

        // Для каждого заказа получить продукты и сохранить их
        const orderProducts = {};
        for (let order of responseOrders.data) {
          const responseProducts = await Axios.get(`/api/getAllProductsByOrder/${order.id}`);
          orderProducts[order.id] = responseProducts.data;
        }
        setOrderProducts(orderProducts);
      } catch (error) {
        console.error('Ошибка при получении заказов:', error);
      }
    };

    fetchProfileData();
    fetchOrders();
  }, []);
  console.table(orderProducts);

  /*
  сделай этот запрос и сохрани все товары из заказа в массив useState
const responseOrderItems = await Axios.get(`/api/getAllOrderItems/${order.id}`);

тогда ты получишь массив объектов, которые содеражат поля order_id, product_id, нужно в цикле сделать запросы по айди продукта и получить все продукты, которые соответсвуют объектам из заказа с необходимым order_id, я предполагаю, что тут необходимо использовать двумерные массивы, но я не уверен, суть в том, что я вывожу список заказов, чтобы тебе было понятнее: 
ордер айтем(их много) содержит айди товара и айди ордера, поэтому он выступает как связующее звено, т.е ордер содержит ордер айтемы, которые содеражат продукты и мне необходимо выводить номер заказа и товары в нем
вот запрос для получения товара по айди
Axios.get(`/api/getProductById/${id.product_id}`)
*/




  return (
    <div>
      <NavBarAuth />
      {profileData ? (
        <div className='main-profile'>
          <h2>Профиль</h2>
          <div className='profile-wrapper'>
            <div className='profile-info-wrapper'>
              <div className='profile-column'>
                <span>Имя:</span>
                <span>Email:</span>
                <span>Номер телефона:</span>
              </div>
              <div className='profile-column'>
                <span>{profileData.name}</span>
                <span>{profileData.email}</span>
                <span>{profileData.phone_number}</span>
                <button onClick={handleLogout} className='btn-profile-out'>
                  Выйти
                </button>
              </div>
            </div>

          </div>
          <div className='profile-orders-wrapper'>
            <h2>Заказы</h2>
            <div className='orders-list'>
              {orders.map(order => (
                <div key={order.id} className='orders-list-item'>
                  Заказ #{order.id}
                  {orderProducts[order.id] && orderProducts[order.id].map(product => (
                    <div key={product.id} className='orders-list-item-product'>
                      <img
                        src={`http://localhost:3000/static/${product.img}`}
                        alt={product.product_name}
                      />
                      <div className='orders-list-item-product-name'>{product.product_name}</div>
                      <div className='orders-list-item-product-price'>{product.price}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>


      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
}

export default ProfilePage;
