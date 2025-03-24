import React from 'react';
import { Button } from './ui/button';
import { Bookmark, Building2, MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react';
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

    // Get company initials for avatar fallback
    const getCompanyInitials = (companyName) => {
        if (!companyName) return 'CO';
        return companyName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    // Truncate description to a reasonable length
    const truncateDescription = (description, maxLength = 100) => {
        if (!description) return 'No description available';
        return description.length > maxLength 
            ? description.substring(0, maxLength) + '...' 
            : description;
    };

    return (
        <div className='relative overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-purple-200 hover:translate-y-[-2px]'>
            {/* Colored top accent bar */}
            <div className='h-2 w-full bg-gradient-to-r from-purple-600 to-blue-500'></div>
            
            <div className='p-5'>
                {/* Header with date and bookmark */}
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-1 text-sm text-gray-500'>
                        <Calendar className='h-3.5 w-3.5 text-gray-400' />
                        <p>
                            {daysAgoFunction(job?.createdAt) === 0 ? "Posted today" : `Posted ${daysAgoFunction(job?.createdAt)} days ago`}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        className="rounded-full h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                        size="icon"
                        aria-label="Bookmark job"
                    >
                        <Bookmark className="h-4 w-4" />
                    </Button>
                </div>

                {/* Company info with logo */}
                <div className='flex items-center gap-3 mb-4'>
                    <Avatar className="h-12 w-12 border-2 border-gray-100 rounded-md">
                        <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
                        <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold text-sm rounded-md">
                            {getCompanyInitials(job?.company?.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className='font-semibold text-lg text-gray-900'>{job?.company?.name || 'Company'}</h2>
                        <div className='flex items-center text-sm text-gray-500 mt-0.5'>
                            <MapPin className='h-3.5 w-3.5 mr-1' />
                            <span>India</span>
                        </div>
                    </div>
                </div>

                {/* Job details */}
                <div className='mb-4'>
                    <h1 className='font-bold text-xl text-gray-900 mb-2'>{job?.title || 'Job Title'}</h1>
                    <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{truncateDescription(job?.description)}</p>
                    
                    {/* Badges for key info */}
                    <div className='flex flex-wrap items-center gap-2 mt-3'>
                        <Badge className='text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md py-1 px-2 font-medium flex items-center'>
                            <Briefcase className='h-3 w-3 mr-1' />
                            {job?.position || '0'} Positions
                        </Badge>
                        <Badge className='text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-md py-1 px-2 font-medium flex items-center'>
                            <Building2 className='h-3 w-3 mr-1' />
                            {job?.jobType || 'Full-time'}
                        </Badge>
                        <Badge className='text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md py-1 px-2 font-medium flex items-center'>
                            <DollarSign className='h-3 w-3 mr-1' />
                            {job?.salary || '0'} LPA
                        </Badge>
                    </div>
                </div>

                {/* Action buttons */}
                <div className='flex items-center gap-3 mt-4 pt-4 border-t border-gray-100'>
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        variant="outline"
                        className="flex-1 rounded-lg font-medium border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    >
                        View Details
                    </Button>
                    <Button 
                        className="flex-1 rounded-lg font-medium bg-purple-600 hover:bg-purple-700" 
                        aria-label="Save job for later"
                    >
                        Save For Later
                    </Button>
                </div>
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