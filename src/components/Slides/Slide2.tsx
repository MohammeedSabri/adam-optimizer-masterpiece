'use client'

import { Calendar, Users, Award } from 'lucide-react'
import Image from 'next/image'

export default function Slide2() {
  return (
    <div id="slide-2" className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-4 py-2 rounded-full mb-4">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300">History & Development</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">📜 The Adam Optimizer Journey</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From mathematical concept to the industry standard optimizer
          </p>
        </div>

        {/* Timeline Visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

            {[
              {
                year: '2014',
                title: 'Initial Concept',
                description: 'Kingma and Ba begin research on combining Momentum and RMSProp',
                icon: '💡',
                side: 'left',
                color: 'from-cyan-600/20 to-blue-600/20'
              },
              {
                year: '2015',
                title: 'Adam Published',
                description: 'Paper presented at ICLR conference, becomes instant hit',
                icon: '📄',
                side: 'right',
                color: 'from-purple-600/20 to-violet-600/20'
              },
              {
                year: '2017',
                title: 'Wide Adoption',
                description: 'Becomes default optimizer in TensorFlow and PyTorch',
                icon: '🚀',
                side: 'left',
                color: 'from-pink-600/20 to-rose-600/20'
              },
              {
                year: '2019',
                title: 'AdamW Emerges',
                description: 'Fixed weight decay issue, better generalization',
                icon: '⚡',
                side: 'right',
                color: 'from-green-600/20 to-emerald-600/20'
              },
              {
                year: '2024',
                title: 'Modern Standard',
                description: 'Used in 95%+ of deep learning projects',
                icon: '🏆',
                side: 'left',
                color: 'from-amber-600/20 to-yellow-600/20'
              }
            ].map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${item.side === 'left' ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className={`glass-card bg-gradient-to-r ${item.color} border border-white/10`}>
                    <div className="flex items-center mb-3">
                      <div className="text-2xl mr-3">{item.icon}</div>
                      <div>
                        <div className="text-sm text-cyan-400 font-semibold">{item.year}</div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full border-4 border-black shadow-lg shadow-purple-500/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Researchers Section - Updated with Photos */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              👨‍🔬 The Pioneering Researchers
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Diederik P. Kingma Card */}
            <div className="glass-card hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500 group-hover:border-cyan-300 transition-colors duration-300">
                  <Image
                    src="/images/researchers/kingma.jpg"
                    alt="Diederik P. Kingma"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Diederik P. Kingma</h3>
                  <p className="text-cyan-400 font-medium">University of Amsterdam</p>
                  <p className="text-sm text-gray-400">Currently at OpenAI</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-sm text-cyan-300">PhD in Machine Learning</span>
                </div>
                <p className="text-gray-300">
                  Co-author of the original Adam paper. Currently works on large language models at OpenAI.
                  His research focuses on variational autoencoders, generative models, and optimization algorithms.
                </p>
                
                <div className="mt-4 flex items-center space-x-4">
                  <div className="px-3 py-1 bg-cyan-900/30 rounded-full">
                    <span className="text-xs text-cyan-300">Variational Autoencoders</span>
                  </div>
                  <div className="px-3 py-1 bg-purple-900/30 rounded-full">
                    <span className="text-xs text-purple-300">Generative Models</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jimmy Ba Card */}
            <div className="glass-card hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 group-hover:border-purple-300 transition-colors duration-300">
                  <Image
                    src="/images/researchers/ba.jpg"
                    alt="Jimmy Ba"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Jimmy Ba</h3>
                  <p className="text-purple-400 font-medium">University of Toronto</p>
                  <p className="text-sm text-gray-400">Google Brain Research Scientist</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm text-purple-300">Assistant Professor & Researcher</span>
                </div>
                <p className="text-gray-300">
                  Assistant professor at University of Toronto and research scientist at Google Brain.
                  Contributed to breakthroughs in optimization, reinforcement learning, and large-scale model training.
                </p>
                
                <div className="mt-4 flex items-center space-x-4">
                  <div className="px-3 py-1 bg-purple-900/30 rounded-full">
                    <span className="text-xs text-purple-300">Reinforcement Learning</span>
                  </div>
                  <div className="px-3 py-1 bg-pink-900/30 rounded-full">
                    <span className="text-xs text-pink-300">Large-Scale Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Info */}
          <div className="mt-8 glass-card max-w-4xl mx-auto">
            <div className="p-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-3">Collaborative Breakthrough</h3>
              <p className="text-gray-300 text-center">
                Their collaboration at the International Conference on Learning Representations (ICLR 2015)
                resulted in one of the most cited papers in machine learning history, with over 90,000 citations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-400">90K+</div>
                  <div className="text-sm text-gray-400">Paper Citations</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400">2015</div>
                  <div className="text-sm text-gray-400">Year Published</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">95%</div>
                  <div className="text-sm text-gray-400">DL Projects Using Adam</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Historical Context */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">📊 Historical Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card">
              <h4 className="text-lg font-bold text-cyan-300 mb-3">Before Adam</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Manual learning rate tuning required
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Slow convergence on complex landscapes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Parameter-specific sensitivity issues
                </li>
              </ul>
            </div>
            
            <div className="glass-card">
              <h4 className="text-lg font-bold text-green-300 mb-3">After Adam</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Automatic learning rate adaptation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  10x faster convergence in many cases
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Robust to varying gradient scales
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}