import React, { useState, useEffect } from 'react';
import './DeviceItemPage.css';
import { ListGroup, Row, Col, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import pic1 from './assets/item_pic.png';

const DeviceItemPage = () => {
  const { product_id } = useParams(); 
  const [prod_info, setDescription] = useState({
    title:'',
    description: ''
  });

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        console.log(product_id);
        const response = await Axios.get(`/api/productGetDescription/${product_id}`);
        setDescription(response.data);
      } catch (error) {
        console.error('Ошибка при получении описания товара:', error);
      }
    };

    fetchDescription();
  }, [product_id]);

  return (
    <Col md={2}>
      <div className='part'>
          <Image width={400} height={400} src={pic1} />
          <div>{prod_info.title}</div> 
          <div className=''>Стоимость: {prod_info.price} руб.</div>
          <div>Стоимость: {prod_info.description}</div>
          <div>SDK: {prod_info.SDK}</div>
          <div>В наличии: {prod_info.stock}</div>
      </div>
    </Col>
  );
};

export default DeviceItemPage;
