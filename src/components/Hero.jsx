import React from "react";
import "./HeroSection.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const companies = [
  { company_name: "Microsoft Corporation", email: "john.doe@microsoft.com" },
  { company_name: "Apple Inc.", email: "jane.smith@apple.com" },
  { company_name: "Google LLC", email: "michael.brown@google.com" },
  { company_name: "Amazon Web Services", email: "linda.jones@amazonaws.com" },
  { company_name: "IBM Corporation", email: "david.wilson@ibm.com" },
  { company_name: "Oracle Corporation", email: "susan.moore@oracle.com" },
  { company_name: "Salesforce Inc.", email: "robert.taylor@salesforce.com" },
  { company_name: "SAP SE", email: "patricia.anderson@sap.com" },
  { company_name: "Adobe Inc.", email: "james.thomas@adobe.com" },
  { company_name: "Intel Corporation", email: "barbara.jackson@intel.com" },
  { company_name: "Cisco Systems, Inc.", email: "charles.white@cisco.com" },
  { company_name: "NVIDIA Corporation", email: "margaret.harris@nvidia.com" },
  { company_name: "Facebook, Inc.", email: "richard.martin@facebook.com" },
  { company_name: "Tesla, Inc.", email: "mary.thompson@tesla.com" },
  {
    company_name: "Spotify Technology S.A.",
    email: "joseph.garcia@spotify.com",
  },
  { company_name: "Snap Inc.", email: "sarah.martinez@snap.com" },
  { company_name: "Dropbox, Inc.", email: "william.robinson@dropbox.com" },
  { company_name: "Slack Technologies, Inc.", email: "karen.clark@slack.com" },
  { company_name: "Twitter, Inc.", email: "daniel.rodriguez@twitter.com" },
  {
    company_name: "Atlassian Corporation Plc",
    email: "nancy.lewis@atlassian.com",
  },
];
const HeroSection = () => {
  const generateRandomAnimation = () => {
    const animationDuration = `${Math.random() * 5 + 8}s`;
    const animationDelay = `${Math.random()}s`;
    const translateX = `${Math.random() * 200 + 150}px`;
    const translateY = `${Math.random() * 600 + 300}px`;
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
        {companies.map((company, index) => (
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
                {company.company_name}
              </div>
            ) : (
              <div className="bg-blue-50 rounded-full px-2 py-1 text-xs font-semibold text-gray-400">
                {company.email}
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
            redirectUrl="/result"
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
