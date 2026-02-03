import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import bannser1 from '../../../assets/banner/banner1.png';
import bannser2 from '../../../assets/banner/banner2.png';
import bannser3 from '../../../assets/banner/banner3.png';

export default function Banner() {
  return (
    <div>
      <Carousel infiniteLoop={true}
      autoPlay={true}
      transitionTime='1000'
      interval='3000'>
        <div>
          <img src={bannser1} />
         <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={bannser2} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={bannser3} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
}
