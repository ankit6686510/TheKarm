import React from 'react';
import { BookOpen, Briefcase, Users, Award, TrendingUp, HeartHandshake } from 'lucide-react';

const Services = () => {
  const servicesList = [
    { icon: <Briefcase className="h-12 w-12 text-[#6A38C2]" />, title: "Job Matching", description: "Find the perfect job that matches your skills and experience." },
    { icon: <BookOpen className="h-12 w-12 text-[#6A38C2]" />, title: "Career Training", description: "Access training resources to enhance your professional skills." },
    { icon: <Users className="h-12 w-12 text-[#6A38C2]" />, title: "Network Building", description: "Connect with professionals and expand your career network." },
    { icon: <Award className="h-12 w-12 text-[#6A38C2]" />, title: "Resume Building", description: "Get help creating a professional resume that stands out." },
    { icon: <TrendingUp className="h-12 w-12 text-[#6A38C2]" />, title: "Career Growth", description: "Resources to help you advance in your professional journey." },
    { icon: <HeartHandshake className="h-12 w-12 text-[#6A38C2]" />, title: "Mentorship", description: "Get guidance from experienced professionals in your field." }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#6A38C2]">Our Services</h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We offer a range of career services to help you achieve your professional goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-200 
                        transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#6A38C2] cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#f3e8ff] p-4 rounded-full transition-all duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

              {/* CTA Button */}
              <button 
                className="mt-4 bg-[#6A38C2] text-white px-5 py-2 rounded-full 
                           transition-all duration-300 hover:bg-[#5a2aa8] hover:scale-105"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
