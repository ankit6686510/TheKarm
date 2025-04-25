import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Bookmark, Briefcase } from 'lucide-react';
import axios from 'axios';

const JobRecommendations = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await axios.get('/api/v1/job/recommendations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRecommendedJobs(response.data);
      } catch (error) {
        console.error('Error fetching recommended jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecommendedJobs();
    }
  }, [user]);

  const handleSaveJob = async (jobId) => {
    try {
      await axios.post(
        '/api/v1/job/save',
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Update UI to show job is saved
      setRecommendedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isSaved: true } : job
        )
      );
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleQuickApply = async (jobId) => {
    try {
      await axios.post(
        '/api/v1/application/apply',
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Update UI to show job is applied
      setRecommendedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isApplied: true } : job
        )
      );
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading recommendations...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-4">Sign in to see personalized job recommendations</p>
        <Button variant="default">Sign In</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recommended Jobs for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedJobs.map((job) => (
          <Card key={job._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSaveJob(job._id)}
                >
                  <Bookmark
                    className={`h-5 w-5 ${
                      job.isSaved ? 'fill-current text-yellow-500' : ''
                    }`}
                  />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Briefcase className="h-4 w-4" />
                <span>{job.company.name}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">
                    {job.matchScore}% match with your profile
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {job.location} • {job.type}
                  </span>
                  <Button
                    variant={job.isApplied ? 'outline' : 'default'}
                    onClick={() => handleQuickApply(job._id)}
                    disabled={job.isApplied}
                  >
                    {job.isApplied ? 'Applied' : 'Quick Apply'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations; 