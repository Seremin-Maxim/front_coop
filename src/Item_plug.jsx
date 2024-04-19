import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'; 


const Item_plug = () => {
    return (
        <div>
            <Link to='/home'>
                <button style={{position:'absolute', top:0, left:0, margin:15}}>Назад</button>
            </Link>
            <h1>See it soon!</h1>
        </div>
        
    );
  };
  
  export default Item_plug;