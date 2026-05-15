import React from 'react';

const AnimatedCircles = ({ 
  circles = [
    {
      size: '500px',
      top: '-10%',
      left: '-10%',
      bottom: undefined,
      right: undefined,
      color: 'rgba(59, 130, 246, 0.4)',
      animation: 'animate-float',
      duration: '20s',
    },
    {
      size: '600px',
      top: undefined,
      left: undefined,
      bottom: '-15%',
      right: '-15%',
      color: 'rgba(168, 85, 247, 0.4)',
      animation: 'animate-float-reverse',
      duration: '22s',
    },
    {
      size: '450px',
      top: '40%',
      left: undefined,
      bottom: undefined,
      right: '-10%',
      color: 'rgba(236, 72, 153, 0.35)',
      animation: 'animate-float-slow',
      duration: '18s',
    },
    {
      size: '550px',
      top: undefined,
      left: '-10%',
      bottom: '-10%',
      right: undefined,
      color: 'rgba(34, 197, 94, 0.35)',
      animation: 'animate-pulse-glow',
      duration: '15s',
    },
  ],
  zIndex = 0,
  className = ''
}) => {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex }}>
      {circles.map((circle, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${circle.animation}`}
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left,
            bottom: circle.bottom,
            right: circle.right,
            background: `radial-gradient(circle, ${circle.color} 0%, ${circle.color.replace(/[\d\.]+\)$/, '0)')} 70%)`,
            animationDuration: circle.duration,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedCircles;