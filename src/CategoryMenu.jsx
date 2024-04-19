import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './CategoryMenu.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import pic1 from './assets/item_pic.png';
import { Button } from 'react-bootstrap'; // Импортируйте Button из react-bootstrap
import NavBarAuth from './navbarHpAuth';
import NavBar from './navbarHP';
const CategoryMenu = () => {
    const token = localStorage.getItem("token");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategoryData = async () => {
          try {
            const response = await Axios.get("/api/getAllCategories");
            setCategories(response.data);
            console.log(categories);
          } catch (error) {
            console.error('Ошибка при получении профиля пользователя:', error);
          }
        };
    
        fetchCategoryData();
      }, []);
      return (
        <div>
          <div>{token ? <NavBarAuth/> : <NavBar/>}</div>
          <h2 className='headName'>Каталог товаров</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <Link to={token ? `/home/${category.id}` : `/${category.id}`} key={category.id}>
            <div className="category-card" >
              <img src={pic1} alt={category.name} />
              <h2>{category.name}</h2>
            </div>
            </Link>
          ))}
        </div>
        </div>
      );
      
};

export default CategoryMenu;

// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import './CategoryMenu.css';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import NavBarAuth from './navbarHpAuth';
// import NavBar from './navbarHP';
// import pic1 from './assets/item_pic.png';
// const CategoryMenu = () => {
//     const token = localStorage.getItem("token");
//     const [categories, setCategories] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCategoryData = async () => {
//           try {
//             const response = await Axios.get("/api/getAllCategories");
//             setCategories(response.data);
//             console.log(categories);
//           } catch (error) {
//             console.error('Ошибка при получении профиля пользователя:', error);
//           }
//         };
    
//         fetchCategoryData();
//       }, []);

//       return (
//         <div>
//           <div>{token ? <NavBarAuth/> : <NavBar/>}</div>
//           <div className="category-grid">
//             {categories.map((category) => (
//               <Link to={token ? `/home/${category.id}` : `/${category.id}`} key={category.id}>
//                 <div className="category-card">
//                   <img src={pic1} alt={category.name} />
//                   <h2>{category.name}</h2>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       );
// };

// export default CategoryMenu;


