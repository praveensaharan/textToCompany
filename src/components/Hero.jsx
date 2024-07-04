import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-lightgray text-black py-20">
      <div className="container mx-auto text-center mt-40">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Our Company Info Extractor
        </h1>
        <p className="text-xl mb-8">
          Extract company names and emails from images or text, verify emails,
          and securely store them in MongoDB.
        </p>
        <button className="bg-orange text-black px-6 py-3 font-semibold rounded-full">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
