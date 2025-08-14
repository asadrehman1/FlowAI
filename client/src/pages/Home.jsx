import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AITools from "../components/AITools";
import Testimonials from "../components/Testimonials";
import PricingPlans from "../components/PricingPlans";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <AITools />
      <Testimonials />
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default Home;
