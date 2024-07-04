import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCheckCircle,
  faDatabase,
  faEdit,
  faTrash,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Key Features</h2>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-col w-full lg:w-1/4 p-4">
            <div className="feature-card flex flex-col justify-between bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full">
              <FontAwesomeIcon
                icon={faSearch}
                size="3x"
                className="text-orange mx-auto mb-4"
              />

              <h3 className="text-2xl font-semibold mb-2">Extract</h3>

              <p className="text-sm">
                Extract company names and emails from images or text.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-1/4 p-4">
            <div className="feature-card flex flex-col justify-between bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full">
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="3x"
                className="text-orange mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Verify</h3>
              <p className="text-sm">Verify emails to ensure accuracy.</p>
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-1/4 p-4">
            <div className="feature-card flex flex-col justify-between bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full">
              <FontAwesomeIcon
                icon={faDatabase}
                size="3x"
                className="text-orange mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Store</h3>
              <p className="text-sm">Store results securely in MongoDB.</p>
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-1/4 p-4">
            <div className="feature-card flex flex-col justify-between bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full">
              <FontAwesomeIcon
                icon={faEdit}
                size="3x"
                className="text-orange mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Edit</h3>
              <p className="text-sm">Edit data stored in MongoDB.</p>
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-1/4 p-4">
            <div className="feature-card flex flex-col justify-between bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full">
              <FontAwesomeIcon
                icon={faTrash}
                size="3x"
                className="text-orange mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Delete</h3>
              <p className="text-sm">Delete data stored in MongoDB.</p>
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-1/4 p-4">
            <div className="feature-card flex flex-col justify-between bg-lightgray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full">
              <FontAwesomeIcon
                icon={faExchangeAlt}
                size="3x"
                className="text-orange mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Move</h3>
              <p className="text-sm">Move data from MongoDB to SQL database.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
