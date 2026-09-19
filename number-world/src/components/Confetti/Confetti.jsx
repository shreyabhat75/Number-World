import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PARTICLE_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b9d', '#c084fc'];

function Particle({ x, delay }) {
  const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  const size = Math.random() * 8 + 4;
  
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: `${x}%`,
        top: '-10px',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: window.innerHeight + 20,
        opacity: [1, 1, 0],
        rotate: Math.random() * 720 - 360,
        x: Math.random() * 100 - 50,
      }}
      transition={{
        duration: Math.random() * 2 + 1.5,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
}

function ShapeParticle({ x, delay }) {
  const shapes = ['circle', 'square', 'triangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  const size = Math.random() * 12 + 6;
  
  const shapeStyle = {
    circle: { borderRadius: '50%' },
    square: { borderRadius: '2px', transform: `rotate(${Math.random() * 45}deg)` },
    triangle: { 
      width: 0, height: 0, 
      background: 'transparent',
      borderLeft: `${size/2}px solid transparent`,
      borderRight: `${size/2}px solid transparent`,
      borderBottom: `${size}px solid ${color}`,
    },
  };
  
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: `${x}%`,
        top: '-20px',
        width: shape === 'triangle' ? 0 : size,
        height: shape === 'triangle' ? 0 : size,
        background: shape === 'triangle' ? 'transparent' : color,
        ...shapeStyle[shape],
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: window.innerHeight + 20,
        opacity: [1, 1, 0],
        rotate: Math.random() * 720 - 360,
      }}
      transition={{
        duration: Math.random() * 2 + 1.5,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
}

export default function Confetti({ active, onComplete }) {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (active) {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 0.5,
          type: Math.random() > 0.5 ? 'circle' : 'shape',
        });
      }
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);
  
  return (
    <AnimatePresence>
      {particles.map(p => (
        p.type === 'circle' ? (
          <Particle key={p.id} x={p.x} delay={p.delay} />
        ) : (
          <ShapeParticle key={p.id} x={p.x} delay={p.delay} />
        )
      ))}
    </AnimatePresence>
  );
}
