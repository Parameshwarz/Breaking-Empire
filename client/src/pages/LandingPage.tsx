import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background overlay with green tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-black/80 z-10" />
      
      {/* Breaking Bad themed background */}
      <div 
        className="absolute inset-0 bg-[url('/images/breaking-bad-bg.jpg')] bg-cover bg-center"
        style={{ filter: 'brightness(0.4)' }}
      />

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-['Heisenberg']">
            Build Your Empire
          </h1>
          <p className="text-xl md:text-2xl text-green-400 mb-8">
            "I am not in danger, I am the danger"
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            title="Empire Dashboard"
            description="Track your empire's growth and monitor key metrics"
            path="/dashboard"
            icon="📊"
          />
          <FeatureCard
            title="Revenue & Risk Analytics"
            description="Analyze profits and assess potential threats"
            path="/analytics"
            icon="💰"
          />
          <FeatureCard
            title="Operations Management"
            description="Manage your production facilities and distribution"
            path="/operations"
            icon="🏭"
          />
          <FeatureCard
            title="Risk System"
            description="Stay ahead of law enforcement and competitors"
            path="/risk"
            icon="⚠️"
          />
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/dashboard"
            className="inline-block bg-green-600 hover:bg-green-700 text-white text-xl px-12 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-green-500/50"
          >
            Start Empire
          </Link>
        </motion.div>
      </div>

      {/* Chemical formula overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="absolute bottom-4 left-4 text-green-500 opacity-30 text-sm font-mono">
        C₁₀H₁₅N • CH₃
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  title: string;
  description: string;
  path: string;
  icon: string;
}> = ({ title, description, path, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black/80 border border-green-900 rounded-lg p-6 hover:border-green-500 transition-all duration-300"
    >
      <Link to={path} className="block">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-green-400">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </Link>
    </motion.div>
  );
};

export default LandingPage; 