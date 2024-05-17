import React, { useState, useEffect } from "react";
import "./DevList.css";
import { ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import DeviceItem from "./DeviceItem";
import Carousel from "./CardCarousel";
import pic1 from "./assets/item_pic.png";
import pic2 from "./assets/itemSL.jpeg";
import sale from "./assets/sale.jpeg";
import sale2 from "./assets/sale2.jpeg";
import sale3 from "./assets/sale3.jpeg";
const DeviceList = (/*{ category_id }*/) => {
  const { category_id } = useParams();
  const { brand_id } = useParams();
  const [devices, setDevices] = useState([]);
  const location = useLocation();
  const path = location.pathname;
  localStorage.setItem("flag_SHC", false);
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
        if (isNaN(category_id) && isNaN(brand_id)) {
          // check if num
          console.log("no params");
          response = await axios.get("api/productGetAll");
        } else {
          if (path.includes("/brands")) {
            console.log("brand!");
            response = await axios.get(`/api/getProductsByBrand/${brand_id}`);
          }
          if (path.includes("/categories")) {
            console.log("category!");
            response = await axios.get(
              `/api/getProductsByCategory/${category_id}`
            );
          }
        }
        setDevices(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных продукта:", error);
      }
    };

    fetchDevices();
  }, [category_id]);

  return (
    <>
      {path == "/" && (
        <div className='carousel-grid-wrapper'>
          <Carousel showArrows={true}>
            <img src={sale2} alt="placeholder" />
            <img src={sale3} alt="placeholder" />
            <img src={sale} alt="placeholder" />
          </Carousel>
        </div>
      )}
      <div className="devlist__items">
        {devices.map((device) => (
          <DeviceItem key={device.id} product={device} />
        ))}
      </div>
    </>
  );
  
};

export default DeviceList;
