import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Hero from "./Hero";
import DemoSection from "./DemoSection";
import FeaturesSection from "./FeatureSection";

const Homepage = () => {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <DemoSection />
    </>
  );
};

export default Homepage;
