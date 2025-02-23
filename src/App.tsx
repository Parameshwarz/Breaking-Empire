import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import OperationsPage from './pages/OperationsPage';
import RiskSystemPage from './pages/RiskSystemPage';
import MapPage from './pages/MapPage';
import Sidebar from './components/Sidebar';

// Layout wrapper component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-black">
      {!isLandingPage && <Sidebar />}
      <div className={!isLandingPage ? "ml-20" : ""}>
        {children}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/risk" element={<RiskSystemPage />} />
          </Routes>
        </AnimatePresence>
      </AppLayout>
    </Router>
  );
};

export default App; 