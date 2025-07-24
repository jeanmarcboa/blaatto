import React from "react";
import Hero from "./Hero";
import Merchants from "./Merchants";
import Partner from "./Partners";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";

const Home = () => {
  return (
    <main>
      <Hero />
      {/* <Categories /> */}
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <CounDown />
      {/* <Testimonials /> */}
      <Merchants />
      <Partner />
      <Newsletter />
    </main>
  );
};

export default Home;
