import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-green-500/30"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: particle.size / 4
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x}%`
            ],
            y: [
              `${particle.y}%`,
              `${particle.y + (Math.random() * 10 - 5)}%`,
              `${particle.y}%`
            ]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: '4px',
            height: '4px'
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground; 