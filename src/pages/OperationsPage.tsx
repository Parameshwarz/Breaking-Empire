import React from 'react';
import { motion } from 'framer-motion';

const OperationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-400">Operations Management</h1>
          <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg flex items-center space-x-2">
            <span>Add Facility</span>
            <span>+</span>
          </button>
        </div>

        {/* Placeholder content */}
        <div className="grid gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Facilities Overview</h2>
            <p className="text-gray-400">No facilities added yet.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OperationsPage; 