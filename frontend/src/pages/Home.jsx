import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import FeaturedSection from "../components/Featured";
import FlyboyBanner from "../components/FlyboyBanner";
import FeaturedMeals from "../components/FeaturedMeals";
import AboutUs from "../components/AboutUs";
import TrainingPrograms from "../components/TrainingPrograms";
import NigerianHeritage from "../components/NigerianHeritage";
import LocalIngredients from "../components/LocalIngredients";
import WholesaleProgram from "../components/WholesaleProgram";
import Workshops from "../components/Workshops";
import Testimonials from "../components/Testimonials";
import Sustainability from "../components/Sustainability";
import Contact from "../components/Contact";
import Chatbot from "../components/Chatbot";
import DeliveryInfo from "../components/DeliveryInfo";

const Home = () => {
  return (
    <div className="bg-white">
      <Chatbot />
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Testimonials />
      <DeliveryInfo />
      <AboutUs />
      <TrainingPrograms />
      <NigerianHeritage />
      {/* <LocalIngredients /> */}
      <WholesaleProgram />
      <Workshops />
      {/* <Sustainability /> */}
      <OurPolicy />
      <Contact />
      <NewsletterBox />
    </div>
  );
};

export default Home;
