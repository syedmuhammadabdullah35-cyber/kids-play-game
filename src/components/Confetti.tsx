import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocity: { x: number; y: number };
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F43', '#A29BFE', '#55E6C1'];

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: 50, // center %
      y: 50, // center %
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 15 + 5,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20 - 10,
      },
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: p.rotation, opacity: 1 }}
          animate={{
            x: `${p.x + p.velocity.x * 10}vw`,
            y: `${p.y + p.velocity.y * 10 + 100}vh`,
            rotate: p.rotation + 720,
            opacity: 0,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}
