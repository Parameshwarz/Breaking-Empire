import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Lab Status Types
interface LabStatus {
  temperature: number;
  pressure: number;
  purity: number;
  yield: number;
  status: 'cooking' | 'cooling' | 'crystallizing';
  timeRemaining: number;
  phase: string;
}

// Territory Data
interface Territory {
  name: string;
  control: number;
  risk: number;
  revenue: number;
  threats: string[];
}

const DashboardPage = () => {
  // Lab Status State
  const [labStatus, setLabStatus] = useState<LabStatus>({
    temperature: 185,
    pressure: 1013,
    purity: 99.1,
    yield: 85,
    status: 'cooking',
    timeRemaining: 45,
    phase: 'Methylamine Synthesis'
  });

  // Territory Data
  const [territories] = useState<Territory[]>([
    {
      name: 'Los Pollos Territory',
      control: 85,
      risk: 35,
      revenue: 890000,
      threats: ['ASAC Schrader Activity', 'Gus\'s Former Associates', 'Chicken Man Sightings']
    },
    {
      name: 'Casa Tranquila Zone',
      control: 45,
      risk: 65,
      revenue: 450000,
      threats: ['Tio Salamanca', 'Cartel Activity', 'Bell Ringing Incidents']
    },
    {
      name: 'Vamonos Pest Control',
      control: 25,
      risk: 45,
      revenue: 220000,
      threats: ['Todd\'s Uncle', 'Local Competition', 'Jesse\'s Friends']
    }
  ]);

  // Revenue Data
  const [revenueData] = useState([
    { month: 'Jan', revenue: 250000, purity: 95.5 },
    { month: 'Feb', revenue: 380000, purity: 96.8 },
    { month: 'Mar', revenue: 520000, purity: 97.3 },
    { month: 'Apr', revenue: 680000, purity: 98.5 },
    { month: 'May', revenue: 890000, purity: 99.1 }
  ]);

  // Add Breaking Bad quotes
  const quotes = [
    "I am the one who knocks!",
    "Say my name.",
    "I am the danger.",
    "No half measures.",
    "Yeah, science!",
    "Better call Saul!",
    "I am awake."
  ];

  // Add more Breaking Bad themed data
  const [marketData] = useState({
    marketShare: [
      { name: 'Los Pollos Territory', value: 45 },
      { name: 'Salamanca Zone', value: 30 },
      { name: 'Madrigal Network', value: 25 }
    ],
    competitors: [
      { name: 'Salamanca Cartel', share: 15, trend: '+2.3%', status: 'Ding Ding Ding!' },
      { name: 'Madrigal Overseas', share: 12, trend: '-1.5%', status: 'Lydia\'s Network' },
      { name: 'Phoenix Syndicate', share: 8, trend: '+0.8%', status: 'Jane\'s Territory' }
    ]
  });

  // Add lab process steps
  const labProcessSteps = [
    'Methylamine Acquisition',
    'Pseudo Reduction',
    'Blue Crystal Formation',
    'Yeah, Science!'
  ];

  // Simulate lab process
  useEffect(() => {
    const timer = setInterval(() => {
      setLabStatus(prev => ({
        ...prev,
        timeRemaining: prev.timeRemaining > 0 ? prev.timeRemaining - 1 : 45,
        status: prev.timeRemaining > 30 ? 'cooking' : prev.timeRemaining > 15 ? 'cooling' : 'crystallizing',
        temperature: prev.timeRemaining > 30 ? 185 : prev.timeRemaining > 15 ? 145 : 85,
        phase: prev.timeRemaining > 30 ? 'Methylamine Synthesis' : prev.timeRemaining > 15 ? 'Crystallization' : 'Final Product'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Breaking Bad Quotes Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none font-mono text-xs">
        <div className="absolute top-10 left-10">I am the one who knocks!</div>
        <div className="absolute top-20 right-20">Say my name.</div>
        <div className="absolute bottom-10 left-20">Yeah, science!</div>
        <div className="absolute bottom-20 right-10">No half measures.</div>
      </div>

      {/* Chemical Formula Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-40 left-10 text-sm font-mono">CH₃NH</div>
        <div className="absolute top-50 right-20 text-sm font-mono">C₁₀H₁₅N</div>
        <div className="absolute bottom-30 left-20 text-sm font-mono">C₁₁H₁₅NO₂</div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <QuickStatCard
            title="Blue Sky Purity"
            value="99.1%"
            trend="+0.3%"
            icon="⚗️"
            highlight
            description="Yeah Science, Bitch!"
          />
          <QuickStatCard
            title="Weekly Cook"
            value="200 lbs"
            trend="+12.5%"
            icon="🧪"
            description="Crystal Blue Persuasion"
          />
          <QuickStatCard
            title="ABQ Control"
            value="85%"
            trend="+5.2%"
            icon="🗺️"
            description="The One Who Knocks"
          />
          <QuickStatCard
            title="ASAC Heat"
            value="Medium"
            trend="-2.1%"
            icon="🚨"
            description="Minerals, Marie!"
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Lab Status Section */}
          <div className="col-span-8">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <CardHeader 
                  title="RV Lab Status" 
                  subtitle="The Crystal Ship"
                  icon="🚐"
                />
                <LabControls status={labStatus.status} />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <MetricCard
                  label="Reaction Temperature"
                  value={`${labStatus.temperature}°C`}
                  percentage={labStatus.temperature / 200 * 100}
                  icon="🌡️"
                  description="Chili P Optional"
                />
                <MetricCard
                  label="Chamber Pressure"
                  value={`${labStatus.pressure} hPa`}
                  percentage={labStatus.pressure / 1200 * 100}
                  icon="📊"
                  description="This Is Art, Jesse!"
                />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <ProcessPhase 
                  phase={labStatus.phase} 
                  timeRemaining={labStatus.timeRemaining}
                  description="Apply Yourself!"
                />
                <QualityMetrics 
                  purity={labStatus.purity} 
                  yield={labStatus.yield}
                  description="Better Than Chili P"
                />
              </div>

              <ProcessTimeline 
                status={labStatus.status} 
                phase={labStatus.phase}
                steps={labProcessSteps}
              />
            </Card>

            {/* Revenue Chart */}
            <Card className="mt-6">
              <CardHeader 
                title="Empire Analytics" 
                subtitle="Car Wash Metrics"
                icon="🚗"
              />
              <div className="h-[300px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(16, 185, 129, 0.2)" />
                        <stop offset="95%" stopColor="rgba(16, 185, 129, 0)" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                      tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(17,24,39,0.9)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="rgba(16, 185, 129, 0.8)"
                      fill="url(#revenueGradient)"
                      name="Distribution Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="purity"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Blue Sky Purity"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Territory Control */}
            <Card>
              <CardHeader 
                title="Territory Control" 
                subtitle="Tread Lightly"
                icon="🗺️"
              />
              <div className="h-[200px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketData.marketShare}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {marketData.marketShare.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={['#10B981', '#3B82F6', '#6366F1'][index]} 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                {marketData.marketShare.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: ['#10B981', '#3B82F6', '#6366F1'][index] }}
                      />
                      <span className="text-sm text-white/70">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Cartel Analysis */}
            <Card>
              <CardHeader 
                title="Cartel Activity" 
                subtitle="No Half Measures"
                icon="💀"
              />
              <div className="mt-6 space-y-4">
                {marketData.competitors.map((competitor) => (
                  <CompetitorCard
                    key={competitor.name}
                    name={competitor.name}
                    share={competitor.share}
                    trend={competitor.trend}
                    status={competitor.status}
                  />
                ))}
              </div>
            </Card>

            {/* Territory Alerts */}
            <Card>
              <CardHeader 
                title="Active Threats" 
                subtitle="I Am The Danger"
                icon="🚨"
              />
              <div className="mt-6 space-y-4">
                {territories.map((territory) => (
                  <TerritoryAlert
                    key={territory.name}
                    name={territory.name}
                    threats={territory.threats}
                    risk={territory.risk}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-6 right-6 flex space-x-4">
          <ActionButton
            icon="⚗️"
            label="Let's Cook"
            variant="primary"
          />
          <ActionButton
            icon="🚨"
            label="I Am The One Who Knocks"
            variant="danger"
          />
        </div>

        {/* Breaking Bad Footer */}
        <div className="fixed bottom-4 left-4 text-[#10B981]/30 text-sm font-mono">
          Better Call Saul! • Yeah Science! • Tread Lightly
        </div>
      </div>
    </div>
  );
};

// Modern Components

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-[#1A1A1A]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-[#10B981]/20 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ 
  title: string; 
  subtitle: string;
  icon?: string;
}> = ({ title, subtitle, icon }) => (
  <div className="flex items-start gap-3">
    {icon && (
      <span className="text-2xl mt-1">{icon}</span>
    )}
    <div>
      <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-sm text-[#10B981]">{subtitle}</p>
    </div>
  </div>
);

const StatusIndicator: React.FC<{ status: string }> = ({ status }) => (
  <div className="flex items-center">
    <motion.div
      className="w-2 h-2 rounded-full bg-emerald-500"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

const NotificationBell: React.FC<{ count: number }> = ({ count }) => (
  <motion.div
    className="relative cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-xl">🔔</span>
    {count > 0 && (
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
        {count}
      </span>
    )}
  </motion.div>
);

const UserProfile: React.FC<{ name: string; role: string }> = ({ name, role }) => (
  <div className="flex items-center space-x-3 cursor-pointer">
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
      <span className="text-sm">👤</span>
    </div>
    <div>
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-white/50">{role}</div>
    </div>
  </div>
);

const QuickStatCard: React.FC<{
  title: string;
  value: string;
  trend: string;
  icon: string;
  highlight?: boolean;
  description?: string;
  variant?: 'default' | 'warning' | 'danger';
}> = ({ title, value, trend, icon, highlight, description, variant = 'default' }) => {
  const getBgColor = () => {
    if (highlight) return 'border-[#10B981]/30 bg-[#10B981]/5';
    switch (variant) {
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'danger': return 'border-red-500/30 bg-red-500/5';
      default: return 'border-white/10 bg-white/5';
    }
  };

  return (
    <Card className={`${getBgColor()} backdrop-blur-lg transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/50">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          <p className={`text-sm mt-1 ${trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend}
          </p>
          {description && (
            <p className="text-xs text-white/30 mt-1">{description}</p>
          )}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </Card>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  percentage: number;
  icon: string;
  description?: string;
}> = ({ label, value, percentage, icon, description }) => (
  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
    <div className="flex items-center justify-between mb-3">
      <span className="text-white/50 text-sm">{label}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-2xl font-medium mb-3">{value}</div>
    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1 }}
      />
    </div>
    {description && (
      <p className="text-xs text-white/30 mt-1">{description}</p>
    )}
  </div>
);

const LabControls: React.FC<{ status: string }> = ({ status }) => (
  <div className="flex items-center space-x-4">
    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
      Adjust Parameters
    </button>
    <button className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 text-sm hover:bg-emerald-500/30 transition-colors">
      View Cameras
    </button>
  </div>
);

const ProcessPhase: React.FC<{ phase: string; timeRemaining: number; description: string }> = ({ phase, timeRemaining, description }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">{phase}</h3>
      <span className="text-white/50">{timeRemaining}s</span>
    </div>
    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500"
        initial={{ width: '100%' }}
        animate={{ width: `${(timeRemaining / 45) * 100}%` }}
        transition={{ duration: 1, ease: 'linear' }}
      />
    </div>
    <p className="text-xs text-white/50">{description}</p>
  </div>
);

const QualityMetrics: React.FC<{ purity: number; yield: number; description: string }> = ({ purity, yield: yieldValue, description }) => (
  <div className="space-y-4">
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/50">Purity</span>
        <span className="text-emerald-500">{purity}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${purity}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/50">Yield</span>
        <span>{yieldValue}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${yieldValue}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
    <p className="text-xs text-white/50">{description}</p>
  </div>
);

const ProcessTimeline: React.FC<{ status: string; phase: string; steps: string[] }> = ({ status, phase, steps }) => (
  <div className="mt-8 pt-6 border-t border-white/10">
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <TimelineStep
          key={index}
          label={step}
          status={status === 'cooking' ? 'current' : status === 'cooling' ? 'pending' : 'completed'}
        />
      ))}
    </div>
  </div>
);

const TimelineStep: React.FC<{
  label: string;
  status: 'pending' | 'current' | 'completed';
}> = ({ label, status }) => (
  <div className="flex flex-col items-center">
    <motion.div
      className={`w-4 h-4 rounded-full ${
        status === 'completed' ? 'bg-emerald-500' :
        status === 'current' ? 'bg-blue-500' :
        'bg-white/20'
      }`}
      animate={status === 'current' ? {
        scale: [1, 1.2, 1],
        boxShadow: [
          '0 0 0 0 rgba(59, 130, 246, 0.5)',
          '0 0 0 10px rgba(59, 130, 246, 0)',
          '0 0 0 0 rgba(59, 130, 246, 0.5)'
        ]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <span className="mt-2 text-sm text-white/50">{label}</span>
  </div>
);

const CompetitorCard: React.FC<{
  name: string;
  share: number;
  trend: string;
  status: string;
}> = ({ name, share, trend, status }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
    <div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-white/50">Market Share: {share}%</p>
    </div>
    <span className={`text-sm ${trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
      {trend}
    </span>
  </div>
);

const TerritoryAlert: React.FC<{
  name: string;
  threats: string[];
  risk: number;
}> = ({ name, threats, risk }) => (
  <div className="p-3 bg-white/5 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium">{name}</h3>
      <RiskBadge risk={risk} />
    </div>
    <div className="space-y-1">
      {threats.map((threat, index) => (
        <div key={index} className="flex items-center text-sm text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
          {threat}
        </div>
      ))}
    </div>
  </div>
);

const RiskBadge: React.FC<{ risk: number }> = ({ risk }) => {
  const getColor = () => {
    if (risk < 30) return 'bg-emerald-500/20 text-emerald-500';
    if (risk < 70) return 'bg-yellow-500/20 text-yellow-500';
    return 'bg-red-500/20 text-red-500';
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getColor()}`}>
      {risk}% Risk
    </span>
  );
};

const ActionButton: React.FC<{
  icon: string;
  label: string;
  variant: 'primary' | 'danger';
}> = ({ icon, label, variant }) => (
  <motion.button
    className={`px-6 py-3 rounded-xl flex items-center space-x-2 ${
      variant === 'primary' 
        ? 'bg-emerald-500 hover:bg-emerald-600' 
        : 'bg-red-500 hover:bg-red-600'
    } transition-colors`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </motion.button>
);

export default DashboardPage; 