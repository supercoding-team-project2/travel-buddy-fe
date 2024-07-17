import React from "react";

const LocationItem = ({ name, description }: any) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-800 dark:text-slate-200"
            >
              <path d="M12 5v14"></path>
              <path d="M18 13l-6 6"></path>
              <path d="M6 13l6 6"></path>
            </svg>
          </div>
        </div>
        <div className="w-[5rem] h-1 bg-gray-300 dark:bg-slate-500"></div>
      </div>
      <div className="pt-1 pb-8">
        <p className="text-base font-bold text-gray-900 dark:text-slate-300">
          {name}
        </p>
        <p className="text-sm text-gray-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
};

const TravelBar = ({ locations }: any) => {
  return (
    <div className="flex p-4 w-full mx-auto dark:bg-gray-800">
      {locations.map((location: any, index: any) => (
        <LocationItem
          key={index}
          name={location.name}
          description={location.description}
        />
      ))}
    </div>
  );
};

export default TravelBar;
