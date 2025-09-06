import React from "react";

const DashboardLoading = () => {
  return (
    <div className="w-full md:ml-52 md:left-52 top-14 md:w-[calc(100%-208px)]">
      <div className="md:px-14 p-5 animate-pulse">
        <div className="mb-8">
          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-72 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gray-100 shadow-sm rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-5 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
        </div>

        <div className="bg-white shadow-md rounded-2xl mt-10">
          <div className="flex items-center gap-3 p-5 border-gray-200 border-b">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
          </div>

          <div className="divide-y">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
