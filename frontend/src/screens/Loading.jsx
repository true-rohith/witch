import React, { useState, useEffect } from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <h2 className="text-gray-700 font-semibold">
          Please wait a while, we are processing !!!
        </h2>
      </div>
    </div>
  );
};

export default LoadingPage;
