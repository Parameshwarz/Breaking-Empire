import React from 'react';
import { motion } from 'framer-motion';

interface LabEquipmentProps {
  name: string;
  icon: string;
  purity: number;
  status: string;
  temperature: number;
  pressure: number;
}

const LabEquipment: React.FC<LabEquipmentProps> = ({
  name,
  icon,
  purity,
  status,
  temperature,
  pressure
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="lab-equipment-card"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700" />
        
        <div className="equipment-icon mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        
        <div className="space-y-4">
          {/* Purity Meter */}
          <div className="purity-meter">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Purity Level</span>
              <span className="text-blue-400">{purity}%</span>
            </div>
            <div className="h-1 bg-black/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${purity}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              status === 'Operational' ? 'bg-green-500' : 'bg-red-500'
            } animate-pulse`} />
            <span className="text-gray-400 text-sm">{status}</span>
          </div>

          {/* Temperature & Pressure */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 text-sm block mb-1">Temperature</span>
              <span className="text-white font-mono">{temperature}°C</span>
            </div>
            <div>
              <span className="text-gray-400 text-sm block mb-1">Pressure</span>
              <span className="text-white font-mono">{pressure} PSI</span>
            </div>
          </div>

          {/* Chemical Formula */}
          <div className="mt-4 pt-4 border-t border-blue-500/20">
            <span className="chemical-formula text-sm">C₁₀H₁₅N • CH₃</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LabEquipment; 