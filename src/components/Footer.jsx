import React from "react";
import ConditionalComponent from "./Response";

const ParentComponent = () => {
  const dataWithUrl = {
    url: "https://praveen-private.s3.ap-south-1.amazonaws.com/uploads/user/image-1719767983344.png",
    results: [
      {
        company_name: "SwiffyLabs",
        email: "rohit.vatsyayan@swiffylabs.com",
        email_verify: true,
      },
    ],
  };

  const dataWithoutUrl = {
    results: [
      {
        company_name: "'OrbitShift.AI'",
        email: "Swadha@orbitshift.ai",
        email_verify: false,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <ConditionalComponent
        url={dataWithUrl.url}
        results={dataWithUrl.results}
      />
      <ConditionalComponent url={null} results={dataWithoutUrl.results} />
    </div>
  );
};

export default ParentComponent;
