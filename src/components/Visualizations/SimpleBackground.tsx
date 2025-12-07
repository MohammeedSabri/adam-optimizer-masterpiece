'use client'

export default function SimpleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-blue-900/10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}