import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './OrderPage.css';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import NavBarAuth from './navbarHpAuth';

const OrderPage = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const customer_id = localStorage.getItem("id");
    const shc_id = localStorage.getItem("sch_id");
    const location = useLocation();
    // const [products, setProducts] = useState([]);
    // const [product_ids, setProductIDs] = useState([]);
    const [shc_devices, setShcDevices] = useState([]);
    const [products_to_order, setProductsToOrder] = useState([]);
    const totalCost = products_to_order.reduce((acc, product) => acc + product.price * (shc_devices.find(item => item.product_id === product.id)?.quantity || 0), 0);
    const [order, setOrder] = useState({
        address: '',
        city: '',
        country: '',
        zip_code: '',
        method: '',
        customer_id: customer_id,
        date: new Date().toISOString().split('T')[0],
        state: 'заказ создан'
    });
    console.table(order);
    const handleInputChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(order);

        // Создание заказа
        try {
            const responseOrder = await Axios.post('/api/order/create', order);
            const order_id = responseOrder.data.id; 

            // Создание элементов заказа для каждого устройства
            for (let device of shc_devices) {
                const requestData = {
                    product_id: device.product_id,
                    quantity: device.quantity,
                    order_id: order_id
                };
                await Axios.post(`/api/createOrderItem/${device.product_id}`, requestData);
            }
            const responseClear = await Axios.delete(`/api/clearShoppingCart/${shc_id}`);
            navigate('/profile', { replace: true });
            console.log('Заказ успешно создан!');
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
        }
    };


    useEffect(() => {
        if (!token || token === undefined) {
            navigate('/', { replace: true });
        }
        const fetchSHKData = async () => {
            try {
                const responseSHC_D = await Axios.get(`/api/getAllShCDevicesByID/${shc_id}`);
                setShcDevices(responseSHC_D.data);
                console.log(responseSHC_D.data);
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
                    shc_devices.map((id) =>
                        Axios.get(`/api/getProductById/${id.product_id}`)
                    )
                );
                setProductsToOrder(fetchedProducts.map((response) => response.data));

            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        if (shc_devices.length > 0) {
            fetchProducts();
        }
    }, [shc_devices]);

    // useEffect(() => {
    //     console.log("location.state", location);
    //     if (location.state) {
    //         setProducts(location.state.products);
    //         setProductIDs(location.state.product_ids);
    //     }
    // }, [location.state]);

    console.table(products_to_order);
    return (
        <div>
            <div>{<NavBarAuth />}</div>

            <div className='product-wrapper'>
            <div><h2>Оформление заказа</h2></div>
            <div className='filter-order-wrapper'>
                    <div className='filter-order'>Товары</div>
                </div>
                {products_to_order.map((product) => (
                    <div key={product.id}>
                        <div className="order-list">
                            <div className='shc-link-order'>
                                <a href={`/item/${product.id}`}>
                                    <img className="product-image-order" src={`http://localhost:3000/static/${product.img}`} alt={product.product_name} />
                                </a>
                            </div>
                            <div className="product-name-order">{product.product_name}</div>
                            <div className='quantity-order'>
                                <span>{shc_devices.find(item => item.product_id === product.id)?.quantity || 0}</span>
                            </div>
                            <div className="product-price-order">{product.price}руб.</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='finalcost-wrapper-order'>
                <div className='finalcost-order'>
                    <div className='finalcost-child-order'>
                        <div className='finalcost-child-element-order'>
                            <span className='final-cost-text-order'>Итого: </span>
                            <span className='final-cost-sum-order'>{totalCost} руб.</span>
                        </div>
                        <div className='finalcost-child-element-order'>

                        </div>
                    </div>

                </div>
            </div>
            <div className='order-wrapper'>
                <form onSubmit={handleSubmit} className="order-form">
                    <input type="text" name="address" placeholder="Адрес" onChange={handleInputChange} required className="order-input" />
                    <input type="text" name="city" placeholder="Город" onChange={handleInputChange} required className="order-input" />
                    <input type="text" name="country" placeholder="Страна" onChange={handleInputChange} required className="order-input" />
                    <input type="text" name="zip_code" placeholder="Почтовый индекс" onChange={handleInputChange} required className="order-input" />
                    <select name="method" onChange={handleInputChange} required className="order-input">
                        <option value="">Выберите метод оплаты</option>
                        <option value="Оплата наличными">Оплата наличными</option>
                        <option value="Visa/Mastercard/МИР">Visa/Mastercard/МИР</option>
                    </select>
                    <button type="submit" className="order-button">Создать заказ</button>
                </form>
            </div>
        </div>
    );
};

export default OrderPage;
