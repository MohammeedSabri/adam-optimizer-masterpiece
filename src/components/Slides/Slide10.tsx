"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink, GraduationCap, BookOpen } from "lucide-react";

export default function Slide10() {
  const references = [
    {
      title: "Adam: A Method for Stochastic Optimization",
      authors: "Diederik P. Kingma, Jimmy Ba",
      venue: "ICLR 2015",
      link: "https://arxiv.org/abs/1412.6980",
      impact: "Core Adam paper with 90K+ citations",
      summary: "Introduces Adam as an adaptive learning rate optimization algorithm combining advantages of AdaGrad and RMSProp."
    },
    {
      title: "An overview of gradient descent optimization algorithms",
      authors: "Sebastian Ruder",
      venue: "arXiv 2016",
      link: "https://arxiv.org/abs/1609.04747",
      impact: "Comprehensive survey with 15K+ citations",
      summary: "Detailed analysis of gradient descent variants including Adam, RMSProp, AdaGrad, and momentum methods."
    },
    {
      title: "On the Convergence of Adam and Beyond",
      authors: "Sashank J. Reddi, Satyen Kale, Sanjiv Kumar",
      venue: "ICLR 2018",
      link: "https://openreview.net/forum?id=ryQu7f-RZ",
      impact: "Identified convergence issues and proposed AMSGrad",
      summary: "Analyzes convergence issues in Adam and proposes fixes for non-convex optimization."
    },
    {
      title: "Decoupled Weight Decay Regularization",
      authors: "Ilya Loshchilov, Frank Hutter",
      venue: "ICLR 2019",
      link: "https://arxiv.org/abs/1711.05101",
      impact: "Introduces AdamW with 5K+ citations",
      summary: "Proposes AdamW which decouples weight decay from gradient updates, improving generalization."
    },
    {
      title: "Visualizing the Loss Landscape of Neural Nets",
      authors: "Hao Li, Zheng Xu, Gavin Taylor, Tom Goldstein",
      venue: "NeurIPS 2018",
      link: "https://arxiv.org/abs/1712.09913",
      impact: "Visualization techniques for optimization landscapes",
      summary: "Techniques for visualizing high-dimensional loss landscapes to understand optimizer behavior."
    },
    {
      title: "Adaptive Methods for Nonconvex Optimization",
      authors: "Rachel Ward, Xiaoxia Wu, Leon Bottou",
      venue: "NeurIPS 2018",
      link: "https://arxiv.org/abs/1806.06763",
      impact: "Theoretical analysis of adaptive methods",
      summary: "Provides theoretical guarantees for Adam-like algorithms in non-convex settings."
    }
  ];

  return (
    <div id="slide-10" className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Academic References
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Key Papers & Research Behind Adam Optimizer
          </p>
        </motion.div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {references.map((ref, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <FileText className="h-6 w-6 text-cyan-400" />
                </div>
                <span className="px-3 py-1 bg-gray-800 text-cyan-300 text-sm font-medium rounded-full">
                  {ref.venue}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {ref.title}
              </h3>
              
              <div className="flex items-center text-gray-400 mb-4">
                <GraduationCap className="h-4 w-4 mr-2" />
                <p className="text-sm">{ref.authors}</p>
              </div>

              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {ref.summary}
              </p>

              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-gradient-to-r from-purple-900/50 to-purple-900/20 text-purple-300 text-xs font-medium rounded">
                  {ref.impact}
                </span>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm"
                >
                  Read Paper
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Citation Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Adam Optimizer Research Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
              <div className="text-3xl font-bold text-cyan-400 mb-2">90K+</div>
              <div className="text-gray-300">Core Paper Citations</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">7+</div>
              <div className="text-gray-300">Years of Active Research</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
              <div className="text-3xl font-bold text-pink-400 mb-2">15+</div>
              <div className="text-gray-300">Variant Algorithms</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
              <div className="text-3xl font-bold text-green-400 mb-2">100K+</div>
              <div className="text-gray-300">DL Projects Using Adam</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}