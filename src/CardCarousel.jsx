import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './CardCarousel.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import pic1 from './assets/item_pic.png';
import pic2 from './assets/category_png.jpeg';
import { Button } from 'react-bootstrap'; // Импортируйте Button из react-bootstrap
import NavBarAuth from './navbarHpAuth';
import NavBar from './navbarHP';
import { gsap } from 'gsap';
const CardCarousel = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const arrowBtns = document.querySelectorAll('.arrow-btn');
    const cardBtns = document.querySelectorAll('.card');
    let currentCard = 2;
    let dir = 1;
    moveCards();

    const applyPointerEffect = (btn, ease, shadow) => {
        btn.onpointerenter = () => gsap.to(btn, { ease, 'box-shadow': shadow });
        btn.onpointerleave = () => gsap.to(btn, { ease, 'box-shadow': '0 6px 8px #00000030' });
    };
    arrowBtns.forEach((btn, i) => {
        applyPointerEffect(btn, 'expo', '0 3px 4px #00000050');
        btn.onclick = () => {
            dir = (i == 0) ? 1 : -1;
            currentCard += (i === 0) ? -1 : 1;
            currentCard = (currentCard < 0) ? 3 : (currentCard > 3) ? 0 : currentCard; 
            moveCards(0.75);
        };
    });
    

    cardBtns.forEach((btn, i) => {
        applyPointerEffect(btn, 'power3', () => (i === currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030');
        btn.onclick = () => {
            dir = (i < currentCard) ? 1 : -1;
            currentCard = i;
            moveCards(0.75);
        };
    });

    function moveCards(dur = 0) {
        gsap.timeline({ defaults: { duration: dur, ease: 'power3', stagger: { each: -0.03 * dir } } })
            .to('.card', {
                x: -350 * currentCard,
                y: (i) => (i === currentCard) ? 0 : 15,
                height: (i) => (i === currentCard) ? 350 : 240,
                ease: 'elastic.out(0.4)'
            }, 0)
            .to('.card', {
                cursor: (i) => (i === currentCard) ? 'default' : 'pointer',
                'box-shadow': (i) => (i === currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030',
                border: (i) => (i === currentCard) ? '2px solid #26a' : '0px solid #fff',
                background: (i) => (i === currentCard) ? 'radial-gradient(100% 100% at top, #fff 0%, #fff 99%)' : 'radial-gradient(100% 100% at top, #fff 20%, #eee 175%)',
                ease: 'expo'
            }, 0)
            .to('.icon svg', {
                attr: {
                    stroke: (i) => (i === currentCard) ? 'transparent' : '#36a',
                    fill: (i) => (i === currentCard) ? '#36a' : 'transparent'
                }
            }, 0)
            .to('.arrow-btn-prev, .arrow-btn-next', {
                autoAlpha: 1
            }, 0)            
            .to('.card h4', {
                y: (i) => (i === currentCard) ? 0 : 8,
                opacity: (i) => (i === currentCard) ? 1 : 0,
            }, 0);
    }





      return (
          <div className='carousel'>
              {/* {<NavBarAuth />} */}

              <div className='cards-wrapper'>
                  <div className='cards'>
                      <button className='card card1' tabIndex="-1">
                            <img src={pic1} alt={"card1"} />
                      </button>
                      <button className='card card2' tabIndex="-1">
                            <img src={pic1} alt={"card1"} />
                      </button>
                      <button className='card card3' tabIndex="-1">
                            <img src={pic1} alt={"card1"} />
                      </button>
                      <button className='card card4' tabIndex="-1">
                            <img src={pic1} alt={"card1"} />
                      </button>
                  </div>
                  <button className="arrow-btn arrow-btn-prev" tabIndex="0"> + </button>
                  <button className="arrow-btn arrow-btn-next" tabIndex="0">
                      +
                  </button> 
              </div>


          </div>
      );
      
};

export default CardCarousel;
