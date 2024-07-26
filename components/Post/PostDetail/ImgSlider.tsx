import Image from "next/image";
import { useState } from "react";

const ImgSlider = ({ img }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = img;
  console.log("🚀 ~ ImgSlider ~ slides:", slides);
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="max-w-2xl">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Carousel wrapper */}
        <div className="relative h-[25rem] md:h-[37.5rem]">
          {totalSlides > 0 &&
            slides.map((slide: any, index: any) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === currentSlide ? "" : "hidden"
                } duration-700 ease-in-out`}
              >
                <div className="w-full h-full">
                  <Image
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
        </div>
        {/* Slider indicators */}
        <div className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2">
          {slides.map((_: any, index: any) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition ${
                index === currentSlide ? "bg-gray-400" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          onClick={prevSlide}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          onClick={nextSlide}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImgSlider;
