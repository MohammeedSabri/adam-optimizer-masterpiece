'use client'

import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Brain, Cpu, GitBranch, Target, Zap, BarChart } from 'lucide-react'

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

// Generate synthetic 3D clusters
const generateClusters = (n: number = 400, seed: number = 42) => {
  const clusters = []
  
  // Cluster A (Red)
  for (let i = 0; i < n/3; i++) {
    clusters.push({
      x: 1 + Math.random() * 1.5 - 0.75,
      y: 1 + Math.random() * 1.5 - 0.75,
      z: 1 + Math.random() * 1.5 - 0.75,
      cluster: 'Cluster A',
      color: '#FF2B2B'
    })
  }
  
  // Cluster B (Green)
  for (let i = 0; i < n/3; i++) {
    clusters.push({
      x: 4 + Math.random() * 1.5 - 0.75,
      y: 4 + Math.random() * 1.5 - 0.75,
      z: 1 + Math.random() * 1.5 - 0.75,
      cluster: 'Cluster B',
      color: '#00FF55'
    })
  }
  
  // Cluster C (Blue)
  for (let i = 0; i < n/3; i++) {
    clusters.push({
      x: 2 + Math.random() * 1.5 - 0.75,
      y: 5 + Math.random() * 1.5 - 0.75,
      z: 5 + Math.random() * 1.5 - 0.75,
      cluster: 'Cluster C',
      color: '#3399FF'
    })
  }
  
  return clusters
}

export default function Slide8() {
  const [selectedClassifier, setSelectedClassifier] = useState<'KNN' | 'RF'>('KNN')
  const [resolution, setResolution] = useState(15)
  const [showDecisionBoundary, setShowDecisionBoundary] = useState(true)
  
  // Generate data
  const clusters = useMemo(() => generateClusters(400), [])
  
  // Prepare plot data
  const plotData = useMemo(() => {
    const data = []
    
    // Add decision boundary grid if enabled
    if (showDecisionBoundary) {
      // Simplified decision boundary visualization
      const gridSize = resolution
      const gridPoints = []
      const colors = []
      
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          for (let k = 0; k < gridSize; k++) {
            const x = i * 6 / gridSize
            const y = j * 6 / gridSize
            const z = k * 6 / gridSize
            
            // Simple distance-based decision (simplified for demo)
            const dA = Math.sqrt((x-1)**2 + (y-1)**2 + (z-1)**2)
            const dB = Math.sqrt((x-4)**2 + (y-4)**2 + (z-1)**2)
            const dC = Math.sqrt((x-2)**2 + (y-5)**2 + (z-5)**2)
            
            let color
            if (dA < dB && dA < dC) color = 'rgba(255, 43, 43, 0.1)'
            else if (dB < dA && dB < dC) color = 'rgba(0, 255, 85, 0.1)'
            else color = 'rgba(51, 153, 255, 0.1)'
            
            gridPoints.push([x, y, z])
            colors.push(color)
          }
        }
      }
      
      if (gridPoints.length > 0) {
        data.push({
          type: 'scatter3d',
          mode: 'markers',
          x: gridPoints.map(p => p[0]),
          y: gridPoints.map(p => p[1]),
          z: gridPoints.map(p => p[2]),
          marker: {
            size: 3,
            color: colors,
            opacity: 0.3
          },
          name: 'Decision Regions',
          showlegend: false
        })
      }
    }
    
    // Add actual data points
    const clusterA = clusters.filter(c => c.cluster === 'Cluster A')
    const clusterB = clusters.filter(c => c.cluster === 'Cluster B')
    const clusterC = clusters.filter(c => c.cluster === 'Cluster C')
    
    data.push(
      {
        type: 'scatter3d',
        mode: 'markers',
        x: clusterA.map(c => c.x),
        y: clusterA.map(c => c.y),
        z: clusterA.map(c => c.z),
        marker: {
          size: 6,
          color: '#FF2B2B',
          symbol: 'circle',
          line: {
            color: 'white',
            width: 1
          }
        },
        name: 'Cluster A',
        showlegend: true
      },
      {
        type: 'scatter3d',
        mode: 'markers',
        x: clusterB.map(c => c.x),
        y: clusterB.map(c => c.y),
        z: clusterB.map(c => c.z),
        marker: {
          size: 6,
          color: '#00FF55',
          symbol: 'diamond',
          line: {
            color: 'white',
            width: 1
          }
        },
        name: 'Cluster B',
        showlegend: true
      },
      {
        type: 'scatter3d',
        mode: 'markers',
        x: clusterC.map(c => c.x),
        y: clusterC.map(c => c.y),
        z: clusterC.map(c => c.z),
        marker: {
          size: 6,
          color: '#3399FF',
          symbol: 'square',
          line: {
            color: 'white',
            width: 1
          }
        },
        name: 'Cluster C',
        showlegend: true
      }
    )
    
    return data
  }, [clusters, showDecisionBoundary, resolution])

  const plotLayout = {
    title: {
      text: '3D Data Clustering Visualization',
      font: { color: 'white', size: 16 }
    },
    scene: {
      xaxis: {
        title: 'X Feature',
        gridcolor: 'rgba(255,255,255,0.1)',
        backgroundcolor: 'rgba(20,20,40,0.5)',
        showbackground: true,
        range: [0, 6]
      },
      yaxis: {
        title: 'Y Feature',
        gridcolor: 'rgba(255,255,255,0.1)',
        backgroundcolor: 'rgba(20,20,40,0.5)',
        showbackground: true,
        range: [0, 6]
      },
      zaxis: {
        title: 'Z Feature',
        gridcolor: 'rgba(255,255,255,0.1)',
        backgroundcolor: 'rgba(40,20,20,0.5)',
        showbackground: true,
        range: [0, 6]
      },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.2 }
      },
      aspectmode: 'cube'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { 
      color: 'white', 
      family: 'Arial, sans-serif',
      size: 12
    },
    margin: { l: 0, r: 0, b: 0, t: 40 },
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: 'rgba(0,0,0,0.7)',
      bordercolor: 'rgba(255,255,255,0.3)',
      borderwidth: 1,
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
    <div id="slide-8" className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 px-4 py-2 rounded-full mb-3">
            <Brain className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm">Machine Learning Application</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">🤖 Bonus: 3D Data Clustering</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Visualizing how Adam-optimized models create decision boundaries in high-dimensional spaces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel: Controls */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-5 h-full">
              <h2 className="text-xl font-bold mb-5 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-green-400" />
                Clustering Lab
              </h2>

              {/* Classifier Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Classifier Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedClassifier('KNN')}
                    className={`py-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                      selectedClassifier === 'KNN'
                        ? 'bg-green-600 border border-green-500'
                        : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    <GitBranch className="w-6 h-6 mb-2" />
                    <span className="text-sm font-semibold">K-NN</span>
                    <span className="text-xs text-gray-400 mt-1">k-Nearest Neighbors</span>
                  </button>
                  <button
                    onClick={() => setSelectedClassifier('RF')}
                    className={`py-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                      selectedClassifier === 'RF'
                        ? 'bg-green-600 border border-green-500'
                        : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    <BarChart className="w-6 h-6 mb-2" />
                    <span className="text-sm font-semibold">Random Forest</span>
                    <span className="text-xs text-gray-400 mt-1">Ensemble Trees</span>
                  </button>
                </div>
              </div>

              {/* Visualization Controls */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Visualization</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-gray-400">Grid Density</label>
                      <span className="text-xs font-mono text-green-300">{resolution}³</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="20"
                      step="1"
                      value={resolution}
                      onChange={(e) => setResolution(parseInt(e.target.value))}
                      className="w-full accent-green-500 h-1.5"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-300">Decision Boundary</div>
                      <div className="text-xs text-gray-400">Show classification regions</div>
                    </div>
                    <button
                      onClick={() => setShowDecisionBoundary(!showDecisionBoundary)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        showDecisionBoundary ? 'bg-green-600' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          showDecisionBoundary ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dataset Info */}
              <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-400" />
                  Dataset Statistics
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Samples:</span>
                    <span className="text-green-300">400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Clusters:</span>
                    <span className="text-green-300">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dimensions:</span>
                    <span className="text-green-300">3D (x, y, z)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Features per cluster:</span>
                    <span className="text-green-300">~133</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Cluster Legend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 mr-3 rounded-full"></div>
                    <div>
                      <div className="text-gray-300">Cluster A</div>
                      <div className="text-gray-500">Centroid: (1, 1, 1)</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-3" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                    <div>
                      <div className="text-gray-300">Cluster B</div>
                      <div className="text-gray-500">Centroid: (4, 4, 1)</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-3 rounded-sm"></div>
                    <div>
                      <div className="text-gray-300">Cluster C</div>
                      <div className="text-gray-500">Centroid: (2, 5, 5)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Visualization */}
          <div className="lg:col-span-3">
            {/* 3D Plot */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl mb-6 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">3D Cluster Visualization</h2>
                    <div className="text-sm text-gray-400 mt-1">
                      {selectedClassifier === 'KNN' ? 'k-Nearest Neighbors' : 'Random Forest'} Classification
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span>Grid: {resolution}³ • {showDecisionBoundary ? 'With' : 'Without'} Decision Boundary</span>
                  </div>
                </div>
              </div>
              <div className="h-[500px] bg-gradient-to-br from-gray-900/50 to-black/50">
                <Plot
                  data={plotData as any}
                  layout={plotLayout as any}
                  style={{ width: '100%', height: '100%' }}
                  config={plotConfig}
                  useResizeHandler={true}
                />
              </div>
            </div>

            {/* Information Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-green-400" />
                  Why 3D Matters
                </h3>
                <p className="text-sm text-gray-300">
                  Real-world data often exists in high-dimensional spaces. Visualizing in 3D helps understand 
                  how optimization algorithms like Adam help neural networks learn complex decision boundaries 
                  that separate different classes.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-blue-400" />
                  Adam in ML
                </h3>
                <p className="text-sm text-gray-300">
                  Adam optimizer is crucial for training deep neural networks that perform tasks like 
                  image recognition, natural language processing, and of course, creating complex 
                  decision boundaries for classification problems.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <GitBranch className="w-5 h-5 mr-2 text-purple-400" />
                  Practical Applications
                </h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Medical diagnosis from 3D scans</li>
                  <li>• Object recognition in computer vision</li>
                  <li>• Anomaly detection in complex systems</li>
                  <li>• Customer segmentation in marketing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}