import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import StateSection from "../components/StateSection";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <div>
      <Header />
      <WhyChooseUs />
      <StateSection />
      <Testimonials />
      <HowItWorks />
      <SpecialityMenu />
      <TopDoctors />
      <FAQ />
      <Banner />
    </div>
  );
};

export default Home;
