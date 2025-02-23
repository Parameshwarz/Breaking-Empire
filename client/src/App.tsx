import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import OperationsPage from './pages/OperationsPage';
import RiskSystemPage from './pages/RiskSystemPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/risk" element={<RiskSystemPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Toaster />
    </Router>
  );
};

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Empire Dashboard', icon: '📊' },
    { path: '/analytics', label: 'Revenue & Risk', icon: '📈' },
    { path: '/operations', label: 'Operations', icon: '🏭' },
    { path: '/risk', label: 'Risk System', icon: '⚠️' },
  ];

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white text-2xl">☰</span>
      </button>

      {/* Navigation Sidebar */}
      <motion.nav
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <Link to="/" className="block mb-8">
            <h1 className="text-2xl font-bold text-green-400">Breaking Empire</h1>
          </Link>

          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-green-600/20 text-green-400'
                    : 'hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute left-0 w-1 h-8 bg-green-400 rounded-r-full"
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <span className="animate-pulse h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-400">System Operational</span>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content Wrapper */}
      <div className="md:pl-64">
        <main className="min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Routes will be rendered here */}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default App;