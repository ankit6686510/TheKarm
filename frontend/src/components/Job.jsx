import React from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 'N/A';
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='p-4 sm:p-6 rounded-xl shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 group'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-3 sm:mb-4'>
                <span className='text-xs sm:text-sm text-gray-500 flex items-center gap-2'>
                    <span className='text-xs bg-gray-100 px-2 py-1 rounded-full'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </span>
                </span>
                <Button
                    variant="outline"
                    className="rounded-full hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    size="icon"
                    aria-label="Bookmark job"
                >
                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
            </div>

            {/* Company Info Section */}
            <div className='flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4'>
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-purple-100">
                    <AvatarImage 
                        src={job?.company?.logo} 
                        alt={`${job?.company?.name} logo`} 
                        className="object-contain"
                    />
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                        {job?.company?.name?.charAt(0) || 'C'}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className='font-semibold text-base sm:text-lg text-gray-800'>{job?.company?.name}</h2>
                    <p className='text-xs sm:text-sm text-gray-500 flex items-center gap-1'>
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline" /> India
                    </p>
                </div>
            </div>

            {/* Job Details Section */}
            <div className='mb-3 sm:mb-4'>
                <h1 className='font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2 group-hover:text-purple-700 transition-colors'>
                    {job?.title}
                </h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            {/* Job Metadata Section */}
            <div className='flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
                <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 text-blue-700 border-blue-200 bg-blue-50 text-xs sm:text-sm"
                >
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" /> {job?.position} Positions
                </Badge>
                <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 text-red-700 border-red-200 bg-red-50 text-xs sm:text-sm"
                >
                    {job?.jobType}
                </Badge>
                <Badge 
                    variant="outline" 
                    className="flex items-center gap-1 text-purple-700 border-purple-200 bg-purple-50 text-xs sm:text-sm"
                >
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" /> {job?.salary} LPA
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                    View Details
                </Button>
                <Button 
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 transition-colors text-sm sm:text-base" 
                    aria-label="Save job for later"
                >
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        company: PropTypes.shape({
            logo: PropTypes.string,
            name: PropTypes.string
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.string,
        jobType: PropTypes.string,
        salary: PropTypes.string
    })
};

export default Job;










// import React from 'react';
// import { Button } from './ui/button';
// import { Bookmark } from 'lucide-react';
// import { Avatar, AvatarImage } from './ui/avatar';
// import { Badge } from './ui/badge';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const Job = ({ job }) => {
//     const navigate = useNavigate();

//     const daysAgoFunction = (mongodbTime) => {
//         if (!mongodbTime) return 'N/A';
//         const createdAt = new Date(mongodbTime);
//         const currentTime = new Date();
//         const timeDifference = currentTime - createdAt;
//         return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     };

//     return (
//         <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
//             <div className='flex items-center justify-between'>
//                 <p className='text-sm text-gray-500'>
//                     {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
//                 </p>
//                 <Button
//                     variant="outline"
//                     className="rounded-full"
//                     size="icon"
//                     aria-label="Bookmark job"
//                 >
//                     <Bookmark />
//                 </Button>
//             </div>

//             <div className='flex items-center gap-2 my-2'>
//                 <Button className="p-6" variant="outline" size="icon">
//                     <Avatar>
//                         <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
//                     </Avatar>
//                 </Button>
//                 <div>
//                     <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//                     <p className='text-sm text-gray-500'>India</p>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
//                 <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
//                 <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary}LPA</Badge>
//             </div>
//             <div className='flex items-center gap-4 mt-4'>
//                 <Button
//                     onClick={() => navigate(`/description/${job?._id}`)}
//                     variant="outline"
//                 >
//                     Details
//                 </Button>
//                 <Button className="bg-[#7209b7]" aria-label="Save job for later">
//                     Save For Later
//                 </Button>
//             </div>
//         </div>
//     );
// };

// Job.propTypes = {
//     job: PropTypes.shape({
//         _id: PropTypes.string,
//         createdAt: PropTypes.string,
//         company: PropTypes.shape({
//             logo: PropTypes.string,
//             name: PropTypes.string
//         }),
//         title: PropTypes.string,
//         description: PropTypes.string,
//         position: PropTypes.string,
//         jobType: PropTypes.string,
//         salary: PropTypes.string
//     })
// };

// export default Job;





// import React from 'react'
// import { Button } from './ui/button'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const Job = ({job}) => {
//     const navigate = useNavigate();
//     // const jobId = "lsekdhjgdsnfvsdkjf";

//     const daysAgoFunction = (mongodbTime) => {
//         const createdAt = new Date(mongodbTime);
//         const currentTime = new Date();
//         const timeDifference = currentTime - createdAt;
//         return Math.floor(timeDifference/(1000*24*60*60));
//     }
    
//     return (
//         <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
//             <div className='flex items-center justify-between'>
//                 <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
//                 <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
//             </div>

//             <div className='flex items-center gap-2 my-2'>
//                 <Button className="p-6" variant="outline" size="icon">
//                     <Avatar>
//                         <AvatarImage src={job?.company?.logo} />
//                     </Avatar>
//                 </Button>
//                 <div>
//                     <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//                     <p className='text-sm text-gray-500'>India</p>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
//                 <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
//                 <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
//             </div>
//             <div className='flex items-center gap-4 mt-4'>
//                 <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
//                 <Button className="bg-[#7209b7]">Save For Later</Button>
//             </div>
//         </div>
//     )
// }

// export default Job