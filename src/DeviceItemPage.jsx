import React, { useState, useEffect } from "react";
import "./DeviceItemPage.css";
import Image from "react-bootstrap/Image";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import pic1 from "./assets/item_pic.png";
import NavBarAuth from "./navbarHpAuth";
import pic2 from "./assets/itemSL.jpeg";
import Carousel from "./CardCarousel";
const DeviceItemPage = () => {
  const { product_id } = useParams();
  const [prod_info, setDescription] = useState({
    title: "",
    description: "",
  });
  const [product, setProduct] = useState({
    id: "",
    SDK: "",
    brand_id: "",
    category_id: "",
    id: "",
    price: "",
    stock: "",
    product_name: "",
  });
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        console.log(product_id);
        //const response = await Axios.get(`/api/productGetDescription/${product_id}`);
        //setDescription(response.data);
        const responce_prod = await Axios.get(
          `/api/getProductById/${product_id}`
        );
        console.log(responce_prod);
        setProduct(responce_prod.data);
      } catch (error) {
        console.error("Ошибка при получении описания товара:", error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await Axios.get(`/api/getAllImages/${product_id}`);
        setProductImages(response.data);
      } catch (error) {
        console.error("Ошибка при получении изображений продукта:", error);
      }
    };

    fetchDescription();
    fetchImages();
  }, [product_id]);
  console.log("PICTURES", productImages);

  return (
    <div>
      <NavBarAuth />
      <div className="product-page">
        <div className="product-details">
          <h2 className="product-title">{product.product_name}</h2>
          <div className="carousel-page-wrapper">
            <Carousel>
              {productImages.map((image) => (
                <img
                  key={image.id}
                  src={`http://localhost:3000/images/${image.path}`}
                  alt="product"
                />
              ))}
            </Carousel>
          </div>

          {/* uuid */}
          <div className="product-price">Стоимость: {product.price}</div>
          <div className="product-sdk">SDK: {product.SDK}</div>
          <div className="product-stock">В наличии: {product.stock}</div>
          <div className="product-description">
            Описание: {prod_info.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceItemPage;
