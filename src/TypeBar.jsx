import React, { useState, useEffect } from 'react';
import './TypeBar.css';
import { ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'; 


const TypeBar = () => {
    return (
        <ListGroup className='list'>
            <ListGroup.Item><Link to="/item">Холодильники</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/item">Телефоны</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/item">Планшеты</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/item">Ноутбуки</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/item">Комплектующие</Link></ListGroup.Item>
      </ListGroup>
    );
  };
  
  export default TypeBar;