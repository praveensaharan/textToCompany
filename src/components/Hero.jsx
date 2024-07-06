import React from "react";
import "./HeroSection.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const HeroSection = () => {
  const generateRandomAnimation = () => {
    const animationDuration = `${Math.random() * 5 + 30}s`;
    const animationDelay = `${Math.random()}s`;
    const translateX = `${Math.random() * 800 + 800}px`;
    const translateY = `${Math.random() * 1600 + 1900}px`;
    const rotate = `${Math.random() * 360}deg`;

    return {
      "--float-translate-x": translateX,
      "--float-translate-y": translateY,
      "--float-rotate": rotate,
      animationDuration,
      animationDelay,
    };
  };

  return (
    <div className="relative bg-lightgray text-black py-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-4">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-float z-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              ...generateRandomAnimation(),
            }}
          >
            {index % 2 === 0 ? (
              <div className="bg-red-50 rounded-full px-2 py-1 text-xs font-semibold text-gray-400">
                Company Name
              </div>
            ) : (
              <div className="bg-blue-50 rounded-full px-2 py-1 text-xs font-semibold text-gray-400">
                email@example.com
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto text-center mt-40 relative z-9">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Our Company Info Extractor
        </h1>
        <p className="text-xl mb-8">
          Extract company names and emails from images or text, verify emails,
          and securely store them in MongoDB.
        </p>

        <SignedOut>
          <SignInButton
            mode="modal"
            className="bg-orange text-black px-6 py-3 font-semibold rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default HeroSection;
