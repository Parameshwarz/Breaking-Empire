import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Types
interface MoneyLaunderingData {
  business: string;
  amount: number;
  suspicionLevel: number;
}

interface TerritoryData {
  name: string;
  revenue: number;
  purity: number;
  risk: number;
}

const AnalyticsPage: React.FC = () => {
  const [heisenbergMode, setHeisenbergMode] = useState(false);
  
  // Enhanced data with Breaking Bad theme
  const [revenueData] = useState([
    { month: 'Jan', revenue: 250000, expenses: 80000, risk: 25, purity: 96.5 },
    { month: 'Feb', revenue: 380000, expenses: 95000, risk: 35, purity: 97.2 },
    { month: 'Mar', revenue: 520000, expenses: 120000, risk: 45, purity: 98.4 },
    { month: 'Apr', revenue: 680000, expenses: 150000, risk: 55, purity: 98.9 },
    { month: 'May', revenue: 890000, expenses: 200000, risk: 65, purity: 99.1 },
  ]);

  const [moneyLaundering] = useState<MoneyLaunderingData[]>([
    { business: "A1A Car Wash", amount: 400000, suspicionLevel: 15 },
    { business: "Laser Tag", amount: 250000, suspicionLevel: 35 },
    { business: "Nail Salon", amount: 150000, suspicionLevel: 25 },
    { business: "Vending Machines", amount: 100000, suspicionLevel: 45 }
  ]);

  const [territories] = useState<TerritoryData[]>([
    { name: "Los Pollos Territory", revenue: 450000, purity: 99.1, risk: 35 },
    { name: "Tuco's Former Zone", revenue: 280000, purity: 98.5, risk: 65 },
    { name: "Czech Republic", revenue: 620000, purity: 97.8, risk: 45 }
  ]);

  const [riskFactors] = useState([
    { name: 'DEA Surveillance', level: 75, icon: '👮' },
    { name: 'Competitor Activity', level: 45, icon: '🔫' },
    { name: 'Supply Chain', level: 30, icon: '🚛' },
    { name: 'Product Quality', level: 15, icon: '⚗️' },
    { name: 'Territory Disputes', level: 60, icon: '🗺️' },
  ]);

  const [showHeisenberg, setShowHeisenberg] = useState(false);
  const [crystalRotation, setCrystalRotation] = useState(0);

  // Rotate crystal effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCrystalRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Lab Environment Background */}
      <div className="absolute inset-0 bg-[url('/images/lab-bg.jpg')] opacity-10" />
      
      {/* RV Dashboard Layout */}
      <div className="relative z-10 p-8">
        {/* Top Control Panel */}
        <div className="flex items-center justify-between bg-[#111]/80 backdrop-blur-sm p-4 rounded-lg border border-[#4ADE80]/20 mb-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[#4ADE80] text-xs">SYSTEM STATUS</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="text-sm">OPERATIONAL</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[#4ADE80] text-xs">CURRENT BATCH</span>
              <span className="text-sm">#247</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#4ADE80] text-xs">PURITY LEVEL</span>
              <span className="text-sm">99.1%</span>
            </div>
          </div>
          <button 
            onClick={() => setHeisenbergMode(!heisenbergMode)}
            className="bg-[#1a1a1a] px-4 py-2 rounded border border-[#4ADE80]/20 hover:bg-[#4ADE80]/10"
          >
            SAY MY NAME
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Lab Metrics */}
          <div className="col-span-3 space-y-6">
            <LabMetricsPanel />
            <SecurityPanel />
          </div>

          {/* Center Column - Main Analytics */}
          <div className="col-span-6 space-y-6">
            <ProductionMetrics data={revenueData} />
            <TerritoryOverview territories={territories} />
          </div>

          {/* Right Column - Business Operations */}
          <div className="col-span-3 space-y-6">
            <MoneyLaunderingPanel data={moneyLaundering} />
            <RiskAssessment />
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#111]/80 backdrop-blur-sm border-t border-[#4ADE80]/20 p-2">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#4ADE80]">LAB TEMPERATURE: 185°C</span>
              <span>|</span>
              <span className="text-[#4ADE80]">PRESSURE: 1013 hPa</span>
              <span>|</span>
              <span className="text-[#4ADE80]">BATCH TIME: 45:23</span>
            </div>
            <div className="font-mono text-xs text-[#4ADE80]/50">C₁₀H₁₅N • CH₃</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Component: Lab Metrics Panel
const LabMetricsPanel = () => (
  <div className="bg-[#111]/80 backdrop-blur-sm rounded-lg border border-[#4ADE80]/20 p-4">
    <h3 className="text-[#4ADE80] text-sm mb-4">LAB METRICS</h3>
    <div className="space-y-4">
      <MetricItem label="Temperature" value="185°C" trend="+2°C" />
      <MetricItem label="Pressure" value="1013 hPa" trend="-5 hPa" />
      <MetricItem label="Humidity" value="45%" trend="+2%" />
      <MetricItem label="Air Quality" value="Normal" trend="Stable" />
    </div>
  </div>
);

// New Component: Security Panel
const SecurityPanel = () => (
  <div className="bg-[#111]/80 backdrop-blur-sm rounded-lg border border-[#4ADE80]/20 p-4">
    <h3 className="text-[#4ADE80] text-sm mb-4">SECURITY STATUS</h3>
    <div className="space-y-4">
      <SecurityItem label="Perimeter" status="Secure" />
      <SecurityItem label="Cameras" status="Active" />
      <SecurityItem label="Motion Sensors" status="Armed" />
      <SecurityItem label="Heat Signatures" status="2 Detected" warning />
    </div>
  </div>
);

// New Component: Production Metrics
const ProductionMetrics: React.FC<{ data: any[] }> = ({ data }) => (
  <div className="bg-[#111]/80 backdrop-blur-sm rounded-lg border border-[#4ADE80]/20 p-4">
    <h3 className="text-[#4ADE80] text-sm mb-4">PRODUCTION ANALYTICS</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
          <XAxis dataKey="month" stroke="#4ADE80" />
          <YAxis stroke="#4ADE80" />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#111',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              color: '#fff'
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4ADE80"
            fill="url(#productionGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// New Component: Territory Overview
const TerritoryOverview: React.FC<{ territories: TerritoryData[] }> = ({ territories }) => (
  <div className="bg-[#111]/80 backdrop-blur-sm rounded-lg border border-[#4ADE80]/20 p-4">
    <h3 className="text-[#4ADE80] text-sm mb-4">TERRITORY CONTROL</h3>
    <div className="grid grid-cols-3 gap-4">
      {territories.map(territory => (
        <TerritoryMetrics key={territory.name} territory={territory} />
      ))}
    </div>
  </div>
);

// New Component: Money Laundering Panel
const MoneyLaunderingPanel: React.FC<{ data: MoneyLaunderingData[] }> = ({ data }) => (
  <div className="bg-[#111]/80 backdrop-blur-sm rounded-lg border border-[#4ADE80]/20 p-4">
    <h3 className="text-[#4ADE80] text-sm mb-4">BUSINESS OPERATIONS</h3>
    <div className="h-[200px] mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="business"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            label={({ business }) => business}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={['#4ADE80', '#22c55e', '#16a34a', '#15803d'][index]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-[#1a1a1a] border border-[#4ADE80] rounded-lg p-3 shadow-lg shadow-[#4ADE80]/20">
                    <div className="font-bold text-[#4ADE80] mb-1">{data.business}</div>
                    <div className="text-white text-sm">
                      Revenue: ${data.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#4ADE80]/80 mt-1">
                      Suspicion Level: {data.suspicionLevel}%
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="space-y-2">
      {data.map(business => (
        <BusinessMetrics key={business.business} data={business} />
      ))}
    </div>
  </div>
);

// New Component: Risk Assessment
const RiskAssessment = () => (
  <div className="bg-[#111]/80 backdrop-blur-sm rounded-lg border border-[#4ADE80]/20 p-4">
    <h3 className="text-[#4ADE80] text-sm mb-4">RISK ASSESSMENT</h3>
    <div className="space-y-4">
      <RiskItem label="DEA Activity" level={65} />
      <RiskItem label="Competitor Presence" level={45} />
      <RiskItem label="Supply Chain" level={25} />
      <RiskItem label="Product Quality" level={15} />
    </div>
  </div>
);

// Utility Components
const MetricItem: React.FC<{ label: string; value: string; trend: string }> = ({ label, value, trend }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-white/70">{label}</span>
    <div className="text-right">
      <span className="text-sm font-mono">{value}</span>
      <span className="text-xs text-[#4ADE80] ml-2">{trend}</span>
    </div>
  </div>
);

const SecurityItem: React.FC<{ label: string; status: string; warning?: boolean }> = ({ label, status, warning }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-white/70">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${warning ? 'bg-red-500' : 'bg-[#4ADE80]'} animate-pulse`} />
      <span className={`text-sm ${warning ? 'text-red-500' : 'text-[#4ADE80]'}`}>{status}</span>
    </div>
  </div>
);

const TerritoryMetrics: React.FC<{ territory: TerritoryData }> = ({ territory }) => (
  <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
    <h4 className="text-sm font-medium mb-2">{territory.name}</h4>
    <div className="space-y-2">
      <ProgressBar label="Control" value={territory.purity} color="#4ADE80" />
      <ProgressBar label="Risk" value={territory.risk} color="#ef4444" />
    </div>
  </div>
);

const BusinessMetrics: React.FC<{ data: MoneyLaunderingData }> = ({ data }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-white/70">{data.business}</span>
    <div className="flex items-center gap-4">
      <span>${data.amount.toLocaleString()}</span>
      <ProgressBar value={data.suspicionLevel} color="#4ADE80" small />
    </div>
  </div>
);

const RiskItem: React.FC<{ label: string; level: number }> = ({ label, level }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span className="text-white/70">{label}</span>
      <span className={level > 50 ? 'text-red-500' : 'text-[#4ADE80]'}>{level}%</span>
    </div>
    <ProgressBar value={level} color={level > 50 ? '#ef4444' : '#4ADE80'} />
  </div>
);

const ProgressBar: React.FC<{ 
  label?: string; 
  value: number; 
  color: string;
  small?: boolean;
}> = ({ label, value, color, small }) => (
  <div className="space-y-1">
    {label && (
      <div className="flex justify-between text-xs">
        <span className="text-white/50">{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
    )}
    <div className={`${small ? 'h-1' : 'h-1.5'} bg-white/10 rounded-full overflow-hidden`}>
      <div 
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

export default AnalyticsPage; 