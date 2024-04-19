import React, { useState, useEffect } from 'react';
import './DevList.css';
import { ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import DeviceItem from './DeviceItem';

const DeviceList = ({ category_id }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        console.log("id :" + category_id);
        console.log("2 : " + !isNaN(category_id));
        let response;
        if(isNaN(category_id))// check if num
        {
          response = await axios.get('api/productGetAll');
          console.log("no params")
        }
        //const response = await axios.get('api/productGetAll');
        else{
          response = await axios.get(`/api/getProductsByCategory/${category_id}`);
        }

        setDevices(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
      }
    };

    fetchDevices();
  }, [category_id]);

  return (
    <div className='devlist__items'>
      {devices.map(device => (
        <DeviceItem key={device.id} product={device} />
      ))}
    </div>
  );
};

export default DeviceList;
