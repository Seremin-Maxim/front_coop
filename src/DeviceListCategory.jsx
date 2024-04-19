import React, { useState, useEffect } from 'react';
import './DevList.css';
import { ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import DeviceItem from './DeviceItem';

const DeviceList = ({item}) => {
  const { category_id} = useParams(); 
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        console.log("CATEGPRY:  " + category_id);
        const response = await axios.get(`/api/getProductsByCategory/${category_id}`);
        setDevices(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className='devlist__items'>
      {devices.map(device => (
        <DeviceItem key={device.id} product={device} />
      ))}
    </div>
  );
};

export default DeviceList;
