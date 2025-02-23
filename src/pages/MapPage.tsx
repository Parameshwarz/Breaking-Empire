import React from 'react';
import { motion } from 'framer-motion';
import TerritoryMap from '../components/TerritoryMap';

const MapPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black p-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Territory Map</h1>
        <div className="bg-[#111111] rounded-xl p-6">
          <TerritoryMap />
        </div>
      </div>
    </motion.div>
  );
};

export default MapPage; 