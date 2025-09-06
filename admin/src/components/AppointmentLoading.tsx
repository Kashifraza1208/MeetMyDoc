const AppointmentLoading = () => {
  return (
    <div className="w-full md:ml-52 md:left-52 md:w-[calc(100%-208px)]">
      <div className="w-full md:px-14 p-5 animate-pulse">
        {/* Header Skeleton */}
        <div className="md:flex-row flex-col flex items-center justify-between mb-3 gap-4">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-10 w-72 bg-gray-200 rounded"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded border-gray-200 border text-sm min-h-[60vh]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b"
            >
              <div className="h-4 w-4 bg-gray-200 rounded max-sm:hidden"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-10 bg-gray-200 rounded max-sm:hidden"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentLoading;
