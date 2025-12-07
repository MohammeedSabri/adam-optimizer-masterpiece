'use client'

import { useState } from 'react'
import { Play, Zap, Shield, Thermometer } from 'lucide-react'

export default function Slide3() {
  const [activeTab, setActiveTab] = useState('momentum')

  const tabs = [
    { id: 'momentum', label: '🏎️ Momentum', icon: Zap, color: 'yellow' },
    { id: 'rmsprop', label: '⚖️ RMSProp', icon: Shield, color: 'blue' },
    { id: 'bias', label: '🔧 Bias Correction', icon: Thermometer, color: 'green' },
  ]

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0]

  return (
    <div id="slide-3" className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 px-4 py-2 rounded-full mb-4">
            <Play className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300">The Intuition</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">💡 Why Adam Works</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Adam combines two distinct mechanisms to solve specific failures of Gradient Descent
          </p>
        </div>

        {/* YouTube Video */}
        <div className="glass-card max-w-4xl mx-auto mb-12">
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://youtu.be/MD2fYip6QsQ?si=u4NpnI6zhHJGdR-M"
              title="Adam Optimizer Explained"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
          <p className="text-center text-gray-400 mt-4">
            Visual explanation of how Adam optimizer works
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="max-w-5xl mx-auto">
          {/* Tab Headers */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const bgColor = tab.color === 'yellow' ? 'bg-yellow-600/30' : 
                            tab.color === 'blue' ? 'bg-blue-600/30' : 'bg-green-600/30'
              const borderColor = tab.color === 'yellow' ? 'border-yellow-400/30' : 
                                 tab.color === 'blue' ? 'border-blue-400/30' : 'border-green-400/30'
              const textColor = tab.color === 'yellow' ? 'text-yellow-400' : 
                               tab.color === 'blue' ? 'text-blue-400' : 'text-green-400'
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? `${bgColor} border ${borderColor}`
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? textColor : 'text-gray-400'}`} />
                  <span className={`font-medium ${activeTab === tab.id ? textColor : 'text-gray-400'}`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="glass-card">
            <div className="p-6">
              {/* Momentum Tab */}
              {activeTab === 'momentum' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">1. Momentum: The Heavy Ball</h2>
                      <p className="text-yellow-300 font-semibold">Solves: The Ravine & Local Minima Problem</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Imagine a heavy ball rolling down a hill. It builds up <span className="text-yellow-300 font-semibold">Velocity</span>.
                        On flat surfaces (plateaus), gradients are small, but momentum keeps the ball moving fast.
                        In narrow ravines where gradients flip-flop (zig-zag), momentum averages them out,
                        creating a smooth path down the center.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-yellow-300">Acceleration</h4>
                            <p className="text-gray-400 text-sm">Builds speed in consistent directions</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-yellow-300">Dampening</h4>
                            <p className="text-gray-400 text-sm">Reduces oscillations in ravines</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-yellow-300">Math</h4>
                            <p className="text-gray-400 text-sm">Exponential Moving Average (EWMA) of gradients</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="https://towardsdatascience.com/wp-content/uploads/2025/03/image-18.gif"
                        alt="Momentum Visualization"
                        className="rounded-xl max-w-full h-auto border border-gray-700"
                      />
                      <p className="text-gray-400 text-sm mt-2 text-center">Momentum helps overcome local minima</p>
                    </div>
                  </div>
                </div>
              )}

              {/* RMSProp Tab */}
              {activeTab === 'rmsprop' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">2. RMSProp: The Adaptive Brakes</h2>
                      <p className="text-cyan-300 font-semibold">Solves: The Sensitive vs. Stubborn Parameter Problem</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Some parameters (weights) have steep slopes (sensitive), others have flat slopes (stubborn).
                        RMSProp gives each parameter its <span className="text-cyan-300 font-semibold">own learning rate</span>.
                        It tracks the "magnitude" of recent gradients and adapts step sizes accordingly.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-cyan-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-cyan-300">Large Gradients</h4>
                            <p className="text-gray-400 text-sm">Smaller steps (hits the brakes)</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-cyan-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-cyan-300">Small Gradients</h4>
                            <p className="text-gray-400 text-sm">Larger steps (hits the gas)</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-cyan-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-cyan-300">Why 'Forgetful'?</h4>
                            <p className="text-gray-400 text-sm">Uses moving average to adapt to current terrain</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="https://blog.paperspace.com/content/images/size/w350/2018/06/optimizers7.gif"
                        alt="RMSProp Visualization"
                        className="rounded-xl max-w-full h-auto border border-gray-700"
                      />
                      <p className="text-gray-400 text-sm mt-2 text-center">RMSProp adapts to parameter sensitivities</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bias Correction Tab */}
              {activeTab === 'bias' && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                      <Thermometer className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">3. Bias Correction: The Cold Start</h2>
                      <p className="text-green-300 font-semibold">Solves: The Slow Start Problem</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Adam initializes its memory (Momentum & RMSProp) to 0, causing the first few steps
                        to be biased toward 0 (too small/slow). Bias correction artificially boosts the estimates
                        at the start, then fades away as training progresses.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-green-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-green-300">The Issue</h4>
                            <p className="text-gray-400 text-sm">Initial m₀ = 0, v₀ = 0 leads to slow start</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-green-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-green-300">The Fix</h4>
                            <p className="text-gray-400 text-sm">Boost estimates with 1/(1-βᵗ) factor</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-green-500 rounded-full" />
                          <div>
                            <h4 className="font-semibold text-green-300">The Effect</h4>
                            <p className="text-gray-400 text-sm">Bigger early steps, faster convergence</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="https://dzlab.github.io/assets/2019/20190615-optimizers-animation-adam-1.png"
                        alt="Adam Animation"
                        className="rounded-xl max-w-full h-auto border border-gray-700"
                      />
                      <p className="text-gray-400 text-sm mt-2 text-center">Bias correction improves early training</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="glass-card max-w-4xl mx-auto mt-12">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">🎯 The Complete Picture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-900/20 rounded-xl">
                <div className="text-4xl mb-2">🏎️</div>
                <h4 className="font-semibold text-yellow-300">Momentum</h4>
                <p className="text-gray-400 text-sm">Adds velocity for faster convergence</p>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-xl">
                <div className="text-4xl mb-2">⚖️</div>
                <h4 className="font-semibold text-cyan-300">RMSProp</h4>
                <p className="text-gray-400 text-sm">Adapts learning rates per parameter</p>
              </div>
              <div className="text-center p-4 bg-green-900/20 rounded-xl">
                <div className="text-4xl mb-2">🔧</div>
                <h4 className="font-semibold text-green-300">Bias Correction</h4>
                <p className="text-gray-400 text-sm">Fixes cold start, improves early training</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                <span className="font-semibold text-yellow-400">Adam = Momentum + RMSProp + Bias Correction</span><br />
                The perfect combination for modern deep learning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
