import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import "./testing.css"
function TestingPage() {
  const navigate = useNavigate();
const [brand, setFormDataBrand] = useState({
    name: ''
  });
  const [category, setFormDataCategory] = useState({
    name: ''
  });
  const [product, setFormDataProduct] = useState({
    name: '',
    brand_id: '',
    SDK: '',
    price: '',
    stock: ''
  });
  const [category_prod, setFormDataProductCategory] = useState({
    name_category: '',
    category_id: ''
  });

  const [prod_info, setFormDataProductInfo] = useState({
    title: '',
    description: '',
    prod_id: '',
  });

  const [notification, setNotification] = useState(null);
  /*
  const [final_product, setFormDataProductFinal] = useState({
    category_id: '',
    brand_id: '',
    SDK: '',
    price: '',
    stock: ''
  });
  */

  const handleSubmitBrand = async (e) => {
    e.preventDefault();
    try {
        const response = await Axios.post('/api/brand/create', brand);
        console.log("BRAND_NAME = ", brand.name);
        console.log('Ответ от сервера:', response.data);
        alert("Бренд "+ brand.name + " успешно создан!");
        setFormDataBrand({
          name: ''
        });
        

      }catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
        const responseCat = await Axios.post('/api/category/create', category);
        console.log("CATEGORY_NAME = ", category.name);
        console.log('Ответ от сервера:', responseCat.data);
        alert("Категория "+ category.name + " успешно создана!");
        setFormDataCategory({
          name:''
        });

      }catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };
  //const response = await Axios.get("http://localhost:8000/api");

  const handleSubmitProductInfo = async (e) => {
    e.preventDefault();
    try {
        const productInfoUpd = {
        title: prod_info.title,
        description: prod_info.description
        };
        console.log(productInfoUpd.title + "  " + productInfoUpd.description + prod_info.prod_id);
        const product_id = prod_info.prod_id;
        const responseProdInfo = await Axios.post(`/api/productinfo/create/${product_id}`, productInfoUpd);
        alert("Описание товара "+ productInfoUpd.title + " успешно создано!");
        setFormDataProductInfo({
          title:'',
          description: '',
          prod_id: ''
        });

      }catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };







  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const responseBrandID = await Axios.get(`/api/getbrandID/${product.name}`);

      const updatedProduct = {
        ...product,
        brand_id: responseBrandID.data
      };
      setFormDataProduct(updatedProduct);
      console.log("BRAND_ID = ", updatedProduct.brand_id);
      

      const responseCategoryID = await Axios.get(`/api/getcategoryID/${category_prod.name_category}`);
      const updatedCategoryID = {
        ...category_prod,
        category_id: responseCategoryID.data
      };
      setFormDataProductCategory(updatedCategoryID);
      console.log("CATEGORY_ID_IN_PROD = ", updatedCategoryID.category_id);

      const final_product = {};
      final_product.brand_id = updatedProduct.brand_id;
      final_product.category_id = updatedCategoryID.category_id;
      final_product.SDK = product.SDK;
      final_product.price = product.price;
      final_product.stock = product.stock;
      console.log("final_product.brand_id = ", final_product.brand_id);
      const responseFinalProd = await Axios.post(`/api/product/create/${final_product.category_id}/${final_product.brand_id}`, final_product);

      console.log("Ответ на отправку продукта: ", responseFinalProd);

      setFormDataProduct({
        name: '',
        brand_id: '',
        SDK: '',
        price: '',
        stock: ''
      });
      setFormDataProductCategory({
        name_category: '',
        category_id: ''
      });

      alert("Продукт успешно создан!");


    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };




  /*
  const handleSubmitProductCategory = async (e) => {
    e.preventDefault();
    try {

      const responseCategoryID = await Axios.get(`/api/getcategoryID/${category_prod.name_category}`);
      const updatedCategoryID = {
        ...category_prod,
        category_id: responseCategoryID.data
      };
      setFormDataProductCategory(updatedCategoryID);
      console.log("CATEGORY_ID_IN_PROD = ", updatedCategoryID.category_id);
  
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };
  */

  const handleInputChangeProductInfoTitle = (e) => {
    const { name, value } = e.target;
    setFormDataProductInfo({
      ...prod_info,
      [name]: value
    });
  };
  const handleInputChangeProductInfoDescription = (e) => {
    const { name, value } = e.target;
    setFormDataProductInfo({
      ...prod_info,
      [name]: value
    });
  };
  const handleInputChangeProductInfoProdId = (e) => {
    const { name, value } = e.target;
    setFormDataProductInfo({
      ...prod_info,
      [name]: value
    });
  };



  const handleInputChangeProductSDK = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value
    });
  };

  const handleInputChangeProductPrice = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value
    });
  };
  const handleInputChangeProductStock = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value
    });
  };

  const handleInputChangeProduct = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value
    });
  };

  const handleInputChangeProductCategory = (e) => {
    const { name, value } = e.target;
    setFormDataProductCategory({
      ...category_prod,
      [name]: value
    });
  };

  const handleInputChangeBrand = (e) => {
    const { name, value } = e.target;
    setFormDataBrand({
      ...brand,
      [name]: value
    });
  };

  const handleInputChangeCategory = (e) => {
    const { name, value } = e.target;
    setFormDataCategory({
      ...category,
      [name]: value
    });
  };


  return (
    <div className='common'>
      <Link to='/home'>
        <button className='btn-back'>Назад</button>
      </Link>
      <div className='Descr'>Admin Board</div>
      <form onSubmit={handleSubmitBrand} className='form-creators'>
          <div className='create-labels'>Бренд</div>
          <input
              type='text'
              name='name'
              placeholder = 'Название бреда'
              value={brand.name}
              onChange={handleInputChangeBrand}
              className="input-brand-name" 
            />
            <button type='submit' className='btn-sub'>
              Создать
          </button>
        
      </form>
      <form onSubmit={handleSubmitCategory} className='form-creators'>
          <div className='create-labels'>Категория</div>
          <input
              type='text'
              name='name'
              placeholder = 'Название категории'
              value={category.name}
              onChange={handleInputChangeCategory}
              className="input-brand-name" 
            />
            <button type='submit' className='btn-sub'>
              Создать
          </button>
        
      </form>





      <form onSubmit={handleSubmitProduct} className='form-creators'>

          <div className='create-labels'>Создание Продукта</div>
          <input
              type='text'
              name='name'
              placeholder = 'Бренд'
              value={product.name || ''}
              onChange={handleInputChangeProduct}
              className="input-brand-name" 
            />
          <input
              type='text'
              name='name_category'
              placeholder = 'Категория'
              value={category_prod.name_category || ''}
              onChange={handleInputChangeProductCategory}
              className="input-brand-name" 
            />
          <input
              type='text'
              name='SDK'
              placeholder = 'SDK'
              value={product.SDK || ''}
              onChange={handleInputChangeProductSDK}
              className="input-brand-name" 
            />
           <input
              type='text'
              name='price'
              placeholder = 'Стоимость'
              value={product.price || ''}
              onChange={handleInputChangeProductPrice}
              className="input-brand-name" 
            />
           <input
              type='text'
              name='stock'
              placeholder = 'Кол-во в наличии'
              value={product.stock || ''}
              onChange={handleInputChangeProductStock}
              className="input-brand-name" 
            />
          <button type='submit' className='btn-sub'>
              Создать
          </button>
      </form>

      <form onSubmit={handleSubmitProductInfo} className='form-creators'>
          <div className='create-labels'>Описание товара</div>
          <input
              type='text'
              name='title'
              placeholder = 'Название'
              value={prod_info.title}
              onChange={handleInputChangeProductInfoTitle}
              className="input-brand-name" 
            />
          <input
              type='text'
              name='description'
              placeholder = 'Описание'
              value={prod_info.description}
              onChange={handleInputChangeProductInfoDescription}
              className="input-brand-name" 
          />
          
          <input
              type='text'
              name='prod_id'
              placeholder = 'ID Товара'
              value={prod_info.prod_id}
              onChange={handleInputChangeProductInfoProdId}
              className="input-brand-name" 
          />
            <button type='submit' className='btn-sub'>
              Создать
          </button>
        
      </form>
      
    </div>
    
  );
}

export default TestingPage;