import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DashboardPage: React.FC = () => {
  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', revenue: 250000 },
    { month: 'Feb', revenue: 380000 },
    { month: 'Mar', revenue: 520000 },
    { month: 'Apr', revenue: 680000 },
    { month: 'May', revenue: 890000 },
  ]);

  const [stats, setStats] = useState({
    totalRevenue: 890000,
    productionRate: 98.2,
    distributionEfficiency: 94,
    lawEnforcementRisk: 65,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-400">Empire Dashboard</h1>
          <div className="bg-red-600/20 px-4 py-2 rounded-lg flex items-center">
            <span className="animate-pulse mr-2 h-3 w-3 bg-red-500 rounded-full"></span>
            <span className="text-red-400">LIVE</span>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${(stats.totalRevenue / 1000000).toFixed(2)}M`}
            icon="💰"
            trend="+12.5%"
          />
          <StatCard
            title="Production Rate"
            value={`${stats.productionRate}%`}
            icon="⚗️"
            trend="+2.3%"
            color="blue"
          />
          <StatCard
            title="Distribution"
            value={`${stats.distributionEfficiency}%`}
            icon="🚐"
            trend="+1.8%"
            color="purple"
          />
          <StatCard
            title="Risk Level"
            value={`${stats.lawEnforcementRisk}%`}
            icon="🚨"
            trend="+5.2%"
            color="red"
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Revenue Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Meter */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">DEA Threat Level</h2>
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              initial={{ width: '0%' }}
              animate={{ width: `${stats.lawEnforcementRisk}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            {stats.lawEnforcementRisk < 50
              ? 'Status: Clear'
              : stats.lawEnforcementRisk < 75
              ? 'Status: Caution'
              : 'Status: High Alert'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: string;
  trend: string;
  color?: string;
}> = ({ title, value, icon, trend, color = 'green' }) => {
  const colorClasses = {
    green: 'bg-green-500/10 text-green-400',
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    red: 'bg-red-500/10 text-red-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm ${trend.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
};

export default DashboardPage; 