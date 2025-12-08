'use client'

import { useState } from 'react'
import { CheckCircle, Zap, Target, TrendingUp, Award, Rocket, Sparkles } from 'lucide-react'

export default function Slide9() {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div id="slide-9" className="min-h-screen py-12 px-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#FF2B2B', '#00FF55', '#3399FF', '#FFD700', '#9D4EDD'][Math.floor(Math.random() * 5)],
                top: '0%',
                left: `${Math.random() * 100}%`,
                animation: `fall ${1 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Presentation Conclusion</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">🎯 The Adam Optimizer: Complete Journey</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From mathematical foundations to practical implementations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Key Takeaways */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                Key Takeaways
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-300 mb-1">Momentum + RMSProp = Adam</h3>
                      <p className="text-gray-300">
                        Adam combines Momentum's velocity with RMSProp's adaptive learning rates, creating an optimizer 
                        that excels on both steep and shallow gradients.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-300 mb-1">Bias Correction Matters</h3>
                      <p className="text-gray-300">
                        The 1/(1-β^t) correction fixes Adam's "cold start" problem, ensuring faster convergence 
                        during early training iterations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-300 mb-1">Default Parameters Work</h3>
                      <p className="text-gray-300">
                        With β1=0.9, β2=0.999, α=0.001, Adam provides robust performance across diverse 
                        optimization landscapes without extensive tuning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-yellow-400" />
                Achievements
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-700/30">
                  <div className="flex items-center">
                    <Zap className="w-8 h-8 text-cyan-400 mr-3" />
                    <div>
                      <div className="font-bold text-lg">Live 3D Visualizations</div>
                      <div className="text-sm text-gray-300">Interactive Adam trajectory plotting</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/30">
                  <div className="flex items-center">
                    <Target className="w-8 h-8 text-purple-400 mr-3" />
                    <div>
                      <div className="font-bold text-lg">Dual Interaction Modes</div>
                      <div className="text-sm text-gray-300">Animation + Real-time parameter updates</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-700/30">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
                    <div>
                      <div className="font-bold text-lg">Production Implementation</div>
                      <div className="text-sm text-gray-300">MATLAB + TypeScript code</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfetti}
                  className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-lg flex items-center justify-center space-x-2 mt-4"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Celebrate Achievement!</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps & Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">🚀 Beyond Adam</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <h3 className="font-semibold text-cyan-300 mb-1">AdamW</h3>
                <p className="text-sm text-gray-300">
                  Adam with decoupled weight decay - the current standard for training large language models.
                </p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <h3 className="font-semibold text-purple-300 mb-1">NAdam</h3>
                <p className="text-sm text-gray-300">
                  Nesterov-accelerated Adam - combines Nesterov momentum with adaptive learning rates.
                </p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <h3 className="font-semibold text-green-300 mb-1">AMSGrad</h3>
                <p className="text-sm text-gray-300">
                  Addresses Adam's convergence issues by using maximum of past squared gradients.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Real-World Applications</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <h3 className="font-semibold text-pink-300 mb-1">Deep Learning</h3>
                <p className="text-sm text-gray-300">
                  Training convolutional networks for computer vision and transformers for NLP.
                </p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-1">Recommendation Systems</h3>
                <p className="text-sm text-gray-300">
                  Optimizing embeddings for personalized content recommendations.
                </p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <h3 className="font-semibold text-amber-300 mb-1">Autonomous Systems</h3>
                <p className="text-sm text-gray-300">
                  Training reinforcement learning agents for robotics and self-driving cars.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <Rocket className="w-6 h-6 mr-3 text-yellow-400" />
              The Adam Legacy
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Since its introduction in 2015, Adam has become the default optimizer for deep learning, 
              powering everything from research prototypes to production AI systems. Its combination of 
              efficiency, robustness, and ease of use continues to make it an essential tool in the 
              machine learning toolkit.
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 px-4 py-2 rounded-full">
              <span className="text-cyan-300">The journey continues with</span>
              <span className="font-bold text-white">AdamW → NAdam → ...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
