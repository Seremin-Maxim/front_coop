import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileSt.css';
import NavBarAuth from './navbarHpAuth';
import { Modal, Button } from 'react-bootstrap';

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone_number: ''
  });
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const id_us = localStorage.getItem('id');


  const [show, setShow] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

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


  const handleClose = (orderId) => {
    setShow(prevShow => ({ ...prevShow, [orderId]: false }));
  };

  const handleShow = (orderId) => {
    setSelectedOrder(orderId);
    setShow(prevShow => ({ ...prevShow, [orderId]: true }));
  };



  const cancelOrder = async (orderId) => {
    try {
      // Отправляем запрос на сервер для удаления заказа
      await Axios.delete(`/api/deleteOrder/${orderId}`);
      // Обновляем список заказов, удаляя отмененный заказ
      setOrders(orders.filter(order => order.id !== orderId));
      // Удаляем продукты связанные с отмененным заказом
      const updatedOrderProducts = { ...orderProducts };
      delete updatedOrderProducts[orderId];
      setOrderProducts(updatedOrderProducts);
      // Возможно, вы захотите добавить здесь уведомление об успешной отмене заказа
    } catch (error) {
      console.error('Ошибка при отмене заказа:', error);
      // Возможно, вы захотите добавить здесь уведомление об ошибке
    }
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
                  <div className='order-header'>
                    <div>

                      <span>Заказ #{order.id}</span>
                    </div>
                    <div>Cостояние: {order.state}</div>
                  </div>
                  {orderProducts[order.id] && orderProducts[order.id].map(product => (
                    <div key={product.id} >
                      <div className='orders-list-item-product'>
                        <div >
                          <img
                            src={`http://localhost:3000/static/${product.img}`}
                            alt={product.product_name}
                          />
                        </div>
                        <div className='orders-list-item-product-name'>{product.product_name}</div>
                        <div className='orders-list-item-product-quantity'>{product.quantity} шт.</div>
                        <div className='orders-list-item-product-price'>{product.price} руб.</div>
                      </div>

                    </div>
                  ))}
                  <div className='order-list-price-wrapper'>
                  <button className='order-list-price-btn' onClick={() => handleShow(order.id)}>Информация</button>
                    <button className='order-list-price-btn' onClick={() => cancelOrder(order.id)}>Отменить</button>
                    <div className='order-list-price-text'>
                      <div>Сумма:</div>
                      <div>
                        {
                          orderProducts[order.id] ?
                            orderProducts[order.id].reduce((total, product) => total + product.price * product.quantity, 0) :
                            'Загрузка...' // Или другое сообщение, указывающее на отсутствие данных
                        } руб.
                      </div>
                    </div>
                  </div>
                  <Modal show={show[order.id]} onHide={() => handleClose(order.id)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Заказ {selectedOrder}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {<div>
                            <div>{order.country}</div>
                            <div>{order.city}</div>
                            <div>{order.address}</div>
                            <div>{order.date}</div>
                            <div>{order.state}</div>
                            <div>{order.method}</div>
                          </div>}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => handleClose(order.id)}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
