import React from "react";
import SingleReviewCard from "./SingleReviewCard";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Reviews = ({ reviewsData }) => {
  return (
    <div>
      <Swiper
        loop={true}
        effect={"coverflow"}
        slidesPerView={3}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale:0.8,
          slideShadows: true,
        }}
        autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
        pagination={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper max-w-[1000px] mx-auto my-4"
      >
        {reviewsData.map((item) => (
          <SwiperSlide key={item.id}>
            <SingleReviewCard reviewsData={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
