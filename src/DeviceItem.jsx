import React, { useState, useEffect } from 'react';
import './DeviceItem.css';
import { ListGroup, Row, Col, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import pic1 from './assets/item_pic.png';
import pic2 from './assets/itemSL.jpeg'

const DeviceItem = ({ product }) => {
  
  const [prod_info, setDescription] = useState({
    description: ''
  });
  
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const product_id = product.id;
        const response = await Axios.get(`/api/productGetDescription/${product_id}`);
        setDescription(response.data);
      } catch (error) {
        console.error('Ошибка при получении описания товара:', error);
      }
    };

    fetchDescription();
  }, [product.id]);

  return (

      <div className='item-card'>
        <Link to={`/item/${product.id}`}>
          <Image src={pic2} />
          <div>{product.product_name}</div> 
          <div>Стоимость: {product.price} руб.</div>
          <div>В наличии: {product.stock}</div>
        </Link>
      </div>
    
    
  );
};

export default DeviceItem;
