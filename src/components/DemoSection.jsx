import React from "react";

const DemoSection = () => {
  return (
    <div className="bg-lightgray py-20 text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">How It Works</h2>
        <div className="text-left max-w-3xl mx-auto">
          <ol className="list-decimal list-inside">
            <li className="mb-4">
              Upload an image or paste text into the input area.
            </li>
            <li className="mb-4">
              Click "Process" to extract and verify company names and emails.
            </li>
            <li>View the processed results on the same page.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
