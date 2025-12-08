'use client'

import { useState } from 'react'
import { Code2, Copy, Check, Play, FileCode } from 'lucide-react'

export default function Slide7() {
  const [copied, setCopied] = useState(false)
  const [activeVersion, setActiveVersion] = useState('matlab')

  const matlabCode = `function [theta, history] = adam_optimizer(grad_func, theta_init, alpha, beta1, beta2, epsilon, max_iters)
    % ADAM: Adaptive Moment Estimation
    % Inputs:
    %   grad_func   - Function handle returning gradient
    %   theta_init  - Initial parameter vector
    %   alpha       - Learning rate (default: 0.001)
    %   beta1       - Momentum decay (default: 0.9)
    %   beta2       - RMSProp decay (default: 0.999)
    %   epsilon     - Numerical stability (default: 1e-8)
    %   max_iters   - Maximum iterations (default: 1000)
    
    % Set default parameters
    if nargin < 3 || isempty(alpha), alpha = 0.001; end
    if nargin < 4 || isempty(beta1), beta1 = 0.9; end
    if nargin < 5 || isempty(beta2), beta2 = 0.999; end
    if nargin < 6 || isempty(epsilon), epsilon = 1e-8; end
    if nargin < 7 || isempty(max_iters), max_iters = 1000; end
    
    % Initialize
    theta = theta_init;
    m = zeros(size(theta));      % First moment vector
    v = zeros(size(theta));      % Second moment vector
    history.theta = zeros(max_iters, length(theta));
    history.grad_norm = zeros(max_iters, 1);
    
    % Main optimization loop
    for t = 1:max_iters
        % Compute gradient
        g = grad_func(theta);
        
        % Update biased first moment estimate
        m = beta1 * m + (1 - beta1) * g;
        
        % Update biased second raw moment estimate
        v = beta2 * v + (1 - beta2) * (g.^2);
        
        % Compute bias-corrected estimates
        m_hat = m / (1 - beta1^t);
        v_hat = v / (1 - beta2^t);
        
        % Update parameters
        theta = theta - alpha * m_hat ./ (sqrt(v_hat) + epsilon);
        
        % Store history
        history.theta(t, :) = theta';
        history.grad_norm(t) = norm(g);
    end
    
    % Trim history
    history.theta = history.theta(1:t, :);
    history.grad_norm = history.grad_norm(1:t);
end`

  const pythonCode = `import numpy as np

def adam_optimizer(grad_func, theta_init, alpha=0.001, beta1=0.9, 
                   beta2=0.999, epsilon=1e-8, max_iters=1000):
    """
    ADAM: Adaptive Moment Estimation
    
    Parameters:
    -----------
    grad_func : callable
        Function returning gradient at given parameters
    theta_init : numpy.ndarray
        Initial parameter vector
    alpha : float, default=0.001
        Learning rate
    beta1 : float, default=0.9
        Exponential decay rate for first moment estimates
    beta2 : float, default=0.999
        Exponential decay rate for second moment estimates
    epsilon : float, default=1e-8
        Small constant for numerical stability
    max_iters : int, default=1000
        Maximum number of iterations
        
    Returns:
    --------
    theta : numpy.ndarray
        Optimized parameters
    history : dict
        Optimization history with keys 'theta' and 'grad_norm'
    """
    
    # Initialize
    theta = theta_init.copy()
    m = np.zeros_like(theta)     # First moment vector
    v = np.zeros_like(theta)     # Second moment vector
    history = {
        'theta': np.zeros((max_iters, len(theta))),
        'grad_norm': np.zeros(max_iters)
    }
    
    # Main optimization loop
    for t in range(1, max_iters + 1):
        # Compute gradient
        g = grad_func(theta)
        
        # Update biased first moment estimate
        m = beta1 * m + (1 - beta1) * g
        
        # Update biased second raw moment estimate
        v = beta2 * v + (1 - beta2) * (g ** 2)
        
        # Compute bias-corrected estimates
        m_hat = m / (1 - beta1 ** t)
        v_hat = v / (1 - beta2 ** t)
        
        # Update parameters
        theta = theta - alpha * m_hat / (np.sqrt(v_hat) + epsilon)
        
        # Store history
        history['theta'][t-1, :] = theta.copy()
        history['grad_norm'][t-1] = np.linalg.norm(g)
    
    return theta, history`

  const pseudocode = `Algorithm: Adam (Adaptive Moment Estimation)
-------------------------------------------------
Input: 
  θ₀: Initial parameter vector
  α: Learning rate (default: 0.001)
  β₁, β₂: Exponential decay rates (default: 0.9, 0.999)
  ε: Small constant for numerical stability (default: 1e-8)
  f(θ): Objective function
  max_iters: Maximum iterations (default: 1000)

Initialize:
  m₀ ← 0 (Initialize 1st moment vector)
  v₀ ← 0 (Initialize 2nd moment vector)
  history ← {theta: [], grad_norm: []}

For t = 1 to max_iters:
  gₜ ← ∇f(θₜ₋₁)                     ▷ Compute gradient
  mₜ ← β₁·mₜ₋₁ + (1 - β₁)·gₜ       ▷ Update biased 1st moment
  vₜ ← β₂·vₜ₋₁ + (1 - β₂)·gₜ²      ▷ Update biased 2nd moment
  m̂ₜ ← mₜ / (1 - β₁ᵗ)              ▷ Bias-correct 1st moment
  v̂ₜ ← vₜ / (1 - β₂ᵗ)              ▷ Bias-correct 2nd moment
  θₜ ← θₜ₋₁ - α·m̂ₜ / (√v̂ₜ + ε)    ▷ Update parameters
  
  ▷ Store history
  history.theta[t] ← θₜ
  history.grad_norm[t] ← ‖gₜ‖

Return: (θₜ, history)`

  const copyToClipboard = () => {
    const code = activeVersion === 'matlab' ? matlabCode : 
                 activeVersion === 'python' ? pythonCode : pseudocode
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id="slide-7" className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-600/20 to-blue-600/20 px-4 py-2 rounded-full mb-4">
            <Code2 className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Implementation</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">💾 The Adam Algorithm</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete implementations in MATLAB, Python, and pseudocode
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Language Selector */}
          <div className="lg:col-span-1">
            <div className="glass-card h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileCode className="w-6 h-6 mr-2 text-blue-400" />
                Choose Implementation
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => setActiveVersion('matlab')}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                    activeVersion === 'matlab'
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-400/30'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">MATLAB</h3>
                    <p className="text-sm text-gray-400">Original implementation</p>
                  </div>
                  {activeVersion === 'matlab' && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </button>

                <button
                  onClick={() => setActiveVersion('python')}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                    activeVersion === 'python'
                      ? 'bg-gradient-to-r from-yellow-600/30 to-green-600/30 border border-yellow-400/30'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.5 9.5c0 .7-.6 1.2-1.2 1.2s-1.2-.6-1.2-1.2.6-1.2 1.2-1.2 1.2.6 1.2 1.2zm5.2 0c0 .7-.6 1.2-1.2 1.2s-1.2-.6-1.2-1.2.6-1.2 1.2-1.2 1.2.6 1.2 1.2zM12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.5c-.3.3-.7.5-1.2.5H7.7c-.5 0-.9-.2-1.2-.5-.3-.3-.5-.7-.5-1.2V7.7c0-.5.2-.9.5-1.2.3-.3.7-.5 1.2-.5h8.6c.5 0 .9.2 1.2.5.3.3.5.7.5 1.2v8.6c0 .5-.2.9-.5 1.2z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">Python</h3>
                    <p className="text-sm text-gray-400">NumPy implementation</p>
                  </div>
                  {activeVersion === 'python' && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </button>

                <button
                  onClick={() => setActiveVersion('pseudo')}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                    activeVersion === 'pseudo'
                      ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/30'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">Pseudocode</h3>
                    <p className="text-sm text-gray-400">Algorithm overview</p>
                  </div>
                  {activeVersion === 'pseudo' && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </button>
              </div>

              {/* Algorithm Details */}
              <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
                <h4 className="font-semibold mb-3">⚙️ Hyperparameters</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Learning Rate (α)</span>
                    <span className="text-cyan-300">0.001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">β₁ (Momentum)</span>
                    <span className="text-cyan-300">0.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">β₂ (RMSProp)</span>
                    <span className="text-cyan-300">0.999</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ε (Stability)</span>
                    <span className="text-cyan-300">1e-8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Code Display */}
          <div className="lg:col-span-2">
            <div className="glass-card h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {activeVersion === 'matlab' && 'MATLAB Implementation'}
                  {activeVersion === 'python' && 'Python (NumPy) Implementation'}
                  {activeVersion === 'pseudo' && 'Algorithm Pseudocode'}
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-sm text-gray-400">
                    {activeVersion === 'matlab' && 'adam_optimizer.m'}
                    {activeVersion === 'python' && 'adam.py'}
                    {activeVersion === 'pseudo' && 'algorithm.txt'}
                  </div>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className={`font-mono text-sm leading-relaxed ${
                    activeVersion === 'matlab' ? 'text-green-300' :
                    activeVersion === 'python' ? 'text-yellow-300' :
                    'text-cyan-300'
                  }`}>
                    {activeVersion === 'matlab' && matlabCode}
                    {activeVersion === 'python' && pythonCode}
                    {activeVersion === 'pseudo' && pseudocode}
                  </pre>
                </div>
              </div>

              {/* Implementation Notes */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-cyan-300 mb-2">📝 Key Features</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Bias correction for early steps</li>
                    <li>• Per-parameter adaptive learning rates</li>
                    <li>• Momentum for faster convergence</li>
                    <li>• Numerical stability with ε</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">⚡ Performance Tips</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Default parameters work for most cases</li>
                    <li>• α = 0.001 is usually optimal</li>
                    <li>• Works well with mini-batch training</li>
                    <li>• Memory efficient (only stores m, v)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="glass-card max-w-6xl mx-auto mt-8">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">🎯 Example Usage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-300 mb-2">MATLAB Example</h4>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <pre className="text-sm text-green-300">
{`% Define skewed valley function gradient
grad = @(theta) [4*theta(1) - theta(2) - 3;
                 2*theta(2) - theta(1) - 1];

% Run Adam
theta0 = [-1.5; 2.0];
[theta_opt, history] = adam_optimizer(grad, theta0);

disp('Optimal parameters:');
disp(theta_opt);
disp(['Final gradient norm: ', num2str(history.grad_norm(end))]);`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-300 mb-2">Python Example</h4>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <pre className="text-sm text-yellow-300">
{`import numpy as np

def skewed_valley_grad(theta):
    x, y = theta
    return np.array([4*x - y - 3,
                     2*y - x - 1])

# Run Adam
theta0 = np.array([-1.5, 2.0])
theta_opt, history = adam_optimizer(skewed_valley_grad, theta0)

print(f"Optimal parameters: {theta_opt}")
print(f"Final gradient norm: {history['grad_norm'][-1]}")`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
