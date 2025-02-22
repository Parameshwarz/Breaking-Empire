import { motion } from 'framer-motion';
import { BackgroundScene } from "@/components/empire/BackgroundScene";
import { RevenueChart } from "@/components/empire/RevenueChart";
import { RiskMeter } from "@/components/empire/RiskMeter";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function RevenueAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#0B3D2E]">
      <BackgroundScene />
      
      {/* Header with Los Pollos Hermanos theme */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="p-6 border-b border-[#28A745]/30"
      >
        <Link href="/dashboard">
          <motion.button
            whileHover={{ x: -5 }}
            className="text-[#28A745] mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </motion.button>
        </Link>
        <h1 className="text-4xl font-bold text-[#28A745]">Revenue Analytics</h1>
        <p className="text-gray-400 mt-2">
          "I am not in danger, I am the danger" - Monitor your empire's financial growth
        </p>
      </motion.div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <DollarSign className="w-8 h-8 text-[#28A745]" />
                  <span className="text-2xl font-bold text-[#28A745]">$2.4M</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Weekly Revenue</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <TrendingUp className="w-8 h-8 text-[#28A745]" />
                  <span className="text-2xl font-bold text-[#28A745]">+45%</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Growth Rate</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <AlertTriangle className="w-8 h-8 text-[#D72638]" />
                  <span className="text-2xl font-bold text-[#D72638]">Medium</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Current Risk Level</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="h-[500px]"
          >
            <RevenueChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="h-[500px]"
          >
            <RiskMeter />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
