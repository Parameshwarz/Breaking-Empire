import { motion } from 'framer-motion';
import { ProductionStats } from './ProductionStats';
import { RiskMeter } from './RiskMeter';
import { LocationCard } from './LocationCard';
import { RevenueChart } from './RevenueChart';

interface DashboardProps {
  view?: string;
}

export function Dashboard({ view = "dashboard" }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="col-span-1 md:col-span-2 lg:col-span-3"
      >
        <h1 className="text-4xl font-bold text-[#28A745] mb-6">
          {view === "dashboard" && "Empire Dashboard"}
          {view === "analytics" && "Revenue & Risk Analytics"}
          {view === "operations" && "Operations Management"}
          {view === "leaderboard" && "Empire Leaderboard"}
        </h1>
      </motion.div>

      {/* Show different content based on the view */}
      {view === "dashboard" && (
        <>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="col-span-1"
          >
            <ProductionStats />
          </motion.div>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="col-span-1"
          >
            <RiskMeter />
          </motion.div>

          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="col-span-1"
          >
            <LocationCard />
          </motion.div>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="col-span-1 md:col-span-2 lg:col-span-3"
          >
            <RevenueChart />
          </motion.div>
        </>
      )}

      {/* Analytics View */}
      {view === "analytics" && (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevenueChart />
            <RiskMeter />
          </div>
        </motion.div>
      )}

      {/* Operations View */}
      {view === "operations" && (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LocationCard />
            <ProductionStats />
            <RiskMeter />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}