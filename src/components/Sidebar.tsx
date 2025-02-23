import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'dashboard',
      icon: '📊',
      label: 'Empire Dashboard',
      path: '/dashboard'
    },
    {
      id: 'analytics',
      icon: '📈',
      label: 'Revenue & Risk',
      path: '/analytics'
    },
    {
      id: 'operations',
      icon: '🏭',
      label: 'Operations',
      path: '/operations'
    },
    {
      id: 'risk',
      icon: '⚠️',
      label: 'Risk System',
      path: '/risk'
    }
  ];

  const handleNavigation = (path: string, id: string) => {
    setActiveItem(id);
    navigate(path);
  };

  return (
    <motion.div 
      className="fixed left-0 top-0 h-screen w-20 bg-[#111111] flex flex-col items-center py-8"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Logo */}
      <motion.div 
        className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center mb-8 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/')}
      >
        <span className="text-2xl">🧪</span>
      </motion.div>

      {/* Navigation Items */}
      <div className="mt-auto mb-auto flex flex-col items-center gap-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.id}
              className={`relative w-12 h-12 flex items-center justify-center cursor-pointer
                ${isActive ? 'text-[#4ADE80]' : 'text-white'}
              `}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleNavigation(item.path, item.id)}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute left-0 w-1 h-full bg-[#4ADE80] rounded-r"
                  layoutId="activeIndicator"
                />
              )}

              {/* Background Glow */}
              <motion.div
                className={`absolute inset-0 rounded-xl transition-colors duration-200
                  ${isActive ? 'bg-[#1C3829]' : 'bg-[#1A1A1A]'}
                `}
              />

              {/* Icon */}
              <span className="relative z-10 text-2xl">{item.icon}</span>
            </motion.div>
          );
        })}
      </div>

      {/* System Status */}
      <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center mt-auto">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#4ADE80]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default Sidebar; 