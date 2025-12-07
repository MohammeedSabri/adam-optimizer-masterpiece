"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap, MapPin, Target, Users, Award, Code, Brain } from "lucide-react";

export default function Slide12() {
  const creators = [
    {
      name: "Mohammed Sabri",
      role: "AI Scientist Aspirant",
      education: "Bachelor in Data Science & Business Intelligence",
      university: "FST Mohammedia",
      email: "simosabri966@gmail.com",
      github: "https://github.com/MohammeedSabri/MohammeedSabri.git",
      linkedin: "https://www.linkedin.com/in/mohammed-sabri-bb28b527a/",
      photo: "/images/creators/mohammed-sabri.jpg",
      color: "from-cyan-500 to-blue-600",
      skills: ["Machine Learning", "Deep Learning", "Data Analysis", "Python", "TensorFlow"],
      goal: "Become an Artificial Intelligence Scientist working on cutting-edge ML research",
      projects: [
        "Adam Optimizer Visualization",
        "Deep Learning Research",
        "Data Science Projects"
      ]
    },
    {
      name: "Rayan Akioud",
      role: "Data Science Specialist",
      education: "Bachelor in Data Science & Business Intelligence",
      university: "FST Mohammedia",
      email: "rayanakioud8@gmail.com",
      github: "https://github.com/rayanakioud7",
      linkedin: "https://www.linkedin.com/in/rayan-akioud-8535092a5/",
      photo: "/images/creators/rayan-akioud.jpeg",
      color: "from-purple-500 to-pink-600",
      skills: ["Data Visualization", "Statistical Analysis", "Big Data", "SQL", "Power BI"],
      goal: "Excel in Data Science with focus on business intelligence and analytics",
      projects: [
        "Business Intelligence Dashboards",
        "Statistical Modeling",
        "Data Engineering"
      ]
    }
  ];

  const projectStats = [
    { label: "Total Slides", value: "12", color: "text-cyan-400" },
    { label: "3D Visualizations", value: "2", color: "text-purple-400" },
    { label: "Interactive Elements", value: "50+", color: "text-pink-400" },
    { label: "Code Lines", value: "3K+", color: "text-green-400" },
    { label: "Optimization Iterations", value: "600", color: "text-yellow-400" },
    { label: "Academic References", value: "6", color: "text-blue-400" }
  ];

  return (
    <div id="slide-12" className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-600 rounded-full mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Creator Profiles
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Data Science Graduates Passionate About AI & Optimization
          </p>
        </motion.div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-500"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${creator.color}`}></div>

              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Photo */}
                  <div className="relative">
                    <div className={`w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-cyan-500/50 transition-all duration-500`}>
                      <img
                        src={creator.photo}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-2 -right-2 p-3 bg-gradient-to-r ${creator.color} rounded-full`}>
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">{creator.name}</h2>
                    <p className="text-lg text-cyan-300 mb-3">{creator.role}</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{creator.university}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{creator.education}</p>

                    {/* Goal */}
                    <div className="mb-6 p-4 bg-gray-800/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-cyan-400" />
                        <span className="font-medium text-cyan-300">Career Goal</span>
                      </div>
                      <p className="text-gray-300 text-sm">{creator.goal}</p>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-purple-300">Technical Skills</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {creator.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Links */}
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={`mailto:${creator.email}`}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <span className="text-sm">Email</span>
                      </a>
                      <a
                        href={creator.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span className="text-sm">GitHub</span>
                      </a>
                      <a
                        href={creator.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-pink-400" />
                    <span className="font-medium text-pink-300">Featured Projects</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {creator.projects.map((project, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-800/30 rounded-lg text-center"
                      >
                        <span className="text-sm text-gray-300">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Statistics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-8 w-8 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Project Statistics</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {projectStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-center p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-600/20 rounded-2xl mb-6">
            <Award className="h-12 w-12 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Final Year Data Science Project
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            This interactive presentation was developed as part of our final year studies at FST Mohammedia,
            demonstrating the power of modern web technologies for educational visualization.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-gray-400">
            <span>🎯 Interactive 3D Visualizations</span>
            <span>⚡ Real-time Parameter Updates</span>
            <span>📊 Professional Research Presentation</span>
            <span>🎓 FST Mohammedia 2024</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}