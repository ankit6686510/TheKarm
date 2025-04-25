const User = require('../models/User');
const Job = require('../models/Job');

const getJobRecommendations = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all active jobs
    const jobs = await Job.find({ status: 'active' })
      .populate('company', 'name')
      .lean();

    if (!Array.isArray(jobs)) {
      return res.status(200).json([]);
    }

    // Calculate match score for each job based on user skills and job requirements
    const recommendedJobs = jobs.map(job => {
      const userSkills = Array.isArray(user.skills) ? user.skills : [];
      const jobSkills = Array.isArray(job.requiredSkills) ? job.requiredSkills : [];
      
      // Calculate skill match percentage
      const matchingSkills = userSkills.filter(skill => 
        jobSkills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(jobSkill.toLowerCase())
        )
      );
      
      const matchScore = jobSkills.length > 0 
        ? Math.round((matchingSkills.length / jobSkills.length) * 100)
        : 0;
      
      return {
        _id: job._id,
        title: job.title || 'Untitled Job',
        company: {
          name: job.company?.name || 'Unknown Company'
        },
        location: job.location || 'Remote',
        type: job.type || 'Full-time',
        skills: Array.isArray(job.skills) ? job.skills : [],
        matchScore,
        isSaved: Array.isArray(user.savedJobs) && user.savedJobs.includes(job._id.toString()),
        isApplied: Array.isArray(user.applications) && user.applications.some(app => 
          app.job && app.job.toString() === job._id.toString()
        )
      };
    });

    // Sort jobs by match score in descending order
    recommendedJobs.sort((a, b) => b.matchScore - a.matchScore);

    // Return top 12 recommendations
    res.status(200).json(recommendedJobs.slice(0, 12));
  } catch (error) {
    console.error('Error getting job recommendations:', error);
    res.status(500).json({ message: 'Error getting job recommendations' });
  }
};

module.exports = {
  getJobRecommendations,
}; 