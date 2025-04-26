import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gradient-to-b from-purple-100 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-purple-200 text-black font-semibold text-xs sm:text-sm mb-4 sm:mb-8 animate-[scaleFadeIn_1.2s_ease-out_forwards]">
            Your Go-To Job Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            <span className="block animate-[fadeInSlideUp_1s_ease-out_forwards]">
              Explore, Apply &
            </span>
            <span className="block animate-[fadeInSlideUp_1s_ease-out_forwards] [animation-delay:0.3s]">
              Earn While
            </span>
            <span className="text-yellow-500 inline-block relative animate-[fadeInSlideUp_1s_ease-out_forwards] [animation-delay:0.6s]">
              You Learn
              <svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,11 C150,0 150,0 300,11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Find flexible jobs that fit your schedule and skills. Start your
            journey to success today.
          </p>

          {/* Search Bar */}
          <div className="flex max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4 bg-white rounded-full shadow-lg border border-yellow-400 items-center gap-2 sm:gap-4 overflow-hidden">
            <input
              type="text"
              placeholder="Find Your First Job"
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-transparent outline-none border-none text-base sm:text-lg min-w-0"
            />
            <Button
              onClick={searchJobHandler}
              className="flex items-center gap-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 py-2 px-6 text-sm sm:text-base text-white font-semibold shadow-none"
              type="button"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Search</span>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  10K+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  5K+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Job Listings</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  95%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  50+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Companies</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4">
            <div className="p-4 sm:p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Active Community
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Join thousands of students and professionals in our growing
                community.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Flexible Jobs
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Work on your own schedule with our flexible job opportunities.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Career Growth
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Build your career with opportunities for learning and
                advancement.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 sm:p-8 text-white max-w-3xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-purple-100 text-sm sm:text-base">
                  Create your profile and get matched with the perfect
                  opportunities
                </p>
              </div>
              <Button
                className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
                onClick={() =>
                  (window.location.href =
                    "https://thekarm.onrender.com/profile")
                }
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

// will implement this code

// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const searchJobHandler = () => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <div className="bg-gradient-to-b from-purple-100 to-white py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto text-center">
//         <span className="inline-block px-4 py-2 rounded-full bg-purple-200 text-purple-800 font-semibold text-sm mb-8 animate-pulse">
//           Your Go-To Job Marketplace
//         </span>
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
//           Explore, Apply & <br className="hidden sm:inline" /> Earn While{" "}
//           <span className="text-purple-600 inline-block relative">
//             You Learn
//             <svg
//               className="absolute bottom-0 left-0 w-full"
//               viewBox="0 0 300 12"
//               preserveAspectRatio="none"
//             >
//               <path
//                 d="M0,11 C150,0 150,0 300,11"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="3"
//               />
//             </svg>
//           </span>
//         </h1>
//         <p className="text-xl text-gray-600 mb-12">
//           Find flexible jobs that fit your schedule and skills.
//         </p>
//         <div className="relative max-w-2xl mx-auto">
//           <input
//             type="text"
//             placeholder="Find Your First Job"
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-full py-4 px-6 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg"
//           />
//           <Button
//             onClick={searchJobHandler}
//             className="absolute right-2 top-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 py-2 px-6"
//           >
//             <Search className="h-6 w-6 mr-2" />
//             <span>Search</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

//the original one

// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const searchJobHandler = () => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <div className="text-center">
//       <div className="flex flex-col gap-5 my-10">
//         <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[rgba(22,27,96,0.91)] font-medium">
//         Your Go-To Job Marketplace
//         </span>
//         <h1 className="text-5xl font-bold">
//         Explore, Apply & <br /> Earn While{" "}
//           <span className="text-[#6A38C2]"> You Learn</span>
//         </h1>
//         <p>
//         Find flexible jobs that fit your schedule and skills.
//         </p>
//         <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
//           <input
//             type="text"
//             placeholder="Find Your First Job"
//             onChange={(e) => setQuery(e.target.value)}
//             className="outline-none border-none w-full"
//           />
//           <Button
//             onClick={searchJobHandler}
//             className="rounded-r-full bg-[#6A38C2]"
//           >
//             <Search className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
