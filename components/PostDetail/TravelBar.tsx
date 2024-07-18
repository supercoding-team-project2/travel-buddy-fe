import Image from "next/image";
import React from "react";

const translationMap: any = {
  restaurant: "/png/restaurant-pin.png",
  cafe: "/png/cafe.png",
  locality: "/png/map-pin.png",
  hotel: "/png/hotel-pin.png",
};

const translateDescription = (description: any) => {
  return translationMap[description] || description;
};

const LocationItem = ({ name, description, isLast, src }: any) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div>
          <div className="flex mb-2" style={{ marginLeft: "-20px" }}>
            <Image
              src={translateDescription(description)}
              alt={description}
              width={50}
              height={50}
            />
          </div>
        </div>
        {isLast ? (
          <div className="relative w-[9rem]  h-[3px]">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[10px] h-[10px] bg-blue-900 rounded-full"></div>
          </div>
        ) : (
          <div className="relative w-[9rem] h-[3px] bg-gray-300 dark:bg-slate-500">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[10px] h-[10px] bg-blue-900 rounded-full"></div>
          </div>
        )}
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
    <div className="flex flex-col p-4 ml-8 w-full mx-auto dark:bg-gray-800">
      {locations.map((location: any, index: number) => (
        <div key={index} className="flex flex-col mr-8 my-3">
          <div className="text-lg mb-3">{location.date}</div>
          <div className="flex ml-3">
            {location.location.map((loca: any, locIndex: number) => (
              <LocationItem
                key={locIndex}
                name={loca.name}
                description={loca.description}
                isLast={locIndex === location.location.length - 1}
                src={loca.src}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelBar;
