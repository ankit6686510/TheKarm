import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Check, Briefcase, FileCheck, Users, Award, Lightbulb, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, color }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {description.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-6 w-full bg-[#6A38C2] hover:bg-[#38225d]">
        Learn More
      </Button>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Resume Building",
      color: "bg-blue-500",
      description: {
        features: [
          "Professional resume templates",
          "ATS optimization",
          "Personalized feedback",
          "Industry-specific formats"
        ]
      }
    },
    {
      icon: <FileCheck className="h-6 w-6 text-white" />,
      title: "Job Application Support",
      color: "bg-purple-500",
      description: {
        features: [
          "Tailored cover letters",
          "Application tracking system",
          "Document organization",
          "Follow-up templates"
        ]
      }
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Interview Preparation",
      color: "bg-green-500",
      description: {
        features: [
          "Mock interviews",
          "Industry-specific questions",
          "Feedback sessions",
          "Negotiation strategies"
        ]
      }
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Career Coaching",
      color: "bg-red-500",
      description: {
        features: [
          "1-on-1 career guidance",
          "Goal setting and planning",
          "Industry insights",
          "Career transition support"
        ]
      }
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Personal Branding",
      color: "bg-yellow-500",
      description: {
        features: [
          "LinkedIn profile optimization",
          "Portfolio creation",
          "Personal website setup",
          "Social media strategy"
        ]
      }
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Skills Development",
      color: "bg-indigo-500",
      description: {
        features: [
          "Technical skill assessment",
          "Personalized learning paths",
          "Certificate recommendations",
          "Soft skills coaching"
        ]
      }
    }
  ];

  const premiumServices = [
    {
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      title: "Premium Mentorship",
      color: "bg-amber-500",
      description: {
        features: [
          "Industry expert mentors",
          "Weekly 1-on-1 sessions",
          "Career roadmap creation",
          "Direct industry connections"
        ]
      }
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Recruitment Fast Track",
      color: "bg-cyan-500",
      description: {
        features: [
          "Priority application review",
          "Direct referrals to employers",
          "Exclusive job opportunities",
          "Application status tracking"
        ]
      }
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-[#f9f8ff] to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#12343b]">Our </span>
              <span className="text-[#6A38C2]">Services</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Accelerate your career with our comprehensive suite of professional services designed to help you stand out in the competitive job market.
            </p>
          </div>

          {/* Regular Services */}
          <div className="mb-20">
            <h2 className="text-2xl font-semibold mb-8 text-[#12343b]">Career Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  color={service.color}
                />
              ))}
            </div>
          </div>

          {/* Premium Services */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-[#12343b]">Premium Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {premiumServices.map((service, index) => (
                <ServiceCard 
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  color={service.color}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-[#6A38C2] rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Take Your Career to the Next Level?</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Join thousands of professionals who have accelerated their careers with Karm's comprehensive services and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button className="bg-white text-[#6A38C2] hover:bg-gray-100">
                  Explore Jobs
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#FFEA00] text-[#12343b] hover:bg-yellow-300">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;