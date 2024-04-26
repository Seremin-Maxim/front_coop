import React, { useState, useEffect } from 'react';
import './DeviceItem.css';
import { ListGroup, Row, Col, Card, Button, useAccordionButton } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import pic1 from './assets/item_pic.png';
import pic2 from './assets/itemSL.jpeg'

const DeviceItem = ({ product }) => {
  const [flagForShc, setFlagForShc] = useState(false);
  const customer_id = localStorage.getItem("id");
  const [ShcID, setSchID] = useState({
    id:''
  });
  const [prod_info, setDescription] = useState({
    description: ''
  });
  const product_id = product.id;
  const [quantity, setQuantity] = useState(1); // New state for quantity

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        //const response = await Axios.get(`/api/productGetDescription/${product_id}`);
        //setDescription(response.data);
      } catch (error) {
        console.error('Ошибка при получении описания товара:', error);
      }
    };

    fetchDescription();
  }, [product.id]);

  const handleSubmitToSHC = async (e) => {
    let flag = localStorage.getItem("flag_SHC");
    
    e.preventDefault();
    let responseSHC;
    try {
      console.log("falg: " + flag + " " + localStorage.getItem("flag_SHC"));
      if (!flag) {
        localStorage.setItem("flag_SHC", true);
        console.log("falg1: " + localStorage.getItem("flag_SHC"));
        //console.log("ID for SHC : " + customer_id);
        responseSHC = await Axios.post(`/api/shoppingCart/create/${customer_id}`);
        console.log("SUKA");
        localStorage.setItem("sch_id", responseSHC.data.id);
      }
      
      let responseSHC_ID = await Axios.get(`/api/getSCHIDByCustomer/${customer_id}`);
      localStorage.setItem("sch_id", responseSHC_ID.data.id);
      setSchID(responseSHC_ID.data.id);
      //console.log("id of shc in resp: " + responseSHC.data.id);
      let sch_id_plug = responseSHC_ID.data.id;
      const reqToSckDevice = {
        quantity: quantity,
        product_id: product.id,
        shc_id: sch_id_plug
      };
      console.log("id in req: " + reqToSckDevice.shc_id);
      const responseShcDevice = await Axios.post(`/api/shoppingCartDevice/create/${product_id}`, reqToSckDevice);
      //console.log(reqToSckDevice.data);
      setQuantity(1);
    } catch (error) {
      alert("Some porblems :(");
      console.error('Ошибка при отправке данных:', error);
    }
  };


  return (
    <div className='item-card'>
      <Link to={`/item/${product.id}`}>
        <Image src={pic2} />
      </Link>
      <div>{product.product_name}</div>
      <div>Стоимость: {product.price} руб.</div>
      <div>В наличии: {product.stock}</div>
      <div>
        <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity < product.stock ? quantity + 1 : quantity)}>+</button>

      </div>
      <button onClick={handleSubmitToSHC} >Add to Cart</button>
    </div>
  );
};

export default DeviceItem;
