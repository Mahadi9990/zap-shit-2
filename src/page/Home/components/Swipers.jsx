import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import { Autoplay } from "swiper/modules";

export default function Swipers() {
  const brandsLogo = [
    amazon,
    casio,
    moonstar,
    randstad,
    star,
    start_people,
    amazon_vector,
  ];
  return (
    <div >
      <>
        <Swiper
          loop={true}
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={10}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper max-w-[1200px] mx-auto"
        >
          {brandsLogo.map((items, index) => (
            <SwiperSlide>
              <img key={index} src={items} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
}
