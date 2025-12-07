'use client'

import { useState, useEffect } from 'react'
import {
  Home, History, Lightbulb, Calculator,
  Mountain, LandPlot, Code2, Layers,
  CheckCircle, BookOpen, Book, Users, 
  ChevronRight, Brain, Sparkles, Cpu,
  Star, User
} from 'lucide-react'

const SLIDES = [
  { id: '1', label: 'Introduction', icon: Home },
  { id: '2', label: 'History', icon: History },
  { id: '3', label: 'The Intuition', icon: Lightbulb },
  { id: '4', label: 'The Mathematics', icon: Calculator },
  { id: '5', label: 'Skewed Valley', icon: Mountain },
  { id: '6', label: 'Rosenbrock Valley', icon: LandPlot },
  { id: '7', label: 'MATLAB Algorithm', icon: Code2 },
  { id: '8', label: '3D Data Clustering', icon: Layers },
  { id: '9', label: 'Conclusion', icon: CheckCircle },
  { id: '10', label: 'References', icon: BookOpen },
  { id: '11', label: 'Terminology', icon: Book },
  { id: '12', label: 'Creators', icon: Users },
]

export default function Navigation() {
  const [activeSlide, setActiveSlide] = useState('1')
  const [isOpen, setIsOpen] = useState(true)

  // FIXED: Better scroll function
  const handleNavigation = (slideId: string) => {
    setActiveSlide(slideId)
    
    // Use timeout to ensure DOM is ready
    setTimeout(() => {
      const slideElement = document.getElementById(`slide-${slideId}`)
      if (slideElement) {
        const yOffset = -20 // Adjust this if needed
        const y = slideElement.getBoundingClientRect().top + window.pageYOffset + yOffset
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // Auto-update active slide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100
      
      // Check each slide
      for (let i = 1; i <= 12; i++) {
        const element = document.getElementById(`slide-${i}`)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSlide(i.toString())
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed left-0 top-0 h-screen transition-all duration-300 z-40 ${isOpen ? 'w-80' : 'w-20'}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 w-6 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-r-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <ChevronRight className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Sidebar */}
      <div className="h-full bg-gray-900/95 backdrop-blur-xl border-r border-white/10 p-4 overflow-hidden">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Adam Optimizer
              </h1>
              <p className="text-sm text-gray-400">Interactive Masterpiece</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="space-y-2 h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {SLIDES.map((slide) => (
            <button
              key={slide.id}
              onClick={() => handleNavigation(slide.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                activeSlide === slide.id
                  ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-white/20'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activeSlide === slide.id
                  ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
                  : 'bg-gray-800'
              }`}>
                <slide.icon className="w-5 h-5 text-white" />
              </div>

              {isOpen && (
                <>
                  <span className="ml-3 font-medium text-white">{slide.label}</span>
                  {activeSlide === slide.id && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        {isOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-medium text-cyan-400">
                {Math.round((parseInt(activeSlide) / 12) * 100)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                style={{ width: `${(parseInt(activeSlide) / 12) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}