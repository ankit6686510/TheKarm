import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Bookmark, Briefcase, Loader2 } from 'lucide-react';
import axios from 'axios';

const JobRecommendations = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingJobs, setSavingJobs] = useState(new Set());
  const [applyingJobs, setApplyingJobs] = useState(new Set());
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/v1/job/recommendations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Ensure we have an array before setting state
        if (Array.isArray(response.data)) {
          setRecommendedJobs(response.data);
        } else {
          setRecommendedJobs([]);
          setError('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching recommended jobs:', error);
        setError('Failed to fetch job recommendations');
        setRecommendedJobs([]);
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
      setSavingJobs(prev => new Set(prev).add(jobId));
      await axios.post(
        '/api/v1/job/save',
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setRecommendedJobs((prevJobs) =>
        Array.isArray(prevJobs)
          ? prevJobs.map((job) =>
              job._id === jobId ? { ...job, isSaved: true } : job
            )
          : []
      );
    } catch (error) {
      console.error('Error saving job:', error);
      setError('Failed to save job. Please try again.');
    } finally {
      setSavingJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  const handleQuickApply = async (jobId) => {
    try {
      setApplyingJobs(prev => new Set(prev).add(jobId));
      await axios.post(
        '/api/v1/application/apply',
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setRecommendedJobs((prevJobs) =>
        Array.isArray(prevJobs)
          ? prevJobs.map((job) =>
              job._id === jobId ? { ...job, isApplied: true } : job
            )
          : []
      );
    } catch (error) {
      console.error('Error applying for job:', error);
      setError('Failed to apply for job. Please try again.');
    } finally {
      setApplyingJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-4">Sign in to see personalized job recommendations</p>
        <Button variant="default" onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
    );
  }

  if (!Array.isArray(recommendedJobs) || recommendedJobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-4">No job recommendations available at the moment</p>
        <p className="text-sm text-gray-500">Try updating your profile with more skills to get better recommendations</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recommended Jobs for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedJobs.map((job) => {
          const isSaving = savingJobs.has(job._id);
          const isApplying = applyingJobs.has(job._id);
          
          return (
            <Card key={job._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{job.title || 'Untitled Job'}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSaveJob(job._id)}
                    disabled={isSaving || job.isSaved}
                  >
                    {isSaving ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Bookmark
                        className={`h-5 w-5 ${
                          job.isSaved ? 'fill-current text-yellow-500' : ''
                        }`}
                      />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.company?.name || 'Unknown Company'}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(job.skills) && job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">
                      {job.matchScore || 0}% match with your profile
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {job.location || 'Remote'} • {job.type || 'Full-time'}
                    </span>
                    <Button
                      variant={job.isApplied ? 'outline' : 'default'}
                      onClick={() => handleQuickApply(job._id)}
                      disabled={isApplying || job.isApplied}
                    >
                      {isApplying ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      {job.isApplied ? 'Applied' : 'Quick Apply'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default JobRecommendations; 