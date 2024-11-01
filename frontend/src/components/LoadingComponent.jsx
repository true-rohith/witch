import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full ">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-t-transparent"></div>
      <span className="ml-4 text-xl text-gray-700">Loading...</span>
    </div>
  );
};

export default Loading;
