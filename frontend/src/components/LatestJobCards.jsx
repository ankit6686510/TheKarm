import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Building2, MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  // Get company initials for avatar fallback
  const getCompanyInitials = (companyName) => {
    if (!companyName) return 'CO';
    return companyName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Truncate description to a reasonable length
  const truncateDescription = (description, maxLength = 100) => {
    if (!description) return 'No description provided.';
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...' 
      : description;
  };

  // Get relative time for job posting
  const getRelativeTime = () => {
    if (!job?.createdAt) return "Recently";
    
    const now = new Date();
    const created = new Date(job.createdAt);
    const diffInDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

  return (
    <article
      onClick={() => navigate(`/description/${job?._id}`)}
      className="relative overflow-hidden bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-purple-200 hover:translate-y-[-2px]"
      aria-label={`Job listing for ${job?.title}`}
    >
      {/* Colored top accent bar */}
      <div className='h-2 w-full bg-gradient-to-r from-purple-600 to-blue-500'></div>
      
      <div className="p-5">
        {/* Header with date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            <span>{getRelativeTime()}</span>
          </div>
        </div>

        {/* Company info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 border-2 border-gray-100 rounded-md">
            <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name || 'Company'} logo`} />
            <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold text-sm rounded-md">
              {getCompanyInitials(job?.company?.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg text-gray-900">{job?.company?.name || "Company Name"}</h2>
            <div className="flex items-center text-sm text-gray-500 mt-0.5">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Job details */}
        <div className="mb-4">
          <h1 className="font-bold text-xl text-gray-900 mb-2">{job?.title || "Job Title"}</h1>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{truncateDescription(job?.description)}</p>
        </div>

        {/* Badges for key info */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <Badge className="text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md py-1 px-2 font-medium flex items-center">
            <Briefcase className="h-3 w-3 mr-1" />
            {job?.position || "N/A"} Positions
          </Badge>
          <Badge className="text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-md py-1 px-2 font-medium flex items-center">
            <Building2 className="h-3 w-3 mr-1" />
            {job?.jobType || "N/A"}
          </Badge>
          <Badge className="text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md py-1 px-2 font-medium flex items-center">
            <DollarSign className="h-3 w-3 mr-1" />
            {job?.salary ? `${job.salary} LPA` : "Salary not disclosed"}
          </Badge>
        </div>
      </div>
    </article>
  );
};

export default LatestJobCards;







// import React from "react";
// import { Badge } from "./ui/badge";
// import { useNavigate } from "react-router-dom";

// const LatestJobCards = ({ job }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       onClick={() => navigate(`/description/${job._id}`)}
//       className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
//     >
//       <div>
//         <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//         <p className="text-sm text-gray-500">India</p>
//       </div>
//       <div>
//         <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//         <p className="text-sm text-gray-600">{job?.description}</p>
//       </div>
//       <div className="flex items-center gap-2 mt-4">
//         <Badge className={"text-blue-700 font-bold"} variant="ghost">
//           {job?.position} Positions
//         </Badge>
//         <Badge className={"text-[#F83002] font-bold"} variant="ghost">
//           {job?.jobType}
//         </Badge>
//         <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
//           {job?.salary}LPA
//         </Badge>
//       </div>
//     </div>
//   );
// };

// export default LatestJobCards;
