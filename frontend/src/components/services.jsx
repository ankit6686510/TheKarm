import React, { useState } from 'react';
import { BookOpen, Briefcase, Users, Award, TrendingUp, HeartHandshake, Check, ArrowRight } from 'lucide-react';

const Services = () => {
  // Service category state
  const [activeCategory, setActiveCategory] = useState('career');
  
  // Service categories
  const categories = [
    { id: 'career', name: 'Career Services' },
    { id: 'learning', name: 'Learning Resources' },
    { id: 'network', name: 'Networking' }
  ];

  // Service cards data with categories
  const servicesData = {
    career: [
      {
        icon: <Briefcase />,
        title: "Job Matching",
        description: "Our AI-powered system analyzes your skills, experience, and preferences to match you with the perfect job opportunities.",
        features: ["Personalized job matches", "Real-time notifications", "Salary insights"]
      },
      {
        icon: <Award />,
        title: "Resume Building",
        description: "Create a professional resume that stands out with our expert-designed templates and personalized feedback.",
        features: ["ATS-friendly templates", "Expert review", "Keyword optimization"]
      },
      {
        icon: <TrendingUp />,
        title: "Career Advancement",
        description: "Advance your career with personalized guidance, skill assessments, and growth planning.",
        features: ["Career path planning", "Skill gap analysis", "Promotion strategies"]
      }
    ],
    learning: [
      {
        icon: <BookOpen />,
        title: "Skill Development",
        description: "Access curated learning resources tailored to your career goals and current skill level.",
        features: ["Industry-relevant courses", "Hands-on projects", "Skill certifications"]
      },
      {
        icon: <HeartHandshake />,
        title: "Mentorship",
        description: "Connect with experienced professionals in your field for guidance, advice, and support.",
        features: ["1-on-1 sessions", "Industry experts", "Long-term relationships"]
      }
    ],
    network: [
      {
        icon: <Users />,
        title: "Community Access",
        description: "Join industry-specific communities to network, share knowledge, and discover opportunities.",
        features: ["Industry events", "Peer networking", "Discussion forums"]
      }
    ]
  };

  return (
    <div className="py-20 bg-white">
      {/* Custom CSS for animations and effects */}
      <style jsx>{`
        .service-card {
          transition: all 0.4s ease;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          position: relative;
        }
        
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #6A38C2;
          transform: scaleY(0);
          transition: transform 0.4s ease;
          transform-origin: bottom;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
          border-color: #6A38C2;
        }
        
        .service-card:hover::before {
          transform: scaleY(1);
        }
        
        .icon-container {
          transition: all 0.3s ease;
        }
        
        .service-card:hover .icon-container {
          transform: scale(1.1);
          background-color: #6A38C2;
          color: white;
        }
        
        .tab-button {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .tab-button::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #6A38C2;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .tab-button.active {
          color: #6A38C2;
        }
        
        .tab-button.active::after {
          transform: scaleX(1);
        }

        .feature-item {
          position: relative;
          padding-left: 28px;
          margin-bottom: 8px;
        }
        
        .feature-item .feature-icon {
          position: absolute;
          left: 0;
          top: 2px;
          color: #6A38C2;
        }
        
        .learn-more-link {
          display: inline-flex;
          align-items: center;
          color: #6A38C2;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .learn-more-link svg {
          transition: transform 0.3s ease;
        }
        
        .learn-more-link:hover svg {
          transform: translateX(5px);
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-1 bg-purple-100 text-[#6A38C2] rounded-full text-sm font-medium mb-4 inline-block">OUR SERVICES</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Empowering Your Career Journey</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            We provide comprehensive solutions designed to help you excel in your professional path, 
            from finding the right opportunities to developing essential skills.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 border-b pb-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`tab-button px-8 py-3 text-lg font-medium ${activeCategory === category.id ? 'active' : 'text-gray-500'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData[activeCategory].map((service, index) => (
            <div
              key={index}
              className="service-card rounded-xl p-8 bg-white fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="icon-container p-4 rounded-full bg-purple-50 inline-block mb-6">
                {React.cloneElement(service.icon, { className: "h-7 w-7 text-[#6A38C2]" })}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              {/* Features List */}
              <div className="mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <Check size={16} className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Learn More Link */}
              <a href="#" className="learn-more-link">
                Learn more <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-100 to-indigo-50 rounded-2xl p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Ready to accelerate your career?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our comprehensive services.
          </p>
          <button className="bg-[#6A38C2] hover:bg-[#5a2aa8] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
