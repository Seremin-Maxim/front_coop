import React, { useState, useEffect } from "react";
import "./DeviceItemPage.css";

import Image from "react-bootstrap/Image";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import pic1 from "./assets/item_pic.png";
import NavBarAuth from "./navbarHpAuth";
import pic2 from "./assets/itemSL.jpeg";
import Carousel from "./CardCarousel";
import "./DeviceItem.css";

const DeviceItemPage = () => {
  const { product_id } = useParams();
  const [prod_infos, setDescription] = useState([]);
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
  const customer_id = localStorage.getItem("id");
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        console.log(product_id);
        const response = await Axios.get(
          `/api/productGetDescription/${product_id}`
        );
        setDescription(response.data);
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
    const checkDeviceInCart = async () => {
      try {
        const existingDevice = await Axios.get(
          `/api/getShoppingCartDevice/${product_id}`
        );
        setAddedToCart(existingDevice.data.product_exists);
      } catch (error) {
        console.error(
          "Ошибка при проверке наличия устройства в корзине:",
          error
        );
      }
    };

    checkDeviceInCart();
    fetchDescription();
    fetchImages();
  }, [product_id]);

  const handleSubmitToSHC = async (e) => {
    let flag = localStorage.getItem("flag_SHC");
    e.preventDefault();
    let responseSHC;
    try {
      let responseSHC_ID = await Axios.get(
        `/api/getSCHIDByCustomer/${customer_id}`
      );
      //console.log("falg: " + flag + " " + localStorage.getItem("flag_SHC"));
      if (!responseSHC_ID.data) {
        localStorage.setItem("flag_SHC", true);

        //console.log("falg1: " + localStorage.getItem("flag_SHC"));
        //console.log("ID for SHC : " + customer_id);

        responseSHC = await Axios.post(
          `/api/shoppingCart/create/${customer_id}`
        );
        console.log("SUKA");
        localStorage.setItem("sch_id", responseSHC.data.id);
      }
      localStorage.setItem("sch_id", responseSHC_ID.data.id);
      setSchID(responseSHC_ID.data.id);
      let sch_id_plug = responseSHC_ID.data.id;
      const reqToSckDevice = {
        quantity: quantity,
        product_id: product.id,
        shc_id: sch_id_plug,
        stock: product.stock,
      };
      //let existingDevice = 1;
      const existingDevice = await Axios.get(
        `/api/getShoppingCartDevice/${product_id}`
      );
      if (existingDevice.data.product_exists) {
        const responseShcDevice = await Axios.put(
          `/api/shoppingCartDevice/update/${product_id}`,
          reqToSckDevice
        );
        if (responseShcDevice.data.quantity_out_of_stock) {
          alert("Недостаточно товара на складе");
        } else {
          setAddedToCart(true); // Установите состояние в true после успешного добавления товара
        }
      } else if (!existingDevice.data.product_exist) {
        const responseShcDevice = await Axios.post(
          `/api/shoppingCartDevice/create/${product_id}`,
          reqToSckDevice
        );
        setAddedToCart(true); // Установите состояние в true после успешного добавления товара
      }
      setQuantity(1);
    } catch (error) {
      alert("Some porblems :(");
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const allImages = [
    { id: "productImage", path: product.img },
    ...productImages,
  ];

  return (
    <div>
      <NavBarAuth />
      <div className="page-wrapper">
        <h2 className="product-title">{product.product_name}</h2>
        <div className="page-container">
          <div className="page-column_product">
            <div className="page-carousel">
              <div className="carousel-page-wrapper">
                <Carousel showArrows={allImages.length > 1}>
                  {allImages.map((image) => (
                    <img
                      className="caroousel_img"
                      key={image.id}
                      src={`http://localhost:3000/${
                        image.id === "productImage" ? "static" : "images"
                      }/${image.path}`}
                      alt="product"
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          <div className="page-column_buttons">
            <div className="add-to-shc">
              <div className="product-price">Стоимость: {product.price}</div>
              {addedToCart ? (
                <Link to={"/shoppingcart"}>
                  <div className="add-button-place-sch">
                    <button className="add-button-sch">{"Добавлено"}</button>
                  </div>
                </Link>
              ) : (
                <div className="card-button-wrapper-sch">
                  <div className="counter-shc">
                    <button
                      className="counter-button-sch minus-button-sch"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : 1)
                      }
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="counter-button-sch plus-button-sch"
                      onClick={() =>
                        setQuantity(
                          quantity < product.stock ? quantity + 1 : quantity
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="button-add-bucket-sch">
                    <button
                      className="in-bucket-button-sch button"
                      onClick={handleSubmitToSHC}
                    >
                      {addedToCart ? "Добавлено" : "В корзину"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="product-sdk">SDK: {product.SDK}</div>
        <div className="product-stock">В наличии: {product.stock}</div>
        <div className="product-description">
          <div> Характеристики: </div>
          {prod_infos.map((prod_info) => (
            <div key={prod_info.id}>
              {prod_info.title}: {prod_info.description}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="product-page">
        <h2 className="product-title">{product.product_name}</h2>
        <div className="product-wrapper">
        <div className="product-details">
          <div className="carousel-page-wrapper">
            <Carousel showArrows={allImages.length > 1}>
              {allImages.map((image) => (
                <img
                  key={image.id}
                  src={`http://localhost:3000/${
                    image.id === "productImage" ? "static" : "images"
                  }/${image.path}`}
                  alt="product"
                />
              ))}
            </Carousel>
          </div>
        </div>
        
        <div className="add-to-shc">
        <div className="product-price">Стоимость: {product.price}</div>
          {addedToCart ? (
            <Link to={"/shoppingcart"}>
              <div className="add-button-place">
                <button className="add-button">{"Добавлено"}</button>
              </div>
            </Link>
          ) : (
            <div className="card-button-wrapper">
              <div className="counter-shc">
                <button
                  className="counter-button minus-button"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="counter-button plus-button"
                  onClick={() =>
                    setQuantity(
                      quantity < product.stock ? quantity + 1 : quantity
                    )
                  }
                >
                  +
                </button>
              </div>
              <div className="button-add-bucket">
                <button
                  className="in-bucket-button button"
                  onClick={handleSubmitToSHC}
                >
                  {addedToCart ? "Добавлено" : "В корзину"}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
        
        <div className="product-sdk">SDK: {product.SDK}</div>
        <div className="product-stock">В наличии: {product.stock}</div>
        <div className="product-description">
          <div> Характеристики: </div>
          {prod_infos.map((prod_info) => (
            <div key={prod_info.id}>
              {prod_info.title}: {prod_info.description}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default DeviceItemPage;
