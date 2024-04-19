import React, { useState, useEffect } from 'react';
import './DevList.css';
import { ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios'; 
import DeviceItem from './DeviceItem';

const DeviceList = (/*{ category_id }*/) => {
  const { category_id } = useParams(); 
  const {brand_id} = useParams();
  const [devices, setDevices] = useState([]);
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        //console.log("id :" + category_id);
        //console.log("2 : " + !isNaN(category_id));
        let response;
        console.log("id in params(categ): " + category_id);
        console.log("id in params(brand): " + brand_id);
        console.log("location: " + location);
        console.log("path: " + path);
        if(isNaN(category_id) && isNaN(brand_id))// check if num
        {
          console.log("no params")
          response = await axios.get('api/productGetAll');
        }
        else{
          if (path.includes('/brands') ) {
            console.log("brand!");
            response = await axios.get(`/api/getProductsByBrand/${brand_id}`);
          } if (path.includes('/categories')) {
            console.log("category!");
            response = await axios.get(`/api/getProductsByCategory/${category_id}`);
          }
          
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
