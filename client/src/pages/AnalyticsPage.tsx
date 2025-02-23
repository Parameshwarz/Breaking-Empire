import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const AnalyticsPage: React.FC = () => {
  const [revenueData] = useState([
    { month: 'Jan', revenue: 250000, expenses: 80000, risk: 25 },
    { month: 'Feb', revenue: 380000, expenses: 95000, risk: 35 },
    { month: 'Mar', revenue: 520000, expenses: 120000, risk: 45 },
    { month: 'Apr', revenue: 680000, expenses: 150000, risk: 55 },
    { month: 'May', revenue: 890000, expenses: 200000, risk: 65 },
  ]);

  const [riskFactors] = useState([
    { name: 'DEA Surveillance', level: 75 },
    { name: 'Competitor Activity', level: 45 },
    { name: 'Supply Chain', level: 30 },
    { name: 'Product Quality', level: 15 },
    { name: 'Territory Disputes', level: 60 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-400">Revenue & Risk Analytics</h1>
          <div className="flex items-center space-x-4">
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              <option value="all">All Territories</option>
              <option value="albuquerque">Albuquerque</option>
              <option value="phoenix">Phoenix</option>
              <option value="denver">Denver</option>
            </select>
          </div>
        </div>

        {/* Revenue vs Expenses Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue vs Expenses</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="2"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.6}
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Level Trends */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Level Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="risk"
                    fill="#F59E0B"
                    name="Risk Level"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Risk Factors Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {riskFactors.map((factor) => (
              <RiskCard
                key={factor.name}
                name={factor.name}
                level={factor.level}
              />
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            <Alert
              type="high"
              message="Unusual DEA activity detected in sector 7"
              time="2 hours ago"
            />
            <Alert
              type="medium"
              message="Supply chain efficiency dropped by 12%"
              time="5 hours ago"
            />
            <Alert
              type="low"
              message="New competitor entered the Phoenix market"
              time="1 day ago"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RiskCard: React.FC<{ name: string; level: number }> = ({ name, level }) => {
  const getColor = (level: number) => {
    if (level >= 70) return 'bg-red-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-medium mb-2">{name}</h3>
      <div className="h-2 bg-gray-600 rounded-full">
        <motion.div
          className={`h-full rounded-full ${getColor(level)}`}
          initial={{ width: '0%' }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="mt-2 text-right text-sm">
        <span className={level >= 70 ? 'text-red-400' : level >= 40 ? 'text-yellow-400' : 'text-green-400'}>
          {level}%
        </span>
      </div>
    </div>
  );
};

const Alert: React.FC<{ type: 'high' | 'medium' | 'low'; message: string; time: string }> = ({
  type,
  message,
  time,
}) => {
  const colors = {
    high: 'border-red-500 text-red-400',
    medium: 'border-yellow-500 text-yellow-400',
    low: 'border-green-500 text-green-400',
  };

  return (
    <div className={`border-l-4 ${colors[type]} bg-gray-700 p-4 rounded-r-lg`}>
      <div className="flex justify-between items-start">
        <p className="text-white">{message}</p>
        <span className="text-sm text-gray-400">{time}</span>
      </div>
    </div>
  );
};

export default AnalyticsPage; 