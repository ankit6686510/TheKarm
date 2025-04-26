import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

/**
 * Jobs Component
 * Displays a grid of job listings with filtering capabilities
 */
const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  // Filter jobs based on search query and filters
  useEffect(() => {
    if (allJobs.length) {
      let filteredJobs = [...allJobs];

      // Apply text search if exists
      if (searchedQuery?.searchText) {
        const searchText = searchedQuery.searchText.toLowerCase();
        filteredJobs = filteredJobs.filter((job) => {
          return (
            job.title.toLowerCase().includes(searchText) ||
            job.description.toLowerCase().includes(searchText) ||
            job.location.toLowerCase().includes(searchText) ||
            job.company.name.toLowerCase().includes(searchText)
          );
        });
      }

      // Apply filters if they exist
      if (searchedQuery && Object.keys(searchedQuery).length > 0) {
        Object.entries(searchedQuery).forEach(([filterType, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            filteredJobs = filteredJobs.filter((job) => {
              if (filterType === "Location") {
                return values.includes(job.location);
              } else if (filterType === "Industry") {
                return values.includes(job.title);
              } else if (filterType === "Salary") {
                return values.includes(job.salary);
              }
              return true;
            });
          }
        });
      }

      // Apply sorting
      filteredJobs.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        switch (sortBy) {
          case "newest":
            return dateB - dateA;
          case "oldest":
            return dateA - dateB;
          case "salary-high":
            return parseInt(b.salary) - parseInt(a.salary);
          case "salary-low":
            return parseInt(a.salary) - parseInt(b.salary);
          default:
            return dateB - dateA;
        }
      });

      setFilterJobs(filteredJobs);
    }
  }, [allJobs, searchedQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Filter sidebar */}
          <div className="lg:w-1/4">
            <FilterCard />
          </div>
          
          {/* Job listings */}
          <div className="lg:flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Available Jobs
                {filterJobs.length > 0 && (
                  <span className="text-gray-500 text-base sm:text-lg ml-2">
                    ({filterJobs.length})
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
                    <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filterJobs.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">No jobs found matching your criteria</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
