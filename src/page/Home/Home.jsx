// import React from 'react'
// import Banner from './components/Banner'
// import Marquees from './components/Marquees'
// import Swipers from './components/Swipers'
// import Reviews from './components/Reviews'

// export default function Home() {
//   const reviewsData = fetch('/reviews.json').then(data => data.json())

//   return (
//     <div className=''>
//       <Banner/>
//       <Marquees/>
//       <Swipers />
//       <Reviews reviewsData={reviewsData}/>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Marquees from "./components/Marquees";
import Swipers from "./components/Swipers";
import Reviews from "./components/Reviews";

const Home = () => {
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviewsData(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <Banner />
      <Marquees />
      <Swipers />
      <Reviews reviewsData={reviewsData}></Reviews>
    </div>
  );
};

export default Home;
