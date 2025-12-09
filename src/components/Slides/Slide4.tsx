'use client'

import { useState } from 'react'
import { Calculator, ChevronRight, ChevronLeft, Brain, Zap, Target, Rocket, TrendingUp } from 'lucide-react'

export default function Slide4() {
  const [activeConcept, setActiveConcept] = useState('standard')
  const [showAdagradDemo, setShowAdagradDemo] = useState(false)
  const [gdParams, setGdParams] = useState({ start: 10.0, alpha: 0.1 })
  const [momentumParams, setMomentumParams] = useState({ start: 10.0, alpha: 0.1, beta: 0.5 })
  const [momentumCalculations, setMomentumCalculations] = useState<any[]>([])

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
      equation: 'g²ₜ = Σ(∇fᵢ)²\nθₜ = θₜ₋₁ - α/(√g²ₜ + ε)',
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

  const calculateGradientDescent = () => {
    const { start, alpha } = gdParams
    const grad0 = 2 * start
    const theta1 = start - alpha * grad0
    const grad1 = 2 * theta1
    const theta2 = theta1 - alpha * grad1
    
    return { start, alpha, grad0, theta1, grad1, theta2 }
  }

  const calculateMomentum = () => {
    const { start, alpha, beta } = momentumParams
    const calculations = []
    let theta = start
    let velocity = 0
    
    for (let i = 0; i < 3; i++) {
      const gradient = 2 * theta
      velocity = beta * velocity + gradient
      const newTheta = theta - alpha * velocity
      const descent = Math.abs(theta - newTheta)
      
      calculations.push({
        iter: i + 1,
        theta,
        gradient,
        velocity,
        newTheta,
        descent
      })
      
      theta = newTheta
    }
    
    setMomentumCalculations(calculations)
  }

  const StandardGDExample = () => {
    const gd = calculateGradientDescent()
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Demonstration: f(θ) = θ²
        </h4>
        
        <div className="text-sm space-y-2">
          <div>Function: f(θ) = θ²</div>
          <div>Gradient: ∇f(θ) = 2θ</div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Starting θ(0)</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={gdParams.start}
              onChange={(e) => setGdParams({...gdParams, start: parseFloat(e.target.value)})}
              className="w-full"
            />
            <div className="text-xs text-center">{gdParams.start.toFixed(1)}</div>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Learning Rate α</label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={gdParams.alpha}
              onChange={(e) => setGdParams({...gdParams, alpha: parseFloat(e.target.value)})}
              className="w-full"
            />
            <div className="text-xs text-center">{gdParams.alpha.toFixed(2)}</div>
          </div>
        </div>

        <div className="p-3 bg-black/30 rounded">
          <div className="text-sm mb-2">
            Starting at θ(0) = {gd.start} with α = {gd.alpha}
          </div>
          
          <div className="text-xs space-y-2">
            <div>
              <strong>Iteration 1:</strong>
              <div className="ml-2">Gradient = 2 × {gd.start} = <span className="text-yellow-300">{gd.grad0.toFixed(1)}</span></div>
              <div className="ml-2">θ(1) = {gd.start} - {gd.alpha} × {gd.grad0.toFixed(1)} = <span className="text-green-300">{gd.theta1.toFixed(2)}</span></div>
              <div className="ml-2">Descent: {Math.abs(gd.start - gd.theta1).toFixed(2)}</div>
            </div>
            
            <div>
              <strong>Iteration 2:</strong>
              <div className="ml-2">Gradient = 2 × {gd.theta1.toFixed(2)} = <span className="text-yellow-300">{gd.grad1.toFixed(2)}</span></div>
              <div className="ml-2">θ(2) = {gd.theta1.toFixed(2)} - {gd.alpha} × {gd.grad1.toFixed(2)} = <span className="text-green-300">{gd.theta2.toFixed(2)}</span></div>
              <div className="ml-2">Descent: {Math.abs(gd.theta1 - gd.theta2).toFixed(2)} ⬇️</div>
            </div>
          </div>

          <div className="mt-3 text-sm text-red-300">
            ⚠️ <strong>Problem:</strong> Descent shrinks from <strong>{Math.abs(gd.start - gd.theta1).toFixed(2)}</strong> to <strong>{Math.abs(gd.theta1 - gd.theta2).toFixed(2)}</strong>!
          </div>
        </div>

        <div className="mt-4 p-3 bg-red-900/20 rounded">
          <h5 className="font-semibold mb-2 text-red-300">📉 The Deceleration Problem</h5>
          <div className="text-xs space-y-1">
            <div><strong>Why this happens:</strong></div>
            <div>1. Near minimum: ∇f(θ) → 0</div>
            <div>2. Update: θₜ = θₜ₋₁ - α × (tiny gradient)</div>
            <div>3. Steps become infinitesimally small</div>
            <div>4. Convergence takes forever!</div>
          </div>
        </div>
      </div>
    )
  }

  const MomentumExample = () => {
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Demonstration: Controlled Acceleration
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm mb-3">🎯 Physics Analogy</div>
            <div className="text-xs space-y-2">
              <div className="p-2 bg-yellow-900/20 rounded">
                <strong>Without Momentum:</strong>
                <div className="ml-2">• Like walking in molasses</div>
                <div className="ml-2">• Each step independent</div>
                <div className="ml-2">• No carry-over energy</div>
              </div>
              
              <div className="p-2 bg-yellow-900/20 rounded">
                <strong>With Momentum:</strong>
                <div className="ml-2">• Like a rolling ball</div>
                <div className="ml-2">• Past motion influences present</div>
                <div className="ml-2">• Energy accumulates</div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Starting θ(0)</label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="0.1"
                  value={momentumParams.start}
                  onChange={(e) => setMomentumParams({...momentumParams, start: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="text-xs text-center">{momentumParams.start.toFixed(1)}</div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Learning Rate α</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={momentumParams.alpha}
                  onChange={(e) => setMomentumParams({...momentumParams, alpha: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="text-xs text-center">{momentumParams.alpha.toFixed(2)}</div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Momentum β</label>
                <input
                  type="range"
                  min="0.0"
                  max="0.99"
                  step="0.01"
                  value={momentumParams.beta}
                  onChange={(e) => setMomentumParams({...momentumParams, beta: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="text-xs text-center">{momentumParams.beta.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={calculateMomentum}
          className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors"
        >
          Calculate with Momentum
        </button>

        {momentumCalculations.length > 0 && (
          <div className="space-y-4">
            <div className="p-3 bg-black/30 rounded">
              <div className="text-sm mb-3">
                Starting at θ(0) = {momentumParams.start}, α = {momentumParams.alpha}, β = {momentumParams.beta}
              </div>
              
              {momentumCalculations.map((calc, index) => (
                <div key={calc.iter} className="mb-3">
                  <div className="font-semibold">Iteration {calc.iter}:</div>
                  <div className="text-xs ml-2 space-y-1">
                    <div>Gradient = 2 × {calc.theta.toFixed(1)} = <span className="text-yellow-300">{calc.gradient.toFixed(1)}</span></div>
                    <div>Velocity = {momentumParams.beta.toFixed(2)} × {index === 0 ? '0' : momentumCalculations[index-1].velocity.toFixed(1)} + {calc.gradient.toFixed(1)} = <span className="text-yellow-300">{calc.velocity.toFixed(1)}</span></div>
                    <div>θ({calc.iter}) = {calc.theta.toFixed(1)} - {momentumParams.alpha.toFixed(2)} × {calc.velocity.toFixed(1)} = <span className="text-green-300">{calc.newTheta.toFixed(2)}</span></div>
                    <div>Descent: <span className="text-green-300">{calc.descent.toFixed(2)}</span></div>
                    
                    {index > 0 && (
                      <div className="text-green-400">
                        🚀 Acceleration: {momentumCalculations[index-1].descent.toFixed(2)} → {calc.descent.toFixed(2)} (+{(calc.descent - momentumCalculations[index-1].descent).toFixed(2)})
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-yellow-900/20 rounded">
              <h5 className="font-semibold mb-2 text-yellow-300">🏆 Comparison Results</h5>
              <div className="text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-yellow-800">
                      <th className="text-left py-1">Metric</th>
                      <th className="text-left py-1">Standard GD</th>
                      <th className="text-left py-1">GD with Momentum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">θ(1)</td>
                      <td className="py-1">8.0</td>
                      <td className="py-1 text-green-300">8.0</td>
                    </tr>
                    <tr>
                      <td className="py-1">θ(2)</td>
                      <td className="py-1">6.4</td>
                      <td className="py-1 text-green-300 font-bold">5.4</td>
                    </tr>
                    <tr>
                      <td className="py-1">Descent (t=1→2)</td>
                      <td className="py-1">1.6</td>
                      <td className="py-1 text-green-300 font-bold">2.6</td>
                    </tr>
                    <tr>
                      <td className="py-1">θ(4)</td>
                      <td className="py-1">3.277</td>
                      <td className="py-1 text-green-300 font-bold">0.084</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 text-center text-green-300">
                  ✅ Controlled Acceleration Achieved!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const AdaGradExample = () => {
    return (
      <div className="space-y-6">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Why Standard GD Fails Here
        </h4>

        <pre className="text-xs bg-black/30 p-3 rounded overflow-x-auto">
{`# Try standard GD with α=0.01
Start: θ(0) = [1.5, 10]

Iteration 1:
gradient = [100*1.5, 2*10] = [150, 20]
update = 0.01 * [150, 20] = [1.5, 0.2]
θ(1) = [0.0, 9.8]  // x overshot to 0!

Iteration 3:
θ(3) = [0.0, 9.22]  // y barely moved!`}
        </pre>

        <div className="p-3 bg-blue-900/20 rounded">
          <div className="font-semibold text-blue-300 mb-2">Observation:</div>
          <ul className="text-sm space-y-1">
            <li>• α=0.01 perfect for x → reaches 0 in one step</li>
            <li>• Same α crippling small for y → barely moves</li>
          </ul>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h5 className="font-semibold text-lg mb-3 text-green-300">🎯 AdaGrad Solution: Unique Learning Rates</h5>
          <div className="text-sm mb-3">
            Give each parameter its own learning rate that adapts over time.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900/20 p-3 rounded">
              <div className="font-semibold text-blue-300 mb-2">📝 AdaGrad Algorithm</div>
              <div className="text-xs space-y-1">
                <div>gₜ² = Σ(∇fᵢ)² (running total of squared gradients)</div>
                <div>adaptive_lr = α / √(gₜ² + ε)</div>
                <div>θₜ = θₜ₋₁ - adaptive_lr · ∇f(θₜ₋₁)</div>
              </div>
            </div>
            
            <div className="bg-blue-900/20 p-3 rounded">
              <div className="font-semibold text-blue-300 mb-2">🔧 How It Works</div>
              <div className="text-xs">
                <pre className="whitespace-pre-wrap">
{`g_squared = [0, 0, ...]
for each iteration:
  gradient = compute_gradient(θ)
  g_squared += gradient²
  adaptive_lr = α / (sqrt(g_squared) + ε)
  θ = θ - adaptive_lr * gradient`}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowAdagradDemo(!showAdagradDemo)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              {showAdagradDemo ? 'Hide Demo' : 'Show AdaGrad in Action'}
            </button>

            {showAdagradDemo && (
              <div className="mt-4 p-4 bg-green-900/20 rounded-lg">
                <div className="font-semibold text-green-300 mb-2">AdaGrad in Action:</div>
                <div className="text-sm space-y-2">
                  <div><strong>Starting:</strong> θ(0) = [1.5, 10], α = 1.5 (aggressive!)</div>
                  <div><strong>Iteration 1:</strong></div>
                  <ul className="ml-4 space-y-1">
                    <li>• gradient = [150, 20]</li>
                    <li>• g_squared = [22500, 400]</li>
                    <li>• adaptive_lr_x = 1.5 / √22500 = <span className="text-yellow-300">0.01</span></li>
                    <li>• adaptive_lr_y = 1.5 / √400 = <span className="text-yellow-300">0.075</span></li>
                    <li>• update_x = 0.01 × 150 = 1.5</li>
                    <li>• update_y = 0.075 × 20 = 1.5</li>
                    <li>• θ(1) = [0.0, 8.5] ✅</li>
                  </ul>
                  <div className="mt-2 font-semibold">
                    Result at t=4:
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <div className="text-red-300">Standard GD: θ(4) = [0.0, 9.22]</div>
                      <div className="text-green-300">AdaGrad: θ(4) = [0.0, 6.7] 🎉</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 p-3 bg-red-900/20 rounded">
          <h5 className="font-semibold mb-2 text-red-300">⚠️ The Fatal Flaw: Dying Learning Rate Problem</h5>
          <div className="text-xs space-y-1">
            <div><strong>Why AdaGrad Eventually Fails:</strong></div>
            <div>The Problem: gₜ² only accumulates, never decreases!</div>
            <div>As t → ∞, gₜ² → ∞</div>
            <div>Then: adaptive_lr = α / √(gₜ² + ε) → 0</div>
            <div><strong>Consequence:</strong> All learning rates shrink to zero → training stops prematurely!</div>
          </div>
        </div>
      </div>
    )
  }

  const AdamExample = () => {
    return (
      <div className="space-y-6">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          The Complete Package: Two Engines
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-900/20 p-3 rounded">
            <h5 className="font-semibold text-green-300 mb-2">1. The Direction Engine (Momentum)</h5>
            <div className="text-sm mb-2">Exponentially Weighted Moving Average (EWMA) of gradients</div>
            <div className="text-xs space-y-1">
              <div><strong>Purpose:</strong> Smooths the gradient path, maintains velocity</div>
              <div><strong>Formula:</strong> mₜ = β₁mₜ₋₁ + (1 - β₁)gₜ</div>
              <div><strong>Default:</strong> β₁ = 0.9 (long memory)</div>
            </div>
          </div>
          
          <div className="bg-green-900/20 p-3 rounded">
            <h5 className="font-semibold text-green-300 mb-2">2. The Adaptive Rate Engine (RMSprop)</h5>
            <div className="text-sm mb-2">EWMA of squared gradients</div>
            <div className="text-xs space-y-1">
              <div><strong>Purpose:</strong> Per-parameter learning rates that adapt but don't vanish</div>
              <div><strong>Formula:</strong> vₜ = β₂vₜ₋₁ + (1 - β₂)gₜ²</div>
              <div><strong>Default:</strong> β₂ = 0.999</div>
              <div><strong>Fixes AdaGrad:</strong> No infinite accumulation!</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-900/30 rounded">
          <h5 className="font-semibold mb-2 text-green-300">🎯 The Secret Sauce: Bias Correction</h5>
          <div className="text-sm mb-2">Fixes cold start problem</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="text-xs">
              <div><strong>The Problem:</strong></div>
              <div>• Initialization: m₀ = 0, v₀ = 0</div>
              <div>• Early steps are underestimated</div>
              <div>• Slow start to training</div>
            </div>
            
            <div className="text-xs">
              <div><strong>The Solution:</strong></div>
              <div>• m̂ₜ = mₜ / (1 - β₁ᵗ)</div>
              <div>• v̂ₜ = vₜ / (1 - β₂ᵗ)</div>
              <div>• Early: Amplifies steps for faster start</div>
              <div>• Later: Correction turns itself off</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-900/50 rounded">
          <h5 className="font-semibold mb-2">⚙️ Default Hyperparameters</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="text-center p-2 bg-green-900/30 rounded">
              <div>β₁</div>
              <div className="font-bold">0.9</div>
              <div className="text-gray-400">Momentum</div>
            </div>
            <div className="text-center p-2 bg-green-900/30 rounded">
              <div>β₂</div>
              <div className="font-bold">0.999</div>
              <div className="text-gray-400">Squared gradient</div>
            </div>
            <div className="text-center p-2 bg-green-900/30 rounded">
              <div>α</div>
              <div className="font-bold">0.001</div>
              <div className="text-gray-400">Learning rate</div>
            </div>
            <div className="text-center p-2 bg-green-900/30 rounded">
              <div>ε</div>
              <div className="font-bold">10⁻⁸</div>
              <div className="text-gray-400">Stability</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-900/20 rounded">
          <h5 className="font-semibold mb-2 text-green-300">✅ Adam Achieves:</h5>
          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>• Fast convergence (Momentum)</div>
            <div>• Per-parameter adaptation (AdaGrad/RMSprop)</div>
            <div>• No dying learning rates (RMSprop)</div>
            <div>• Good early training (Bias correction)</div>
            <div>• Default parameters that usually work</div>
            <div>• Best of all worlds!</div>
          </div>
        </div>
      </div>
    )
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
                onClick={() => {
                  setActiveConcept(concept.id)
                  setShowAdagradDemo(false)
                }}
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
                  setShowAdagradDemo(false)
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
                  setShowAdagradDemo(false)
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                disabled={currentIndex === concepts.length - 1}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Concept Details - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Description and Problem */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">📖 Description & Problem</h3>
                  <div className={`p-4 rounded-lg ${getBgColorClass(currentConcept.color)}`}>
                    <p className="text-gray-300 leading-relaxed mb-3">{currentConcept.description}</p>
                    <p className="text-gray-300 leading-relaxed">{currentConcept.explanation}</p>
                  </div>
                </div>

                {/* Specific Problem/Function for each concept */}
                {currentConcept.id === 'standard' && (
                  <div className={`p-4 rounded-lg ${getBgColorClass('red')}`}>
                    <h4 className="font-semibold text-lg mb-3">The Core Problem: Gradient Descent is Memoryless</h4>
                    <div className="text-sm space-y-2">
                      <p>At every step it calculates the gradient and takes a new step. That's it.</p>
                      <p><strong>As it gets closer to minimum:</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• The gradient shrinks</li>
                        <li>• Steps get smaller and smaller</li>
                        <li>• <strong>Result: Painful Deceleration!</strong></li>
                      </ul>
                      <p className="italic mt-2">Like walking blindly toward a target with no sense of previous steps</p>
                    </div>
                  </div>
                )}

                {currentConcept.id === 'momentum' && (
                  <div className={`p-4 rounded-lg ${getBgColorClass('yellow')}`}>
                    <h4 className="font-semibold text-lg mb-3">Solution to Deceleration: Give the Algorithm Memory!</h4>
                    <div className="text-sm space-y-2">
                      <p className="italic mb-2">Imagine a ball rolling downhill - it builds up momentum and doesn't slow down.</p>
                      <p><strong>Key Insight:</strong> Add <strong>velocity</strong> term that accumulates past gradients.</p>
                    </div>
                  </div>
                )}

                {currentConcept.id === 'adagrad' && (
                  <div className={`p-4 rounded-lg ${getBgColorClass('blue')}`}>
                    <h4 className="font-semibold text-lg mb-3">⚖️ The Unbalanced Function</h4>
                    
                    <div className="mb-4">
                      <div className="font-mono text-sm mb-2">Function:</div>
                      <div className="text-center bg-black/30 p-3 rounded">
                        <div>f(x,y) = 50x² + y²</div>
                        <div>∇f = [100x, 2y]</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-blue-300">Parameter Sensitivities:</div>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>• <strong>x is "sensitive":</strong> Gradient = 100x (50× stronger!)</li>
                          <li>• <strong>y is "stubborn":</strong> Gradient = 2y (50× weaker!)</li>
                        </ul>
                        <div className="text-sm italic mt-2 text-blue-200">
                          Same learning rate cannot serve both!
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentConcept.id === 'adam' && (
                  <>
                    <div className={`p-4 rounded-lg ${getBgColorClass('green')}`}>
                      <h4 className="font-semibold text-lg mb-3">🏆 Adam = Momentum + RMSprop + Bias Correction</h4>
                      <div className="text-sm space-y-2">
                        <p><strong>The Best of Both Worlds:</strong></p>
                        <ul className="ml-4 space-y-1">
                          <li>1. <strong>Momentum</strong> for direction/speed</li>
                          <li>2. <strong>RMSprop</strong> for per-parameter adaptation (without dying rates)</li>
                          <li>3. <strong>Bias Correction</strong> for better early steps</li>
                        </ul>
                        
                        <div className="mt-3">
                          <p><strong>Adam fixes all previous problems:</strong></p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>No more deceleration (Momentum)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>No single learning rate (Per-parameter)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>No dying learning rates (RMSprop)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>No cold start (Bias correction)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Intuitive Interpretation moved here */}
                    <div className={`p-4 rounded-lg ${getBgColorClass('green')}`}>
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        🎯 Intuitive Interpretation
                      </h4>
                      <div className="text-sm space-y-3">
                        <div>
                          <div className="font-semibold">The Update Rule:</div>
                          <div>θ = θ - α × (momentum / volatility)</div>
                        </div>
                        
                        <div>
                          <div className="font-semibold">Breaking it down:</div>
                          <ul className="ml-4 space-y-2 mt-1">
                            <li>1. <strong>Numerator (m̂):</strong></li>
                            <li className="ml-4">• Smoothed gradient direction</li>
                            <li className="ml-4">• Momentum from past steps</li>
                            <li className="ml-4">• "Where should we go?"</li>
                            
                            <li>2. <strong>Denominator (√(v̂)):</strong></li>
                            <li className="ml-4">• Adaptive scaling factor</li>
                            <li className="ml-4">• Per-parameter adjustment</li>
                            <li className="ml-4">• "How big of a step?"</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-green-900/30 rounded">
                          <div className="font-semibold">Together:</div>
                          <ul className="mt-1 space-y-1">
                            <li>• Sensitive parameters: Small v̂ → bigger steps</li>
                            <li>• Stubborn parameters: Large v̂ → smaller steps</li>
                            <li>• Consistent momentum across all</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Core Equation and Example */}
              <div className="space-y-6">
                {/* Core Equation */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">📐 Core Equation</h3>
                  <div className={`p-6 bg-gray-900/50 rounded-xl border-l-4 ${getBorderColorClass(currentConcept.color)}`}>
                    <pre className="text-xl font-mono whitespace-pre-wrap text-gray-100">
                      {currentConcept.equation}
                    </pre>
                  </div>
                </div>

                {/* Example & Demonstration */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">🔍 Example & Demonstration</h3>
                  
                  {currentConcept.id === 'standard' && (
                    <StandardGDExample />
                  )}
                  
                  {currentConcept.id === 'momentum' && (
                    <MomentumExample />
                  )}
                  
                  {currentConcept.id === 'adagrad' && (
                    <AdaGradExample />
                  )}
                  
                  {currentConcept.id === 'adam' && (
                    <AdamExample />
                  )}
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
          </div>
        </div>
      </div>
    </div>
  )
}
