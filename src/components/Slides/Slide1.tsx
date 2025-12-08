'use client'

import { ArrowDown, Sparkles, Zap, Brain } from 'lucide-react'

export default function Slide1() {
  return (
    <div id="slide-1" className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Adam Optimizer
            </span>
          </h1>
          
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-300 mb-4">
              <span className="text-cyan-400">Ada</span>ptive{' '}
              <span className="text-purple-400">M</span>oment{' '}
              <span className="text-pink-400">Estimation</span>
            </h2>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 lg:w-24 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              <div className="w-16 lg:w-24 h-1 bg-gradient-to-l from-purple-500 to-transparent" />
            </div>
          </div>
        </div>

        <div className="glass-card max-w-4xl mx-auto">
          <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">Welcome to the Journey</h3>
                <p className="text-gray-300">A cinematic exploration of modern AI&apos;s engine</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 mt-2 rounded-full bg-red-500 animate-pulse" />
                <div>
                  <h4 className="text-lg lg:text-xl font-semibold text-red-300 mb-2">The Problem</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Standard Gradient Descent is &quot;memoryless&quot;. It slows down on plateaus 
                    and oscillates in ravines, struggling with complex optimization landscapes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 mt-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <h4 className="text-lg lg:text-xl font-semibold text-green-300 mb-2">The Solution</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Adam gives the optimizer <span className="text-cyan-300 font-semibold">Velocity (Momentum)</span>{' '}
                    and <span className="text-purple-300 font-semibold">Adaptive Brakes (RMSProp)</span>, 
                    creating an intelligent navigation system for neural networks.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">10x</div>
                <div className="text-sm text-gray-400">Convergence Speed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">2015</div>
                <div className="text-sm text-gray-400">Year Introduced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-pink-400 mb-2">90K+</div>
                <div className="text-sm text-gray-400">Papers Citing</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-gray-400 text-sm">Scroll to explore</span>
            <ArrowDown className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
