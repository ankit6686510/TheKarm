import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BriefcaseBusiness, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

/**
 * Jobs Component
 * Displays a grid of job listings with filtering capabilities
 */
const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  // Filter jobs based on search query
  useEffect(() => {
    if (allJobs.length) {
      // Ensure searchedQuery is a string before using toLowerCase
      const query = typeof searchedQuery === 'string' ? searchedQuery.toLowerCase() : '';
      
      if (query) {
        const filteredJobs = allJobs.filter((job) => {
          return (
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query)
          );
        });
        setFilterJobs(filteredJobs);
      } else {
        setFilterJobs(allJobs);
      }
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10 backdrop-blur-sm">
              <BriefcaseBusiness className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Your Perfect Job</h1>
            <p className="text-lg text-purple-100 max-w-2xl">
              Browse through our curated list of opportunities from top companies
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-md mt-8 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="search"
                placeholder="Search for job titles, companies, or locations..."
                className="w-full pl-10 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-purple-200 focus:ring-purple-500 focus:border-purple-500 rounded-full"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Job Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="md:w-1/4">
            <FilterCard />
          </div>
          
          {/* Job listings */}
          <div className="md:flex-1 h-[88vh] overflow-y-auto pb-5">
            {/* Results counter */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filterJobs.length === 0 ? "No jobs found" : `Showing ${filterJobs.length} job${filterJobs.length === 1 ? '' : 's'}`}
              </h2>
              <p className="text-sm text-gray-500">Based on your search criteria</p>
            </div>
            
            {filterJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <SearchIcon className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="text-gray-500 mt-2 text-center">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;











// import React, { useEffect, useState } from "react";
// import Navbar from "./shared/Navbar";
// import FilterCard from "./FilterCard";
// import Job from "./Job";
// import { useSelector } from "react-redux";
// import { motion } from "framer-motion";

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState([]);

//   useEffect(() => {
//     if (allJobs.length) {
//       if (searchedQuery) {
//         const filteredJobs = allJobs.filter((job) => {
//           const query = searchedQuery.toLowerCase();
//           return (
//             job.title.toLowerCase().includes(query) ||
//             job.description.toLowerCase().includes(query) ||
//             job.location.toLowerCase().includes(query)
//           );
//         });
//         setFilterJobs(filteredJobs);
//       } else {
//         setFilterJobs(allJobs);
//       }
//     }
//   }, [allJobs, searchedQuery]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-5">
//         <div className="flex flex-col md:flex-row gap-5">
//           <div className="md:w-1/4">
//             <FilterCard />
//           </div>
//           <div className="md:flex-1 h-[88vh] overflow-y-auto pb-5">
//             {filterJobs.length === 0 ? (
//               <span>No jobs found</span>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filterJobs.map((job) => (
//                   <motion.div
//                     key={job?._id}
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Job job={job} />
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;

///orginal waala

// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import FilterCard from './FilterCard'
// import Job from './Job';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';

// // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

// const Jobs = () => {
//     const { allJobs, searchedQuery } = useSelector(store => store.job);
//     const [filterJobs, setFilterJobs] = useState(allJobs);

//     useEffect(() => {
//         if (searchedQuery) {
//             const filteredJobs = allJobs.filter((job) => {
//                 return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//             })
//             setFilterJobs(filteredJobs)
//         } else {
//             setFilterJobs(allJobs)
//         }
//     }, [allJobs, searchedQuery]);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto mt-5'>
//                 <div className='flex gap-5'>
//                     <div className='w-20%'>
//                         <FilterCard />
//                     </div>
//                     {
//                         filterJobs.length <= 0 ? <span>Job not found</span> : (
//                             <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
//                                 <div className='grid grid-cols-3 gap-4'>
//                                     {
//                                         filterJobs.map((job) => (
//                                             <motion.div
//                                                 initial={{ opacity: 0, x: 100 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 exit={{ opacity: 0, x: -100 }}
//                                                 transition={{ duration: 0.3 }}
//                                                 key={job?._id}>
//                                                 <Job job={job} />
//                                             </motion.div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Jobs
