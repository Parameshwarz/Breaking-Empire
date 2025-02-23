import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskAlert {
  id: string;
  type: 'high' | 'medium' | 'low';
  message: string;
  location: string;
  timestamp: string;
}

interface RiskZone {
  id: string;
  name: string;
  threatLevel: number;
  activeThreats: string[];
  status: 'clear' | 'caution' | 'danger';
}

const RiskSystemPage: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [riskLevel, setRiskLevel] = useState(65);
  
  const [riskAlerts] = useState<RiskAlert[]>([
    {
      id: '1',
      type: 'high',
      message: 'DEA surveillance detected in Zone B',
      location: 'Industrial District',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      type: 'medium',
      message: 'Unusual activity near storage facility',
      location: 'Warehouse District',
      timestamp: '15 minutes ago',
    },
    {
      id: '3',
      type: 'low',
      message: 'New competitor movement detected',
      location: 'Downtown',
      timestamp: '1 hour ago',
    },
  ]);

  const [riskZones] = useState<RiskZone[]>([
    {
      id: '1',
      name: 'Production Facility',
      threatLevel: 75,
      activeThreats: ['DEA Surveillance', 'Local Police Activity'],
      status: 'danger',
    },
    {
      id: '2',
      name: 'Distribution Routes',
      threatLevel: 45,
      activeThreats: ['Traffic Checkpoints'],
      status: 'caution',
    },
    {
      id: '3',
      name: 'Storage Facilities',
      threatLevel: 25,
      activeThreats: ['Competitor Activity'],
      status: 'clear',
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newLevel = Math.floor(Math.random() * 30) + 50;
      setRiskLevel(newLevel);
      setShowWarning(newLevel > 75);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="text-red-400 font-bold">CRITICAL ALERT</h3>
                <p>High risk levels detected. Immediate action required.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-400">Risk Management System</h1>
          <div className="flex items-center space-x-4">
            <span className="animate-pulse h-3 w-3 bg-green-500 rounded-full"></span>
            <span className="text-green-400">System Active</span>
          </div>
        </div>

        {/* Main Risk Indicator */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Overall Threat Level</h2>
          <div className="relative h-8 bg-gray-700 rounded-full overflow-hidden mb-4">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{
                transformOrigin: 'left',
                transform: `scaleX(${riskLevel / 100})`,
              }}
              animate={{
                transform: `scaleX(${riskLevel / 100})`,
              }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-white">{riskLevel}%</span>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Safe</span>
            <span>Caution</span>
            <span>Critical</span>
          </div>
        </div>

        {/* Risk Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {riskZones.map((zone) => (
            <RiskZoneCard key={zone.id} zone={zone} />
          ))}
        </div>

        {/* Active Alerts */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Active Alerts</h2>
          <div className="space-y-4">
            {riskAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Risk Mitigation Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Recommended Actions</h2>
            <div className="space-y-4">
              <ActionItem
                action="Relocate Distribution Routes"
                priority="High"
                impact="Reduce detection risk by 35%"
              />
              <ActionItem
                action="Increase Security Personnel"
                priority="Medium"
                impact="Enhance facility protection"
              />
              <ActionItem
                action="Review Supply Chain"
                priority="Low"
                impact="Optimize delivery patterns"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Security Protocols</h2>
            <div className="space-y-4">
              <ProtocolItem
                name="Emergency Evacuation"
                status="Ready"
                lastTested="2 days ago"
              />
              <ProtocolItem
                name="Evidence Disposal"
                status="Active"
                lastTested="12 hours ago"
              />
              <ProtocolItem
                name="Communication Blackout"
                status="Standby"
                lastTested="1 week ago"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RiskZoneCard: React.FC<{ zone: RiskZone }> = ({ zone }) => {
  const statusColors = {
    clear: 'border-green-500 text-green-400',
    caution: 'border-yellow-500 text-yellow-400',
    danger: 'border-red-500 text-red-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gray-800 border-l-4 ${statusColors[zone.status]} rounded-lg p-6`}
    >
      <h3 className="text-xl font-semibold mb-4">{zone.name}</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Threat Level</span>
          <span>{zone.threatLevel}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: '0%' }}
            animate={{ width: `${zone.threatLevel}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm text-gray-400 mb-2">Active Threats:</h4>
        <ul className="space-y-1">
          {zone.activeThreats.map((threat, index) => (
            <li key={index} className="text-sm flex items-center">
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2"></span>
              {threat}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const AlertCard: React.FC<{ alert: RiskAlert }> = ({ alert }) => {
  const typeColors = {
    high: 'border-red-500 text-red-400',
    medium: 'border-yellow-500 text-yellow-400',
    low: 'border-green-500 text-green-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-l-4 ${typeColors[alert.type]} bg-gray-700/50 rounded-r-lg p-4`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold mb-1">{alert.message}</h3>
          <p className="text-sm text-gray-400">{alert.location}</p>
        </div>
        <span className="text-sm text-gray-400">{alert.timestamp}</span>
      </div>
    </motion.div>
  );
};

const ActionItem: React.FC<{
  action: string;
  priority: string;
  impact: string;
}> = ({ action, priority, impact }) => {
  const priorityColors = {
    High: 'text-red-400',
    Medium: 'text-yellow-400',
    Low: 'text-green-400',
  } as const;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
      <div>
        <h3 className="font-medium mb-1">{action}</h3>
        <p className="text-sm text-gray-400">{impact}</p>
      </div>
      <span className={`text-sm ${priorityColors[priority as keyof typeof priorityColors]}`}>
        {priority}
      </span>
    </div>
  );
};

const ProtocolItem: React.FC<{
  name: string;
  status: string;
  lastTested: string;
}> = ({ name, status, lastTested }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
      <div>
        <h3 className="font-medium mb-1">{name}</h3>
        <p className="text-sm text-gray-400">Last tested: {lastTested}</p>
      </div>
      <span className={`text-sm ${status === 'Active' ? 'text-green-400' : 'text-gray-400'}`}>
        {status}
      </span>
    </div>
  );
};

export default RiskSystemPage; 