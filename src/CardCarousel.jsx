import React, { useState, useEffect } from "react";
import "./CardCarousel.scss"; //will be added later

const Carousel = ({ children, showArrows }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex === length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {showArrows && (
          <button onClick={prev} className="left-arrow">
            &lt;
          </button>
        )}
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {showArrows && (
          <button onClick={next} className="right-arrow">
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
