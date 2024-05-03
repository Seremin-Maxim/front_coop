import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './ShoppingCartPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import pic1 from './assets/item_pic.png';
import pic2 from './assets/product_pic_shc.jpeg';
import { Button } from 'react-bootstrap'; // Импортируйте Button из react-bootstrap
import NavBarAuth from './navbarHpAuth';
import NavBar from './navbarHP';

const ShoppingCartPage = () => {
    const token = localStorage.getItem("token");
    const [products, setProducts] = useState([]);
    const [product_ids, setProductIDs] = useState([]);
    const navigate = useNavigate();
    const shc_id = localStorage.getItem("sch_id");
    //console.log("shc_id = " + shc_id);

    const increaseQuantity = (id) => {
        setProductIDs(product_ids.map(item => item.product_id === id && item.quantity < products.find(product => product.id === id).stock ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (id) => {
        setProductIDs(product_ids.map(item => item.product_id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const totalCost = products.reduce((acc, product) => acc + product.price * (product_ids.find(item => item.product_id === product.id)?.quantity || 0), 0);


    const deleteDevice = async (id) => {
        try {
            const response = await Axios.delete(`/api/deleteShCDevice/${id}`);
            console.log(response.data);
            setProductIDs(product_ids.filter(item => item.product_id !== id));
            setProducts(products.filter(product => product.id !== id)); // Добавьте эту строку
        } catch (error) {
            console.error('Ошибка при удалении устройства:', error);
        }
    };


    useEffect(() => {
        if (!token || token === undefined) {
            navigate('/', { replace: true });
        }
        const fetchSHKData = async () => {
            try {
                const responseIDs = await Axios.get(`/api/getAllShCDevicesByID/${shc_id}`);
                setProductIDs(responseIDs.data);
                console.log(product_ids);
            } catch (error) {
                console.error('Ошибка при получении товаров в корзине:', error);
            }
        };

        fetchSHKData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await Promise.all(
                    product_ids.map((id) =>
                        Axios.get(`/api/getProductById/${id.product_id}`) // Предполагается, что у вас есть такой API
                    )
                );
                setProducts(fetchedProducts.map((response) => response.data));

            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        if (product_ids.length > 0) {
            fetchProducts();
        }
    }, [product_ids]);
    //console.table(products);
    return (
        <div>
            <div>{<NavBarAuth />}</div>
            <div className='wrapper'>
                <h2 className=''>Корзина</h2>
                <div className='filter-wrapper'>
                    <div className='filter'><button>Фильтр</button></div>
                </div>
                {products.map((product) => (
                    <div key={product.id}>
                        <div className="product-list">
                            <div className='shc-link'>
                                <a href={`/item/${product.id}`}>
                                    <img className="product-image" src={`http://localhost:3000/static/${product.img}`} alt={product.product_name} />
                                </a>
                            </div>
                            <div className="product-name">{product.product_name}</div>
                            <div className='quantity'>
                                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                <span>{product_ids.find(item => item.product_id === product.id)?.quantity || 0}</span>
                                <button onClick={() => increaseQuantity(product.id)}>+</button>
                            </div>
                            <div className="product-price">{product.price}руб.</div>
                            <div className='clearDevice'><button onClick={() => deleteDevice(product.id)}>x</button></div>
                        </div>
                    </div>
                ))}
                <div className='finalcost-wrapper'>
                    <div className='finalcost'>
                        <div className='finalcost-child'>
                            <div className='finalcost-child-element'>
                                <span className='final-cost-text'>Итого: </span>
                                <span className='final-cost-sum'>{totalCost} руб.</span>
                            </div>
                            <div className='finalcost-child-element'>
                                <Link 
                                    to={{pathname: "/order"}}
                                    state={{ products: products, product_ids: product_ids }}
                                >
                                    <button onClick={() => console.log("products", products)}>Оформить заказ</button>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;
