import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './OrderPage.css';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import NavBarAuth from './navbarHpAuth';

const OrderPage = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [product_ids, setProductIDs] = useState([]);

    useEffect(() => {
        console.log("location.state", location);
        if (location.state) {
            setProducts(location.state.products);
            setProductIDs(location.state.product_ids);
        }
    }, [location.state]);

    console.log("Array:" + products);
    //console.table(products);
    return (
        <div>
            <div>{<NavBarAuth />}</div>
            <div className='order-wrapper'>
                <h2>Оформление заказа</h2>
                <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <div className="product-list">
                            <div className="product-price">{product.price}руб.</div>
                        </div>
                    </div>
                ))}
                </div>

            </div>
        </div>
    );
};

export default OrderPage;
