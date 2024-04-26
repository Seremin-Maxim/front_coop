import React, { useState, useEffect } from 'react';
import './DeviceItemPage.css';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import pic1 from './assets/item_pic.png';
import NavBarAuth from './navbarHpAuth';
import pic2 from './assets/itemSL.jpeg'
const DeviceItemPage = () => {
  const { product_id } = useParams(); 
  const [prod_info, setDescription] = useState({
    title:'',
    description: ''
  });
  const [product, setProduct] = useState({
    id:'',
    SDK: '',
    brand_id :'',
    category_id:'',
    id:'',
    price:'',
    stock:'',
    product_name:''
  });
  

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        console.log(product_id);
        //const response = await Axios.get(`/api/productGetDescription/${product_id}`);
        //setDescription(response.data);
        const responce_prod = await Axios.get(`/api/getProductById/${product_id}`);
        console.log(responce_prod);
        setProduct(responce_prod.data);
      } catch (error) {
        console.error('Ошибка при получении описания товара:', error);
      }
    };

    fetchDescription();
  }, [product_id]);

  return (
    <div>
      <NavBarAuth />
      <div className="product-page">
        <div className='product-details'>
          <h2 className="product-title">{product.product_name}</h2>
          <Image className="product-image" src={pic2} />
          <div className="product-price">Стоимость: {product.price}</div>
          <div className="product-sdk">SDK: {product.SDK}</div>
          <div className="product-stock">В наличии: {product.stock}</div>
          <div className="product-description">Описание: {prod_info.description}</div>
        </div>
      </div>
    </div>

  );
};

export default DeviceItemPage;
