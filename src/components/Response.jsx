import React from "react";

const ConditionalComponent = ({ url, results }) => {
  const hasUrl = !!url; // Check if url prop is present

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
      <div className="md:flex">
        {!hasUrl ? (
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {results[0].company_name}
            </div>
            <p className="mt-2 text-gray-600">{results[0].email}</p>
            {results[0].email_verify ? (
              <p className="mt-2 text-green-500">Email verified</p>
            ) : (
              <p className="mt-2 text-red-500">Email not verified</p>
            )}
          </div>
        ) : (
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={url}
              alt="Company Logo"
            />
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {results[0].company_name}
              </div>
              <p className="mt-2 text-gray-600">{results[0].email}</p>
              {results[0].email_verify ? (
                <p className="mt-2 text-green-500">Email verified</p>
              ) : (
                <p className="mt-2 text-red-500">Email not verified</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConditionalComponent;
