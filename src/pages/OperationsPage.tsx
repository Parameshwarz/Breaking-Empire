import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Facility {
  id: string;
  name: string;
  type: 'lab' | 'distribution' | 'front';
  status: 'operational' | 'maintenance' | 'compromised';
  production: number;
  purity: number;
  risk: number;
  staff: number;
  location: string;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  reliability: number;
  status: 'active' | 'compromised' | 'terminated';
}

const OperationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'facilities' | 'distribution' | 'staff' | 'security'>('facilities');

  const facilities: Facility[] = [
    {
      id: '1',
      name: "Superlab",
      type: 'lab',
      status: 'operational',
      production: 92,
      purity: 99.1,
      risk: 15,
      staff: 4,
      location: 'Industrial Laundry Facility'
    },
    {
      id: '2',
      name: "Los Pollos Hermanos",
      type: 'front',
      status: 'operational',
      production: 100,
      purity: 0,
      risk: 25,
      staff: 12,
      location: 'Albuquerque'
    },
    {
      id: '3',
      name: "RV Lab",
      type: 'lab',
      status: 'maintenance',
      production: 45,
      purity: 96.2,
      risk: 60,
      staff: 2,
      location: 'Mobile'
    }
  ];

  const staff: Staff[] = [
    {
      id: '1',
      name: 'Walter White',
      role: 'Lead Chemist',
      reliability: 95,
      status: 'active'
    },
    {
      id: '2',
      name: 'Jesse Pinkman',
      role: 'Assistant Chemist',
      reliability: 82,
      status: 'active'
    },
    {
      id: '3',
      name: 'Gale Boetticher',
      role: 'Lab Assistant',
      reliability: 98,
      status: 'terminated'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-400';
      case 'maintenance':
        return 'text-yellow-400';
      case 'compromised':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-2">Operations Management</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                <span className="text-green-400 text-sm">Systems Online</span>
              </div>
              <div className="text-gray-400 text-sm">Product Purity: 99.1%</div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg flex items-center space-x-2"
          >
            <span>Add Facility</span>
            <span>+</span>
          </motion.button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-green-500/20">
          {['facilities', 'distribution', 'staff', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 capitalize ${
                activeTab === tab 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-400 hover:text-green-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Facilities Section */}
          {activeTab === 'facilities' && (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                  <motion.div
                    key={facility.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-900 rounded-xl p-6 border border-green-500/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{facility.name}</h3>
                        <p className="text-sm text-gray-400">{facility.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(facility.status)} bg-gray-800`}>
                        {facility.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Production</span>
                        <span className="text-green-400">{facility.production}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Purity</span>
                        <span className="text-blue-400">{facility.purity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Level</span>
                        <span className="text-red-400">{facility.risk}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Staff</span>
                        <span className="text-yellow-400">{facility.staff}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quality Control */}
              <div className="bg-gray-900 rounded-xl p-6 border border-green-500/20">
                <h2 className="text-xl font-semibold mb-4">Quality Control Metrics</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Average Purity</div>
                    <div className="text-2xl text-green-400">99.1%</div>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Production Rate</div>
                    <div className="text-2xl text-blue-400">50 kg/week</div>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Lab Efficiency</div>
                    <div className="text-2xl text-yellow-400">92%</div>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Contamination Risk</div>
                    <div className="text-2xl text-red-400">2.1%</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Staff Management */}
          {activeTab === 'staff' && (
            <div className="grid gap-6">
              <div className="grid md:grid-cols-3 gap-6">
                {staff.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-900 rounded-xl p-6 border border-green-500/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(member.status)} bg-gray-800`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reliability</span>
                        <span className="text-green-400">{member.reliability}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Distribution Network */}
          {activeTab === 'distribution' && (
            <div className="grid gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-green-500/20">
                <h2 className="text-xl font-semibold mb-4">Distribution Routes</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Los Pollos Hermanos Route</h3>
                      <p className="text-sm text-gray-400">Primary distribution network</p>
                    </div>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Southwest Territory</h3>
                      <p className="text-sm text-gray-400">Secondary distribution network</p>
                    </div>
                    <span className="text-yellow-400">Partial</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Mexico Route</h3>
                      <p className="text-sm text-gray-400">International distribution</p>
                    </div>
                    <span className="text-red-400">Compromised</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Protocols */}
          {activeTab === 'security' && (
            <div className="grid gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-green-500/20">
                <h2 className="text-xl font-semibold mb-4">Security Status</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-semibold text-green-400 mb-2">Active Protocols</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Dead drops only
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Burner phones rotation
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Regular sweep for devices
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="font-semibold text-red-400 mb-2">Threat Assessment</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                        DEA surveillance increased
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                        Competitor activity in sector 7
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Lab security optimal
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OperationsPage; 