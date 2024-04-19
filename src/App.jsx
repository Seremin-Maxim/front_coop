import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ProfilePage from './Profile';//не работает с ош 403
import UserProfile from './UserForm';// работает
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "./App.css";
import "./HomePage.css"
import HomePage from './HomePage';
import HomePageAuth from './HomePageAuth';
import Item_plug from './Item_plug';
import DeviceItemPage from './DeviceItemPage';
import TestingPage from './testingPage';
import CategoryMenu from './CategoryMenu';
const App = () => {
  const [data, setData] = useState("");

  const getData = async()=>{
    const response = await Axios.get("http://localhost:8000/api");
    setData(response.data);
  }


  useEffect(()=>{
    getData()
  },[]);

  return (
  <Router>
    <Routes>
        <Route path="/signin" element={<LoginForm />} />
        <Route path='/testing' element={<TestingPage />}/> 
        <Route path="/signup" element={<RegistrationForm />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/home/:category_id' element={<HomePageAuth  />}/>
        <Route path='/home' element={<HomePageAuth  />}/>
        <Route path='/item' element={<Item_plug  />}/>
        <Route path='/item/:product_id' element={<DeviceItemPage  />}/>
        {/* <Route path='/home/category/:category_id' element={<HomePage  />}/> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/:category_id" element={<HomePage />} />
        <Route path='home/categories' element={<CategoryMenu  />}/>
      
    </Routes>
  </Router>
  );
}

export default App

