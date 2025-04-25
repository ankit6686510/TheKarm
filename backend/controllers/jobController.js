const getJobRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all jobs
    const jobs = await Job.find({ status: 'active' })
      .populate('company', 'name')
      .lean();

    // Calculate match score for each job based on user skills and job requirements
    const recommendedJobs = jobs.map(job => {
      const userSkills = user.skills || [];
      const jobSkills = job.requiredSkills || [];
      
      // Calculate skill match percentage
      const matchingSkills = userSkills.filter(skill => 
        jobSkills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(jobSkill.toLowerCase())
        )
      );
      
      const matchScore = Math.round((matchingSkills.length / jobSkills.length) * 100);
      
      return {
        ...job,
        matchScore,
        isSaved: user.savedJobs?.includes(job._id) || false,
        isApplied: user.applications?.some(app => app.job.toString() === job._id.toString()) || false
      };
    });

    // Sort jobs by match score in descending order
    recommendedJobs.sort((a, b) => b.matchScore - a.matchScore);

    // Return top 12 recommendations
    res.json(recommendedJobs.slice(0, 12));
  } catch (error) {
    console.error('Error getting job recommendations:', error);
    res.status(500).json({ message: 'Error getting job recommendations' });
  }
};

module.exports = {
  getJobRecommendations,
}; 