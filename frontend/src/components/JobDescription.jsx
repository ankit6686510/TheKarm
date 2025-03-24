import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Briefcase, MapPin, Calendar, DollarSign, Users, Info, Building2, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied = //to update state just like storing no.in temp varaible
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false; // check if the user has already applied for the job
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get company initials for avatar fallback
  const getCompanyInitials = (companyName) => {
    if (!companyName) return 'CO';
    return companyName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // updating ui--> apply-->applied
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply for job");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load job details");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-200 rounded-full mb-6"></div>
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Job Header Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="h-3 bg-gradient-to-r from-purple-600 to-blue-500"></div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-5">
                <Avatar className="h-16 w-16 rounded-lg border-2 border-gray-100">
                  <AvatarImage src={singleJob?.company?.logo} alt={`${singleJob?.company?.name || 'Company'} logo`} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold rounded-lg">
                    {getCompanyInitials(singleJob?.company?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{singleJob?.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span className="font-medium">{singleJob?.company?.name}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{singleJob?.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md py-1 px-2 font-medium flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {singleJob?.position || singleJob?.postion} Positions
                    </Badge>
                    <Badge className="text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-md py-1 px-2 font-medium flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {singleJob?.jobType}
                    </Badge>
                    <Badge className="text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md py-1 px-2 font-medium flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {singleJob?.salary} LPA
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-500 mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Posted on {formatDate(singleJob?.createdAt)}
                </p>
                <Button
                  onClick={isApplied ? null : applyJobHandler}
                  disabled={isApplied}
                  className={`min-w-32 rounded-lg py-2 px-6 ${
                    isApplied
                      ? "bg-gray-100 text-gray-500 border border-gray-300"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Job details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-purple-600" />
                  Job Description
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-6">{singleJob?.description}</p>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <Briefcase className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Role</h3>
                        <p className="text-base font-medium text-gray-900">{singleJob?.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Location</h3>
                        <p className="text-base font-medium text-gray-900">{singleJob?.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Experience</h3>
                        <p className="text-base font-medium text-gray-900">{singleJob?.experience || 0} years</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-9 w-9 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Salary</h3>
                        <p className="text-base font-medium text-gray-900">{singleJob?.salary} LPA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column: Application stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Application Stats
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Total Applicants</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {singleJob?.applications?.length || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Posted Date</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatDate(singleJob?.createdAt)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`w-full ${
                      isApplied
                        ? "bg-gray-100 text-gray-500 border border-gray-300"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {isApplied ? "Already Applied" : "Apply for this Job"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
