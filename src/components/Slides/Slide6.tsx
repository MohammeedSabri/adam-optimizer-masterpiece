'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Sliders, Play, Pause, RotateCcw, ZoomIn, Layers, Zap, Target, TrendingDown, BarChart3 } from 'lucide-react'

// Dynamically import Plotly
const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-xl">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading 3D visualization...</p>
      </div>
    </div>
  )
})

// Rosenbrock function
const rosenbrock = (x: number, y: number): number => {
  return Math.pow(1 - x, 2) + 100 * Math.pow(y - x * x, 2)
}

// Gradient of Rosenbrock
const gradRosenbrock = (x: number, y: number): [number, number] => {
  const dx = -2 * (1 - x) - 400 * x * (y - x * x)
  const dy = 200 * (y - x * x)
  return [dx, dy]
}

export default function Slide6() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [iteration, setIteration] = useState(1)
  const [animationSpeed, setAnimationSpeed] = useState(2)
  const [params, setParams] = useState({
    startX: -1.5,
    startY: -1.0,
    learningRate: 0.5,
    beta1: 0.9,
    beta2: 0.99,
    surfaceOpacity: 0.7,
  })
  const [lossHistory, setLossHistory] = useState<number[]>([])
  const animationRef = useRef<NodeJS.Timeout>()
  
  const MAX_ITERATIONS = 300 // Increased from 200
  const GLOBAL_MINIMUM = [1, 1] as const

  // Generate COMPLETE path - recalculates LIVE when params change
  const generatePath = useMemo(() => {
    const pathX: number[] = [], pathY: number[] = [], pathZ: number[] = []
    const losses: number[] = []
    let x = params.startX
    let y = params.startY
    let mX = 0, mY = 0, vX = 0, vY = 0
    
    // Initial point
    pathX.push(x)
    pathY.push(y)
    const initialLoss = rosenbrock(x, y)
    pathZ.push(initialLoss)
    losses.push(initialLoss)
    
    const epsilon = 1e-8
    
    // Run Adam for ALL iterations
    for (let t = 1; t <= MAX_ITERATIONS; t++) {
      const [dx, dy] = gradRosenbrock(x, y)
      
      mX = params.beta1 * mX + (1 - params.beta1) * dx
      mY = params.beta1 * mY + (1 - params.beta1) * dy
      vX = params.beta2 * vX + (1 - params.beta2) * dx**2
      vY = params.beta2 * vY + (1 - params.beta2) * dy**2
      
      const mXHat = mX / (1 - params.beta1**t)
      const mYHat = mY / (1 - params.beta1**t)
      const vXHat = vX / (1 - params.beta2**t)
      const vYHat = vY / (1 - params.beta2**t)
      
      x -= params.learningRate * mXHat / (Math.sqrt(vXHat) + epsilon)
      y -= params.learningRate * mYHat / (Math.sqrt(vYHat) + epsilon)
      
      const loss = rosenbrock(x, y)
      pathX.push(x)
      pathY.push(y)
      pathZ.push(loss)
      losses.push(loss)
    }
    
    return { x: pathX, y: pathY, z: pathZ, losses }
  }, [params, MAX_ITERATIONS]) // This recalculates LIVE when params change!

  // Current path up to current iteration
  const currentPath = useMemo(() => {
    const end = Math.min(iteration, generatePath.x.length)
    return {
      x: generatePath.x.slice(0, end),
      y: generatePath.y.slice(0, end),
      z: generatePath.z.slice(0, end)
    }
  }, [iteration, generatePath])

  // Animation interval
  const getAnimationInterval = useCallback(() => {
    switch(animationSpeed) {
      case 1: return 80
      case 2: return 40
      case 4: return 20
      case 8: return 10
      default: return 40
    }
  }, [animationSpeed])

  // Animation effect
  useEffect(() => {
    if (isAnimating) {
      const interval = getAnimationInterval()
      animationRef.current = setInterval(() => {
        setIteration(prev => {
          if (prev >= MAX_ITERATIONS) {
            setIsAnimating(false)
            return MAX_ITERATIONS
          }
          return prev + 1
        })
      }, interval)
    } else if (animationRef.current) {
      clearInterval(animationRef.current)
    }
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isAnimating, getAnimationInterval, animationSpeed, MAX_ITERATIONS])

  // Update loss history and handle parameter changes
  useEffect(() => {
    const losses = generatePath.losses.slice(0, iteration)
    setLossHistory(losses)
    
    // If parameters changed while animating, continue animation with new path
    if (isAnimating && iteration > 1 && iteration < MAX_ITERATIONS) {
      // Keep animating with new path
    }
  }, [iteration, generatePath, isAnimating, MAX_ITERATIONS])

  // Generate surface data
  const surfaceData = useMemo(() => {
    const xRange: number[] = []
    const yRange: number[] = []
    const zMatrix: number[][] = []
    
    for (let x = -2; x <= 2; x += 0.1) {
      xRange.push(x)
    }
    for (let y = -1; y <= 3; y += 0.1) {
      yRange.push(y)
    }
    
    for (let j = 0; j < yRange.length; j++) {
      const row: number[] = []
      const y = yRange[j]
      for (let i = 0; i < xRange.length; i++) {
        const x = xRange[i]
        const z = rosenbrock(x, y)
        row.push(z > 1000 ? 1000 : z)
      }
      zMatrix.push(row)
    }
    
    return { x: xRange, y: yRange, z: zMatrix }
  }, [])

  // Update parameter - with LIVE recalculation
  const updateParam = (key: keyof typeof params, value: number) => {
    setParams(prev => ({...prev, [key]: value}))
    // Path auto-recalculates due to useMemo dependency
  }

  // Event handlers
  const handleReset = () => {
    setIsAnimating(false)
    setIteration(1)
  }

  const skipToEnd = () => {
    setIsAnimating(false)
    setIteration(MAX_ITERATIONS)
  }

  const handleIterationChange = (value: number) => {
    setIteration(value)
    if (isAnimating) setIsAnimating(false)
  }

  const speedButtons = [
    { speed: 1, label: '1x', color: 'gray' },
    { speed: 2, label: '2x', color: 'cyan' },
    { speed: 4, label: '4x', color: 'green' },
    { speed: 8, label: '8x', color: 'orange' },
  ]

  // Calculate metrics
  const currentX = currentPath.x[currentPath.x.length - 1] || params.startX
  const currentY = currentPath.y[currentPath.y.length - 1] || params.startY
  const currentLoss = rosenbrock(currentX, currentY)
  const [gradX, gradY] = gradRosenbrock(currentX, currentY)
  const gradientNorm = Math.sqrt(gradX**2 + gradY**2)
  
  const distanceToMinimum = Math.sqrt(
    (currentX - GLOBAL_MINIMUM[0])**2 + (currentY - GLOBAL_MINIMUM[1])**2
  )
  const globalMinZ = rosenbrock(GLOBAL_MINIMUM[0], GLOBAL_MINIMUM[1])
  const startLoss = rosenbrock(params.startX, params.startY)

  // Prepare 3D plot data - UPDATES LIVE when params change
  const plot3DData = [
    // Rosenbrock surface
    {
      type: 'surface',
      x: surfaceData.x,
      y: surfaceData.y,
      z: surfaceData.z,
      colorscale: [
        [0, 'rgb(12, 51, 131)'],
        [0.25, 'rgb(10, 136, 186)'],
        [0.5, 'rgb(242, 211, 56)'],
        [0.75, 'rgb(242, 143, 56)'],
        [1, 'rgb(217, 30, 30)']
      ],
      opacity: params.surfaceOpacity,
      showscale: true,
      colorbar: {
        title: 'Loss Value',
        titleside: 'right',
        titlefont: { color: 'white', size: 12 },
        tickfont: { color: 'white', size: 10 },
        thickness: 20,
        len: 0.8
      },
      contours: {
        z: {
          show: true,
          usecolormap: true,
          highlightcolor: "#FFD700",
          project: { z: true }
        }
      },
      lighting: {
        ambient: 0.7,
        diffuse: 0.9,
        roughness: 0.5,
        specular: 0.8
      },
      name: 'Rosenbrock Surface',
      hoverinfo: 'x+y+z+name',
      showlegend: true
    },
    // Adam path - UPDATES LIVE with current iteration or parameter changes
    {
      type: 'scatter3d',
      mode: 'lines+markers',
      name: 'Adam Path',
      x: currentPath.x,
      y: currentPath.y,
      z: currentPath.z.map(z => z + 0.02),
      line: {
        color: '#FF0000',
        width: 8,
      },
      marker: {
        size: 5,
        color: '#FFD700',
        symbol: 'circle',
        line: {
          color: '#000000',
          width: 1
        }
      },
      opacity: 1,
      hoverinfo: 'x+y+z+name',
      showlegend: true
    },
    // Current position
    {
      type: 'scatter3d',
      mode: 'markers',
      name: 'Current Position',
      x: [currentX],
      y: [currentY],
      z: [currentLoss + 0.05],
      marker: {
        size: 10,
        color: '#FFD700',
        symbol: 'diamond',
        line: {
          color: '#FFFFFF',
          width: 2
        }
      },
      hoverinfo: 'x+y+z+name',
      showlegend: true
    },
    // Global minimum
    {
      type: 'scatter3d',
      mode: 'markers',
      name: 'Global Minimum (1,1)',
      x: [GLOBAL_MINIMUM[0]],
      y: [GLOBAL_MINIMUM[1]],
      z: [globalMinZ],
      marker: {
        size: 8,
        color: '#00FF00',
        symbol: 'x',
        line: {
          color: '#FFFFFF',
          width: 3
        }
      },
      hoverinfo: 'x+y+z+name',
      showlegend: true
    },
    // Start point
    {
      type: 'scatter3d',
      mode: 'markers',
      name: 'Start Point',
      x: [params.startX],
      y: [params.startY],
      z: [startLoss],
      marker: {
        size: 9,
        color: '#00BFFF',
        symbol: 'circle',
        line: {
          color: '#FFFFFF',
          width: 2
        }
      },
      hoverinfo: 'x+y+z+name',
      showlegend: true
    }
  ]

  const plot3DLayout = {
    title: {
      text: `Adam on Rosenbrock • Iteration: ${iteration}/${MAX_ITERATIONS}${isAnimating ? ' • LIVE' : ''}`,
      font: { color: 'white', size: 16 }
    },
    scene: {
      xaxis: {
        title: 'X Coordinate',
        gridcolor: 'rgba(255,255,255,0.2)',
        backgroundcolor: 'rgba(20,20,40,0.5)',
        showbackground: true,
        zerolinecolor: 'rgba(255,255,255,0.5)',
        zerolinewidth: 2,
        range: [-2, 2],
        showgrid: true,
        gridwidth: 1,
        titlefont: { color: 'white', size: 12 }
      },
      yaxis: {
        title: 'Y Coordinate',
        gridcolor: 'rgba(255,255,255,0.2)',
        backgroundcolor: 'rgba(20,20,40,0.5)',
        showbackground: true,
        zerolinecolor: 'rgba(255,255,255,0.5)',
        zerolinewidth: 2,
        range: [-1, 3],
        showgrid: true,
        gridwidth: 1,
        titlefont: { color: 'white', size: 12 }
      },
      zaxis: {
        title: 'Loss (clipped)',
        gridcolor: 'rgba(255,255,255,0.2)',
        backgroundcolor: 'rgba(40,20,20,0.5)',
        showbackground: true,
        zerolinecolor: 'rgba(255,255,255,0.5)',
        zerolinewidth: 2,
        range: [0, 1000],
        showgrid: true,
        gridwidth: 1,
        titlefont: { color: 'white', size: 12 }
      },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.2 }
      },
      aspectmode: 'cube',
      bgcolor: 'rgba(0,0,0,0)',
      dragmode: 'orbit'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: 'white',
      family: 'Arial, sans-serif',
      size: 12
    },
    margin: { l: 0, r: 0, b: 0, t: 50 },
    autosize: true,
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: 'rgba(0,0,0,0.7)',
      bordercolor: 'rgba(255,255,255,0.3)',
      borderwidth: 1,
      font: { color: 'white', size: 10 },
      orientation: 'v'
    }
  }

  // 2D Loss Plot Data
  const plot2DData = [
    {
      type: 'scatter',
      mode: 'lines',
      x: Array.from({length: lossHistory.length}, (_, i) => i),
      y: lossHistory,
      line: {
        color: '#00FF7F',
        width: 2,
      },
      name: 'Loss',
      fill: 'tozeroy',
      fillcolor: 'rgba(0, 255, 127, 0.1)'
    }
  ]

  const plot2DLayout = {
    title: 'Loss Convergence',
    xaxis: {
      title: 'Iteration',
      gridcolor: 'rgba(255,255,255,0.1)',
      zerolinecolor: 'rgba(255,255,255,0.3)',
      showgrid: true,
      gridwidth: 1,
      range: [0, MAX_ITERATIONS]
    },
    yaxis: {
      title: 'Loss',
      gridcolor: 'rgba(255,255,255,0.1)',
      zerolinecolor: 'rgba(255,255,255,0.3)',
      type: 'log',
      showgrid: true,
      gridwidth: 1
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: 'white',
      family: 'Arial, sans-serif',
      size: 12
    },
    margin: { l: 60, r: 30, b: 60, t: 50 },
    autosize: true,
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: 'rgba(0,0,0,0.7)',
      font: { color: 'white', size: 10 }
    }
  }

  const plotConfig = {
    responsive: true,
    displayModeBar: true,
    scrollZoom: true,
    displayModeBarTips: false,
    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'] as any[]
  }

  return (
    <div id="slide-6" className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-violet-600/20 px-4 py-2 rounded-full mb-3">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Animation + LIVE Updates</span>
          </div>
          
          {/* UPDATED TITLE SECTION WITH FUNCTION */}
          <h1 className="text-3xl font-bold mb-2">🏔️ Rosenbrock Valley f(x,y) = (1-x)² + 100(y-x²)²</h1>
          
          <div className="text-lg text-cyan-300 font-mono mb-2">
            Global Minimum at (1,1) with f(1,1)=0
          </div>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Watch animation AND adjust parameters in real-time
            <span className="text-yellow-400 font-mono ml-2">Iterations: {MAX_ITERATIONS}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel: Controls */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-5 h-full">
              <h2 className="text-xl font-bold mb-5 flex items-center">
                <Sliders className="w-5 h-5 mr-2 text-cyan-400" />
                Dual Controls
              </h2>

              {/* Adam Parameters - LIVE updates */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Adam Parameters (LIVE)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Start Position: ({params.startX.toFixed(1)}, {params.startY.toFixed(1)})
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-xs text-gray-500">X₀</span>
                        <input
                          type="range"
                          min="-2"
                          max="2"
                          step="0.1"
                          value={params.startX}
                          onChange={(e) => updateParam('startX', parseFloat(e.target.value))}
                          className="w-full accent-cyan-500 h-1.5"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Y₀</span>
                        <input
                          type="range"
                          min="-1"
                          max="3"
                          step="0.1"
                          value={params.startY}
                          onChange={(e) => updateParam('startY', parseFloat(e.target.value))}
                          className="w-full accent-pink-500 h-1.5"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Learning Rate: {params.learningRate.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="0.01"
                      max="1.0"
                      step="0.01"
                      value={params.learningRate}
                      onChange={(e) => updateParam('learningRate', parseFloat(e.target.value))}
                      className="w-full accent-green-500 h-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      β₁ (Momentum): {params.beta1.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="0.99"
                      step="0.001"
                      value={params.beta1}
                      onChange={(e) => updateParam('beta1', parseFloat(e.target.value))}
                      className="w-full accent-purple-500 h-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      β₂ (RMSProp): {params.beta2.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="0.9"
                      max="0.999"
                      step="0.001"
                      value={params.beta2}
                      onChange={(e) => updateParam('beta2', parseFloat(e.target.value))}
                      className="w-full accent-yellow-500 h-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Surface Opacity: {params.surfaceOpacity.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={params.surfaceOpacity}
                      onChange={(e) => updateParam('surfaceOpacity', parseFloat(e.target.value))}
                      className="w-full accent-blue-500 h-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Animation Controls */}
              <div className="mb-6 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-300">Animation Control</div>
                  <div className="font-bold text-cyan-300">
                    {iteration}<span className="text-gray-400 text-sm">/{MAX_ITERATIONS}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max={MAX_ITERATIONS}
                  value={iteration}
                  onChange={(e) => handleIterationChange(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5"
                />
                
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => setIteration(Math.max(1, iteration - 20))}
                    className="flex-1 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs"
                  >
                    ← -20
                  </button>
                  <button
                    onClick={() => setIteration(Math.min(MAX_ITERATIONS, iteration + 20))}
                    className="flex-1 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs"
                  >
                    +20 →
                  </button>
                </div>
              </div>

              {/* Speed Control */}
              <div className="mb-6 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-300 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    Animation Speed
                  </div>
                  <div className="text-lg font-bold text-yellow-300">
                    {animationSpeed}x
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {speedButtons.map(({ speed, label, color }) => (
                    <button
                      key={speed}
                      onClick={() => setAnimationSpeed(speed)}
                      className={`py-1.5 rounded text-xs font-medium transition-all ${
                        animationSpeed === speed
                          ? `bg-${color}-600 text-white`
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  disabled={iteration >= MAX_ITERATIONS}
                  className={`col-span-2 flex items-center justify-center space-x-2 py-2 rounded-lg ${
                    isAnimating
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  } ${iteration >= MAX_ITERATIONS ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isAnimating ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span className="text-sm">Pause Animation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Start Animation</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center space-x-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm">Reset</span>
                </button>
                
                <button
                  onClick={skipToEnd}
                  className="flex items-center justify-center space-x-1 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span className="text-sm">Skip to End</span>
                </button>
              </div>

              {/* Current Metrics - LIVE updates */}
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-300 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    LIVE Metrics
                  </div>
                  <div className="font-bold text-green-400">
                    {currentLoss.toFixed(4)}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Start Loss:</span>
                    <span>{startLoss.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance to Min:</span>
                    <span className="text-cyan-300">{distanceToMinimum.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gradient Norm:</span>
                    <span className="text-purple-300">{gradientNorm.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Global Min:</span>
                    <span className="text-green-300">0.0000 at (1,1)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Visualizations */}
          <div className="lg:col-span-3">
            {/* 3D Plot */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl mb-6 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-cyan-400" />
                      Interactive 3D Visualization
                    </h2>
                    <div className="text-sm text-gray-400 mt-1">
                      <span className="text-cyan-400">● Start</span> • 
                      <span className="text-green-400 ml-2">✗ Global Min</span> • 
                      <span className="text-yellow-400 ml-2">◆ Current</span> • 
                      <span className="text-red-400 ml-2">Path updates LIVE</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>{isAnimating ? 'Animating' : 'Paused'} • {animationSpeed}x • {iteration}/{MAX_ITERATIONS}</span>
                  </div>
                </div>
              </div>
              <div className="h-[500px] bg-gradient-to-br from-gray-900/50 to-black/50">
                <Plot
                  data={plot3DData as any}
                  layout={plot3DLayout as any}
                  style={{ width: '100%', height: '100%' }}
                  config={plotConfig}
                  useResizeHandler={true}
                />
              </div>
            </div>

            {/* 2D Loss Plot & Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                    <h2 className="text-xl font-bold">Loss Convergence</h2>
                  </div>
                  <div className="h-[250px]">
                    <Plot
                      data={plot2DData as any}
                      layout={plot2DLayout as any}
                      style={{ width: '100%', height: '100%' }}
                      config={plotConfig}
                      useResizeHandler={true}
                    />
                  </div>
                </div>
              </div>

              {/* Performance Panel */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 h-full">
                  <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Convergence Rate</div>
                      <div className="font-bold text-lg text-green-400">
                        {lossHistory.length > 2
                          ? ((lossHistory[lossHistory.length-2] - lossHistory[lossHistory.length-1]) /
                             lossHistory[lossHistory.length-2] * 100).toFixed(2) + '%'
                          : '0.00%'}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                      <div className="text-xs text-gray-300 mb-1">Path Efficiency</div>
                      <div className="font-bold text-lg text-cyan-400">
                        {((iteration / MAX_ITERATIONS) * 100).toFixed(0)}% Complete
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-700/30">
                      <div className="text-xs text-gray-300 mb-1">Learning Progress</div>
                      <div className="font-bold text-lg text-purple-300">
                        {(((startLoss - currentLoss) / startLoss) * 100).toFixed(1)}%
                      </div>
                    </div>
                    
                    <div className="p-3 bg-amber-900/20 rounded-lg border border-amber-700/30">
                      <div className="text-xs text-amber-300">
                        💡 Adjust parameters ANYTIME to see LIVE updates
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
              <h3 className="text-lg font-bold mb-3">🎯 How It Works:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-900/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. Watch Animation</h4>
                  <p className="text-sm text-gray-300">
                    Click "Start Animation" to watch Adam navigate the Rosenbrock valley step by step.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-900/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">2. Adjust LIVE</h4>
                  <p className="text-sm text-gray-300">
                    Change ANY parameter (learning rate, betas, start position) and see the path update instantly.
                  </p>
                </div>
                
                <div className="p-3 bg-green-900/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">3. Control Flow</h4>
                  <p className="text-sm text-gray-300">
                    Animation continues with new path when you adjust parameters. Pause/Reset/Skip as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
