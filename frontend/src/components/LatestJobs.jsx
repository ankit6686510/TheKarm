

import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Current Leading  </span> Job Openings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5"> {/* Improved responsiveness */}
        {allJobs?.length > 0 ? (
          allJobs.slice(0, 6).map((job) => ( /// 6 is the number of jobs to display
            <LatestJobCards key={job._id} job={job} />
          ))
        ) : (
          <span>No Job Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
