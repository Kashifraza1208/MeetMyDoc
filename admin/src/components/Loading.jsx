import React from "react";

const Loading = () => {
  return (
    <div className="flex ml-2 items-center justify-center rounded-full bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-5 h-5 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
