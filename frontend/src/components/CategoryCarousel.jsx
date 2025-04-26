import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "FullStack Developer",
  "UX/UI Designer",
  "Data Analyst",
  "DevOps Engineer",
  "Product Manager",
  "UI Designer",
  "Data Engineer",
  "Cloud Architect",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="py-12 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Inline CSS for Animation and Styling */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
          .hover-effect {
            transition: all 0.4s ease;
          }
          .hover-effect:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(128, 90, 213, 0.3); /* Purple-ish shadow */
            background: linear-gradient(135deg, #ede9fe, #f3e8ff); /* Soft purple gradient */
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          <span className="text-purple-600">Popular</span> Categories
        </h2>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 animate-scroll">
            {category.map((cat, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="p-1">
                  <Button
                    onClick={() => searchJobHandler(cat)}
                    variant="outline"
                    className="w-full h-28 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 flex flex-col items-center justify-center gap-1 group text-center break-words leading-tight hover-effect"
                  >
                    <span className="text-sm sm:text-base md:text-lg font-semibold group-hover:text-purple-600 transition-colors">
                      {cat}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 group-hover:text-purple-500 transition-colors">
                      {Math.floor(Math.random() * 100) + 50} jobs
                    </span>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;














// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { Button } from "./ui/button";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSearchedQuery } from "@/redux/jobSlice";

// const category = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Data Science",
//   "Graphic Designer",
//   "FullStack Developer",
//   "UX/UI Designer",
//   "Data Analyst",
//   "DevOps Engineer",
//   "Product Manager",
//   "UI Designer",
//   "Data Engineer",
//   "Cloud Architect",
// ];

// const CategoryCarousel = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchJobHandler = (query) => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <div className="py-12 bg-gradient-to-b from-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           <span className="text-purple-600">Popular</span> Categories
//         </h2>
//         <Carousel 
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//           className="w-full"
//         >
//           <CarouselContent className="-ml-2 md:-ml-4">
//             {category.map((cat, index) => (
//               <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
//                 <div className="p-1">
//                   <Button
//                     onClick={() => searchJobHandler(cat)}
//                     variant="outline"
//                     className="w-full h-24 rounded-xl border-2 border-purple-200 hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
//                   >
//                     <span className="text-lg font-medium group-hover:text-purple-600 transition-colors">
//                       {cat}
//                     </span>
//                     <span className="text-sm text-gray-500 group-hover:text-purple-500 transition-colors">
//                       {Math.floor(Math.random() * 100) + 50} jobs
//                     </span>
//                   </Button>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <div className="flex items-center justify-center gap-4 mt-8">
//             <CarouselPrevious className="static translate-y-0" />
//             <CarouselNext className="static translate-y-0" />
//           </div>
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

//original account

// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { Button } from "./ui/button";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSearchedQuery } from "@/redux/jobSlice";

// const category = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Data Science",
//   "Graphic Designer",
//   "FullStack Developer",
//   "UX/UI Designer",
//   "Data Analyst",
//   "DevOps Engineer",
//   "Product Manager",
//   "UI Designer",
//   "Data Engineer",
//   "Cloud Architect",
// ];

// const CategoryCarousel = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchJobHandler = (query) => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <div>
//       <Carousel className="w-full max-w-xl mx-auto my-20">
//         <CarouselContent>
//           {category.map((cat, index) => (
//             <CarouselItem className="md:basis-1/2 lg-basis-1/3">
//               <Button
//                 onClick={() => searchJobHandler(cat)}
//                 variant="outline"
//                 className="rounded-full"
//               >
//                 {cat}
//               </Button>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };

// export default CategoryCarousel;