import React from "react";

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Key Features</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-lightgray p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Extract</h3>
              <p>Extract company names and emails from images or text.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-lightgray p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Verify</h3>
              <p>Verify emails to ensure accuracy.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-lightgray p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Store</h3>
              <p>Store results securely in MongoDB.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
