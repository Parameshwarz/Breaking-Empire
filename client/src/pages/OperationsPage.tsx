import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Facility {
  id: string;
  name: string;
  type: 'rv' | 'superlab' | 'warehouse';
  status: 'operational' | 'maintenance' | 'compromised';
  efficiency: number;
  risk: number;
  cost: number;
  production: number;
  location: string;
}

const OperationsPage: React.FC = () => {
  const [facilities] = useState<Facility[]>([
    {
      id: '1',
      name: 'Crystal Ship',
      type: 'rv',
      status: 'operational',
      efficiency: 75,
      risk: 85,
      cost: 5000,
      production: 50,
      location: 'Desert',
    },
    {
      id: '2',
      name: 'Superlab',
      type: 'superlab',
      status: 'operational',
      efficiency: 95,
      risk: 35,
      cost: 25000,
      production: 200,
      location: 'Industrial District',
    },
    {
      id: '3',
      name: 'Storage Facility Alpha',
      type: 'warehouse',
      status: 'operational',
      efficiency: 90,
      risk: 45,
      cost: 15000,
      production: 0,
      location: 'City Outskirts',
    },
  ]);

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

        {/* Facilities Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>

        {/* Production Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Production Overview</h2>
            <div className="space-y-4">
              <ProductionMetric
                label="Total Daily Production"
                value="450 lbs"
                trend="+5%"
                icon="⚗️"
              />
              <ProductionMetric
                label="Average Purity"
                value="99.1%"
                trend="+0.3%"
                icon="🧪"
              />
              <ProductionMetric
                label="Operating Costs"
                value="$45,000/day"
                trend="-2%"
                icon="💰"
              />
            </div>
          </div>

          {/* Supply Chain Status */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Supply Chain Status</h2>
            <div className="space-y-4">
              <SupplyChainItem
                name="Methylamine"
                status="Stable"
                stock="85%"
                type="success"
              />
              <SupplyChainItem
                name="Precursor Chemicals"
                status="Low Stock"
                stock="15%"
                type="warning"
              />
              <SupplyChainItem
                name="Lab Equipment"
                status="Critical"
                stock="5%"
                type="danger"
              />
            </div>
          </div>
        </div>

        {/* Active Operations */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Active Operations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4">Operation</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Progress</th>
                  <th className="pb-4">Risk Level</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <OperationRow
                  operation="Production Batch #247"
                  location="Superlab"
                  status="In Progress"
                  progress={75}
                  risk="Low"
                />
                <OperationRow
                  operation="Distribution Route #12"
                  location="Southwest"
                  status="En Route"
                  progress={45}
                  risk="Medium"
                />
                <OperationRow
                  operation="Supply Acquisition"
                  location="Multiple"
                  status="Planning"
                  progress={20}
                  risk="High"
                />
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  const statusColors = {
    operational: 'bg-green-500',
    maintenance: 'bg-yellow-500',
    compromised: 'bg-red-500',
  };

  const typeIcons = {
    rv: '🚐',
    superlab: '🏭',
    warehouse: '🏪',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-xl p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-2xl mr-2">{typeIcons[facility.type]}</span>
          <h3 className="text-xl font-semibold inline-block">{facility.name}</h3>
        </div>
        <div className="flex items-center">
          <span className={`h-3 w-3 rounded-full ${statusColors[facility.status]} mr-2`} />
          <span className="text-sm text-gray-400 capitalize">{facility.status}</span>
        </div>
      </div>

      <div className="space-y-4">
        <MetricBar label="Efficiency" value={facility.efficiency} color="blue" />
        <MetricBar label="Risk Level" value={facility.risk} color="red" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Daily Cost</p>
            <p className="text-white">${facility.cost}</p>
          </div>
          <div>
            <p className="text-gray-400">Production</p>
            <p className="text-white">{facility.production} lbs/day</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MetricBar: React.FC<{ label: string; value: number; color: string }> = ({
  label,
  value,
  color,
}) => {
  const colors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm text-white">{value}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full">
        <motion.div
          className={`h-full rounded-full ${colors[color]}`}
          initial={{ width: '0%' }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

const ProductionMetric: React.FC<{
  label: string;
  value: string;
  trend: string;
  icon: string;
}> = ({ label, value, trend, icon }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
      <span className={`text-sm ${trend.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
        {trend}
      </span>
    </div>
  );
};

const SupplyChainItem: React.FC<{
  name: string;
  status: string;
  stock: string;
  type: 'success' | 'warning' | 'danger';
}> = ({ name, status, stock, type }) => {
  const colors = {
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{name}</p>
        <p className={`text-sm ${colors[type]}`}>{status}</p>
      </div>
      <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
          initial={{ width: '0%' }}
          animate={{ width: stock }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

const OperationRow: React.FC<{
  operation: string;
  location: string;
  status: string;
  progress: number;
  risk: string;
}> = ({ operation, location, status, progress, risk }) => {
  const riskColors = {
    Low: 'text-green-400',
    Medium: 'text-yellow-400',
    High: 'text-red-400',
  };

  return (
    <tr className="border-b border-gray-700">
      <td className="py-4">{operation}</td>
      <td>{location}</td>
      <td>{status}</td>
      <td>
        <div className="w-32 h-2 bg-gray-700 rounded-full">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </td>
      <td className={riskColors[risk as keyof typeof riskColors]}>{risk}</td>
    </tr>
  );
};

export default OperationsPage; 