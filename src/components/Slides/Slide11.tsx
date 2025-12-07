"use client";

import { motion } from "framer-motion";
import { Search, Book, Zap, Target, Layers, Cpu, TrendingDown, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Slide11() {
  const [searchTerm, setSearchTerm] = useState("");

  const glossary = [
    {
      term: "Adam Optimizer",
      analogy: "Smart GPS for navigating complex terrain",
      definition: "Adaptive Moment Estimation combines momentum and RMSprop for adaptive learning rates.",
      mathematical: "θ_t = θ_{t-1} - α·m̂_t/(√(v̂_t)+ε)",
      category: "core",
      icon: <Zap className="h-5 w-5 text-yellow-400" />
    },
    {
      term: "Learning Rate (α)",
      analogy: "Step size when walking downhill",
      definition: "Hyperparameter controlling how much to update weights in response to estimated error.",
      mathematical: "Controls update magnitude",
      category: "hyperparameter",
      icon: <Target className="h-5 w-5 text-red-400" />
    },
    {
      term: "Momentum (β₁)",
      analogy: "Ball rolling down hill - gains speed gradually",
      definition: "Accumulates gradient of past steps to determine direction, dampens oscillations.",
      mathematical: "m_t = β₁·m_{t-1} + (1-β₁)·g_t",
      category: "mechanism",
      icon: <TrendingDown className="h-5 w-5 text-blue-400" />
    },
    {
      term: "RMSprop (β₂)",
      analogy: "Adaptive terrain awareness - adjusts to slope",
      definition: "Root Mean Square propagation adapts learning rate for each parameter using moving average of squared gradients.",
      mathematical: "v_t = β₂·v_{t-1} + (1-β₂)·g_t²",
      category: "mechanism",
      icon: <Layers className="h-5 w-5 text-green-400" />
    },
    {
      term: "Bias Correction",
      analogy: "Warm-up phase for accurate velocity estimation",
      definition: "Adjusts initial estimates to account for zero initialization bias in momentum terms.",
      mathematical: "m̂_t = m_t/(1-β₁^t), v̂_t = v_t/(1-β₂^t)",
      category: "technique",
      icon: <Sparkles className="h-5 w-5 text-purple-400" />
    },
    {
      term: "Stochastic Gradient Descent",
      analogy: "Trying random paths to find fastest route",
      definition: "Optimizer that uses random subsets (batches) of data to compute gradient approximations.",
      mathematical: "θ = θ - α·∇J(θ; xⁱ, yⁱ)",
      category: "optimizer",
      icon: <Cpu className="h-5 w-5 text-cyan-400" />
    },
    {
      term: "Loss Landscape",
      analogy: "Mountain range with peaks and valleys",
      definition: "High-dimensional surface representing loss as function of model parameters.",
      mathematical: "L(θ): ℝⁿ → ℝ",
      category: "concept",
      icon: <Book className="h-5 w-5 text-pink-400" />
    },
    {
      term: "Convergence",
      analogy: "Reaching destination after long journey",
      definition: "Process of optimizer approaching optimal parameter values where loss is minimized.",
      mathematical: "lim_{t→∞} |θ_t - θ*| → 0",
      category: "concept",
      icon: <Target className="h-5 w-5 text-green-400" />
    },
    {
      term: "Gradient",
      analogy: "Compass pointing steepest uphill direction",
      definition: "Vector of partial derivatives indicating direction of steepest ascent of loss function.",
      mathematical: "∇L(θ) = [∂L/∂θ₁, ..., ∂L/∂θ_n]",
      category: "mathematics",
      icon: <TrendingDown className="h-5 w-5 text-orange-400" />
    },
    {
      term: "Epsilon (ε)",
      analogy: "Safety net preventing division by zero",
      definition: "Small constant added to denominator for numerical stability, prevents division by zero.",
      mathematical: "Typically 1e-8",
      category: "hyperparameter",
      icon: <Zap className="h-5 w-5 text-yellow-400" />
    },
    {
      term: "Mini-batch",
      analogy: "Sampling different trail sections",
      definition: "Small random subset of training data used to compute gradient estimate.",
      mathematical: "B ⊆ {1,...,m}, |B| = b",
      category: "technique",
      icon: <Layers className="h-5 w-5 text-blue-400" />
    },
    {
      term: "Adaptive Learning Rate",
      analogy: "Auto-adjusting step size based on terrain",
      definition: "Learning rate that changes per parameter based on historical gradient information.",
      mathematical: "α_t(i) = α / (√(v_t(i)) + ε)",
      category: "concept",
      icon: <Sparkles className="h-5 w-5 text-purple-400" />
    }
  ];

  const filteredGlossary = glossary.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.analogy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["core", "hyperparameter", "mechanism", "technique", "concept", "mathematics", "optimizer"];

  return (
    <div id="slide-11" className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4">
            <Book className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Optimization Terminology
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Key Concepts & Mathematical Definitions
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms, definitions, or analogies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2 text-center">
            {filteredGlossary.length} of {glossary.length} terms found
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                searchTerm === category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setSearchTerm(searchTerm === category ? "" : category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGlossary.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.term}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-gray-800 text-cyan-300 text-xs font-medium rounded-full mt-1">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-300">Analogy</span>
                  </div>
                  <p className="text-gray-300 italic">"{item.analogy}"</p>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-300">Definition</span>
                  </div>
                  <p className="text-gray-300">{item.definition}</p>
                </div>

                {item.mathematical && (
                  <div className="p-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium text-purple-300">Mathematical Form</span>
                    </div>
                    <code className="text-purple-300 font-mono text-sm bg-gray-900 px-3 py-1 rounded">
                      {item.mathematical}
                    </code>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Category Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-300">Core</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
              <span className="text-sm text-gray-300">Hyperparameter</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
              <span className="text-sm text-gray-300">Mechanism</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
              <span className="text-sm text-gray-300">Technique</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              <span className="text-sm text-gray-300">Concept</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full"></div>
              <span className="text-sm text-gray-300">Mathematics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"></div>
              <span className="text-sm text-gray-300">Optimizer</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}