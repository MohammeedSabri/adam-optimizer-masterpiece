'use client'

import { useState } from 'react'
import { Calculator, ChevronRight, ChevronLeft, Brain } from 'lucide-react'

export default function Slide4() {
  const [activeConcept, setActiveConcept] = useState('standard')

  const concepts = [
    {
      id: 'standard',
      name: 'Standard GD',
      title: '1. Standard Gradient Descent: The Memoryless Step',
      description: 'Gradient Descent calculates the gradient and takes a new step at every iteration, with no memory of past gradients.',
      equation: 'θₜ = θₜ₋₁ - α · ∇f(θₜ₋₁)',
      explanation: 'Where α is the fixed learning rate. As gradient shrinks near minimum, steps get smaller → painful deceleration.',
      color: 'red'
    },
    {
      id: 'momentum',
      name: 'Momentum',
      title: '2. Gradient Descent with Momentum: Adding Velocity',
      description: 'Adds a velocity term that accumulates past gradients, like a heavy ball rolling downhill.',
      equation: 'vₜ = β · vₜ₋₁ + ∇f(θₜ₋₁)\nθₜ = θₜ₋₁ - α · vₜ',
      explanation: 'Where β is momentum coefficient (e.g., 0.9). Maintains velocity in consistent directions.',
      color: 'yellow'
    },
    {
      id: 'adagrad',
      name: 'AdaGrad',
      title: '3. AdaGrad: Per-Parameter Adaptation',
      description: 'Gives each parameter its own learning rate based on historical gradient magnitudes.',
      equation: 'g²ₜ = Σ(∇fᵢ)²\nθₜ = θₜ₋₁ - α/(√g²ₜ + ε) · ∇f(θₜ₋₁)',
      explanation: 'Sensitive parameters get small steps, stubborn parameters get larger steps.',
      color: 'blue'
    },
    {
      id: 'adam',
      name: 'Adam',
      title: '4. Adam: Adaptive Moment Estimation',
      description: 'Combines Momentum for direction and RMSProp for per-parameter adaptation, with bias correction.',
      equation: 'mₜ = β₁mₜ₋₁ + (1-β₁)∇fₜ\nvₜ = β₂vₜ₋₁ + (1-β₂)(∇fₜ)²\nθₜ = θₜ₋₁ - α·m̂ₜ/(√v̂ₜ + ε)',
      explanation: 'The ultimate optimizer: fast convergence + per-parameter adaptation + no dying rates.',
      color: 'green'
    }
  ]

  const currentConcept = concepts.find(c => c.id === activeConcept) || concepts[0]
  const currentIndex = concepts.findIndex(c => c.id === activeConcept)

  const getColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500'
      case 'yellow': return 'bg-yellow-500'
      case 'blue': return 'bg-blue-500'
      case 'green': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getTextColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-300'
      case 'yellow': return 'text-yellow-300'
      case 'blue': return 'text-blue-300'
      case 'green': return 'text-green-300'
      default: return 'text-gray-300'
    }
  }

  const getBgColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-900/30'
      case 'yellow': return 'bg-yellow-900/30'
      case 'blue': return 'bg-blue-900/30'
      case 'green': return 'bg-green-900/30'
      default: return 'bg-gray-900/30'
    }
  }

  const getBorderColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'border-red-500'
      case 'yellow': return 'border-yellow-500'
      case 'blue': return 'border-blue-500'
      case 'green': return 'border-green-500'
      default: return 'border-gray-500'
    }
  }

  return (
    <div id="slide-4" className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-4 py-2 rounded-full mb-4">
            <Calculator className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300">The Mathematics</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">🧮 Evolution of Gradient Descent</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From memoryless steps to intelligent, adaptive optimization
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {concepts.map((concept, index) => (
              <button
                key={concept.id}
                onClick={() => setActiveConcept(concept.id)}
                className={`flex flex-col items-center ${index <= currentIndex ? 'opacity-100' : 'opacity-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  activeConcept === concept.id
                    ? getColorClass(concept.color)
                    : 'bg-gray-800'
                }`}>
                  <span className="font-bold text-white">{index + 1}</span>
                </div>
                <span className={`text-sm font-medium ${activeConcept === concept.id ? getTextColorClass(concept.color) : 'text-gray-500'}`}>
                  {concept.name}
                </span>
              </button>
            ))}
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
              style={{ width: `${(currentIndex + 1) * 25}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-card max-w-5xl mx-auto">
          <div className="p-6 lg:p-8">
            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => {
                  const prevIndex = (currentIndex - 1 + concepts.length) % concepts.length
                  setActiveConcept(concepts[prevIndex].id)
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">{currentConcept.title}</h2>
                <div className={`inline-block px-3 py-1 rounded-full ${getBgColorClass(currentConcept.color)} ${getTextColorClass(currentConcept.color)} text-sm font-semibold`}>
                  {currentConcept.id === 'adam' ? 'The Ultimate Optimizer' : `Solves: ${currentConcept.name}'s problem`}
                </div>
              </div>

              <button
                onClick={() => {
                  const nextIndex = (currentIndex + 1) % concepts.length
                  setActiveConcept(concepts[nextIndex].id)
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                disabled={currentIndex === concepts.length - 1}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Concept Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">📖 Description</h3>
                  <p className="text-gray-300 leading-relaxed">{currentConcept.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">💡 Explanation</h3>
                  <p className="text-gray-300 leading-relaxed">{currentConcept.explanation}</p>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">📐 Core Equation</h3>
                  <div className={`p-6 bg-gray-900/50 rounded-xl border-l-4 ${getBorderColorClass(currentConcept.color)}`}>
                    <pre className="text-xl font-mono whitespace-pre-wrap text-gray-100">
                      {currentConcept.equation}
                    </pre>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3">🎨 Visual Representation</h3>
                  <div className="aspect-video bg-gray-900/50 rounded-xl flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-6xl mb-4">
                        {currentConcept.id === 'standard' && '📉'}
                        {currentConcept.id === 'momentum' && '⚡'}
                        {currentConcept.id === 'adagrad' && '🎯'}
                        {currentConcept.id === 'adam' && '🚀'}
                      </div>
                      <p className="text-gray-400">
                        {currentConcept.id === 'standard' && 'Small steps near minimum\nSlow convergence'}
                        {currentConcept.id === 'momentum' && 'Accumulated velocity\nSmoother path'}
                        {currentConcept.id === 'adagrad' && 'Per-parameter rates\nAdaptive scaling'}
                        {currentConcept.id === 'adam' && 'Momentum + RMSProp\nBest of both worlds'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">📊 Algorithm Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Algorithm</th>
                      <th className="text-left py-3 px-4">Key Idea</th>
                      <th className="text-left py-3 px-4">Strengths</th>
                      <th className="text-left py-3 px-4">Weaknesses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {concepts.map((concept) => (
                      <tr
                        key={concept.id}
                        className={`border-b border-gray-800 ${activeConcept === concept.id ? getBgColorClass(concept.color) : ''}`}
                      >
                        <td className="py-3 px-4 font-medium">{concept.name}</td>
                        <td className="py-3 px-4 text-gray-300">{concept.description.split('.')[0]}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full ${getBgColorClass(concept.color)} ${getTextColorClass(concept.color)} text-xs`}>
                            {concept.id === 'standard' && 'Simple, guaranteed convergence'}
                            {concept.id === 'momentum' && 'Faster convergence, reduces oscillation'}
                            {concept.id === 'adagrad' && 'Per-parameter adaptation'}
                            {concept.id === 'adam' && 'Fast + adaptive + robust'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {concept.id === 'standard' && 'Slow, memoryless'}
                          {concept.id === 'momentum' && 'Single learning rate'}
                          {concept.id === 'adagrad' && 'Dying learning rates'}
                          {concept.id === 'adam' && 'None! (Best of all)'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Adam Details */}
            {currentConcept.id === 'adam' && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-green-400" />
                  <h4 className="text-xl font-semibold">🏆 Adam: The Complete Package</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-900/30 rounded-lg">
                    <h5 className="font-semibold text-green-300 mb-2">Momentum Engine</h5>
                    <p className="text-gray-300 text-sm">mₜ = β₁mₜ₋₁ + (1-β₁)∇fₜ</p>
                    <p className="text-gray-400 text-xs mt-1">Adds velocity for direction</p>
                  </div>
                  <div className="p-4 bg-green-900/30 rounded-lg">
                    <h5 className="font-semibold text-green-300 mb-2">RMSProp Engine</h5>
                    <p className="text-gray-300 text-sm">vₜ = β₂vₜ₋₁ + (1-β₂)(∇fₜ)²</p>
                    <p className="text-gray-400 text-xs mt-1">Adapts learning rates</p>
                  </div>
                  <div className="p-4 bg-green-900/30 rounded-lg">
                    <h5 className="font-semibold text-green-300 mb-2">Bias Correction</h5>
                    <p className="text-gray-300 text-sm">m̂ₜ = mₜ/(1-β₁ᵗ), v̂ₜ = vₜ/(1-β₂ᵗ)</p>
                    <p className="text-gray-400 text-xs mt-1">Fixes cold start</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-300">
                    <strong>Default hyperparameters:</strong> β₁=0.9, β₂=0.999, α=0.001, ε=10⁻⁸
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}