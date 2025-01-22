"use client";

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlideProps {
  imageUrl: string;
  alt: string;
}

const Slide: React.FC<SlideProps> = ({ imageUrl, alt }) => (
  <div className="h-58 w-full">
    <img 
      src={imageUrl} 
      alt={alt} 
      className="w-full h-full object-cover rounded-xl"
    />
  </div>
);

const Slideshow: React.FC = () => {
  const settings: import("react-slick").Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    
  };

  const slides: SlideProps[] = [
    
    { imageUrl: "/slideimg/ZOOKcanner.png", alt: "Image 2 description" },
    { imageUrl: "/slideimg/TrailblazerZk.png", alt: "Image 2 description" },

   
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-2 rounded-xl">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Slide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;