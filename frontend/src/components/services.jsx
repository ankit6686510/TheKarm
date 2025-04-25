import { motion } from "framer-motion";
import { IconBriefcase, IconSchool, IconCertificate, IconUsers, IconChartBar, IconBuildingCommunity } from "@tabler/icons-react";

const services = [
  {
    title: "Job Listings",
    description: "Access thousands of job opportunities from top companies across various industries.",
    icon: IconBriefcase,
  },
  {
    title: "Internship Programs",
    description: "Find the perfect internship to kickstart your career and gain valuable experience.",
    icon: IconSchool,
  },
  {
    title: "Career Development",
    description: "Enhance your skills with our curated learning resources and certification programs.",
    icon: IconCertificate,
  },
  {
    title: "Networking",
    description: "Connect with industry professionals and expand your professional network.",
    icon: IconUsers,
  },
  {
    title: "Career Analytics",
    description: "Get insights into your job search performance and optimize your applications.",
    icon: IconChartBar,
  },
  {
    title: "Company Profiles",
    description: "Explore detailed company profiles and find your perfect workplace match.",
    icon: IconBuildingCommunity,
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to kickstart and advance your career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;