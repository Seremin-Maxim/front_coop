import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./testing.css";
import NavBarAuth from "./navbarHpAuth";
function TestingPage() {
  const navigate = useNavigate();
  const [brand, setFormDataBrand] = useState({
    name: "",
  });
  const [category, setFormDataCategory] = useState({
    name: "",
  });
  const [product, setFormDataProduct] = useState({
    brand_name: "",
    brand_id: "",
    product_name: "",
    SDK: "",
    price: "",
    stock: "",
    img: null,
  });
  const [category_prod, setFormDataProductCategory] = useState({
    name_category: "",
    category_id: "",
  });

  const [prod_info, setFormDataProductInfo] = useState({
    title: "",
    description: "",
    prod_id: "",
  });

  const [imageData, setFormDataImage] = useState({
    selectedFile: null,
    product_name: "",
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
      const response = await Axios.post("/api/brand/create", brand);
      console.log("BRAND_NAME = ", brand.name);
      console.log("Ответ от сервера:", response.data);
      alert("Бренд " + brand.name + " успешно создан!");
      setFormDataBrand({
        name: "",
      });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const responseCat = await Axios.post("/api/category/create", category);
      console.log("CATEGORY_NAME = ", category.name);
      console.log("Ответ от сервера:", responseCat.data);
      alert("Категория " + category.name + " успешно создана!");
      setFormDataCategory({
        name: "",
      });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };
  //const response = await Axios.get("http://localhost:8000/api");

  const handleSubmitProductInfo = async (e) => {
    e.preventDefault();
    try {
      const productInfoUpd = {
        title: prod_info.title,
        description: prod_info.description,
      };
      console.log(
        productInfoUpd.title +
          "  " +
          productInfoUpd.description +
          prod_info.prod_id
      );
      const product_id = prod_info.prod_id;
      const responseProdInfo = await Axios.post(
        `/api/productinfo/create/${product_id}`,
        productInfoUpd
      );
      alert("Описание товара " + productInfoUpd.title + " успешно создано!");
      setFormDataProductInfo({
        title: "",
        description: "",
        prod_id: "",
      });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const responseBrandID = await Axios.get(
        `/api/getbrandID/${product.brand_name}`
      );
  
      const updatedProduct = {
        ...product,
        brand_id: responseBrandID.data,
      };
      setFormDataProduct(updatedProduct);
  
      const responseCategoryID = await Axios.get(
        `/api/getcategoryID/${category_prod.name_category}`
      );
      const updatedCategoryID = {
        ...category_prod,
        category_id: responseCategoryID.data,
      };
      setFormDataProductCategory(updatedCategoryID);
  
      const final_product = new FormData();
      final_product.append('brand_id', updatedProduct.brand_id);
      final_product.append('product_name', product.product_name);
      final_product.append('category_id', updatedCategoryID.category_id);
      final_product.append('SDK', product.SDK);
      final_product.append('price', product.price);
      final_product.append('stock', product.stock);
      if (product.img) {
        final_product.append('img', product.img);
      }
      
      
      const responseFinalProd = await Axios.post(
        `/api/product/create/${final_product.category_id}/${final_product.brand_id}`,
        final_product
      );
  
      setFormDataProduct({
        brand_name: "",
        brand_id: "",
        product_name: "",
        SDK: "",
        price: "",
        stock: "",
        img: null, // обнуляем поле изображения
      });
      setFormDataProductCategory({
        name_category: "",
        category_id: "",
      });
  
      alert("Продукт успешно создан!");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };
  const handleSubmitImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("img", imageData.selectedFile);
      formData.append("product_name", imageData.product_name);

      
      const responseImg = await Axios.post(
        `/api/picture/upload/`,
        formData
      );
      console.log("Ответ от сервера:", responseImg.data);

      if(responseImg.data)
      {
        alert(
          "Изображение для продукта " +
            imageData.product_name +
            " успешно загружено!"
        );  
      }

      setFormDataImage({
        selectedFile: null,
        product_name: "",
      });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
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
      [name]: value,
    });
  };
  const handleInputChangeProductInfoDescription = (e) => {
    const { name, value } = e.target;
    setFormDataProductInfo({
      ...prod_info,
      [name]: value,
    });
  };
  const handleInputChangeProductInfoProdId = (e) => {
    const { name, value } = e.target;
    setFormDataProductInfo({
      ...prod_info,
      [name]: value,
    });
  };

  const handleInputChangeProductSDK = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value,
    });
  };

  const handleInputChangeProductPrice = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value,
    });
  };
  const handleInputChangeProductStock = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value,
    });
  };

  const handleInputChangeProduct = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value,
    });
  };

  const handleInputChangeProductName = (e) => {
    const { name, value } = e.target;
    setFormDataProduct({
      ...product,
      [name]: value,
    });
  };

  const handleInputChangeProductCategory = (e) => {
    const { name, value } = e.target;
    setFormDataProductCategory({
      ...category_prod,
      [name]: value,
    });
  };

  const handleInputChangeBrand = (e) => {
    const { name, value } = e.target;
    setFormDataBrand({
      ...brand,
      [name]: value,
    });
  };

  const handleInputChangeCategory = (e) => {
    const { name, value } = e.target;
    setFormDataCategory({
      ...category,
      [name]: value,
    });
  };
  const handleInputChangeProductImage = (e) => {
    const file = e.target.files[0];
    setFormDataProduct({ 
      ...product,
        img: file,
     });
  };

  const handleInputChangeImage = (e) => {
    const { name, value } = e.target;
    setFormDataImage({
      ...imageData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file =  e.target.files[0];
    setFormDataImage({
      ...imageData,
      selectedFile: file,
    });
  };


  return (
    <div className="common">
      <NavBarAuth />
      <div className="Descr">Admin Board</div>
      <form onSubmit={handleSubmitBrand} className="form-creators">
        <div className="create-labels">Бренд</div>
        <input
          type="text"
          name="name"
          placeholder="Название бреда"
          value={brand.name}
          onChange={handleInputChangeBrand}
          className="input-brand-name"
        />
        <button type="submit" className="btn-sub">
          Создать
        </button>
      </form>
      <form onSubmit={handleSubmitCategory} className="form-creators">
        <div className="create-labels">Категория</div>
        <input
          type="text"
          name="name"
          placeholder="Название категории"
          value={category.name}
          onChange={handleInputChangeCategory}
          className="input-brand-name"
        />
        <button type="submit" className="btn-sub">
          Создать
        </button>
      </form>

      <form onSubmit={handleSubmitProduct} className="form-creators">
        <div className="create-labels">Создание Продукта</div>
        <input
          type="text"
          name="product_name"
          placeholder="Название"
          value={product.product_name || ""}
          onChange={handleInputChangeProductName}
          className="input-brand-name"
        />
        <input
          type="text"
          name="brand_name"
          placeholder="Бренд"
          value={product.brand_name || ""}
          onChange={handleInputChangeProduct}
          className="input-brand-name"
        />
        <input
          type="text"
          name="name_category"
          placeholder="Категория"
          value={category_prod.name_category || ""}
          onChange={handleInputChangeProductCategory}
          className="input-brand-name"
        />
        <input
          type="text"
          name="SDK"
          placeholder="SDK"
          value={product.SDK || ""}
          onChange={handleInputChangeProductSDK}
          className="input-brand-name"
        />
        <input
          type="text"
          name="price"
          placeholder="Стоимость"
          value={product.price || ""}
          onChange={handleInputChangeProductPrice}
          className="input-brand-name"
        />
        <input
          type="text"
          name="stock"
          placeholder="Кол-во в наличии"
          value={product.stock || ""}
          onChange={handleInputChangeProductStock}
          className="input-brand-name"
        />
        <input
          type="file"
          name="img"
          onChange={handleInputChangeProductImage}
          className="input-brand-name"
        />
        <button type="submit" className="btn-sub">
          Создать
        </button>
      </form>

      <form onSubmit={handleSubmitProductInfo} className="form-creators">
        <div className="create-labels">Описание товара</div>
        <input
          type="text"
          name="title"
          placeholder="Название"
          value={prod_info.title}
          onChange={handleInputChangeProductInfoTitle}
          className="input-brand-name"
        />
        <input
          type="text"
          name="description"
          placeholder="Описание"
          value={prod_info.description}
          onChange={handleInputChangeProductInfoDescription}
          className="input-brand-name"
        />

        <input
          type="text"
          name="prod_id"
          placeholder="ID Товара"
          value={prod_info.prod_id}
          onChange={handleInputChangeProductInfoProdId}
          className="input-brand-name"
        />
        <button type="submit" className="btn-sub">
          Создать
        </button>
      </form>

      <form onSubmit={handleSubmitImage} className="form-creators">
        <div className="create-labels">ID продукта</div>
        <input
          type="text"
          name="product_name"
          placeholder="Имя продукта"
          value={imageData.product_name}
          onChange={handleInputChangeImage}
          className="input-brand-name"
        />
        <div className="create-labels">Изображение продукта</div>
        <input
          type="file"
          name="img"
          onChange={handleFileChange}
          className="input-brand-name"
        />
        <button type="submit" className="btn-sub">
          Загрузить
        </button>
      </form>
    </div>
  );
}

export default TestingPage;
