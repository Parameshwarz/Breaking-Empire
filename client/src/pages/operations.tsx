import { motion } from 'framer-motion';
import { BackgroundScene } from "@/components/empire/BackgroundScene";
import { ProductionStats } from "@/components/empire/ProductionStats";
import { LocationCard } from "@/components/empire/LocationCard";
import { Link } from "wouter";
import { ArrowLeft, Beaker, Microscope, Thermometer } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#0B3D2E]">
      <BackgroundScene />
      
      {/* Superlab-themed header */}
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
        <h1 className="text-4xl font-bold text-[#28A745]">Operations Management</h1>
        <p className="text-gray-400 mt-2">
          "The chemistry must be respected" - Manage your production facilities
        </p>
      </motion.div>

      <div className="p-6">
        {/* Lab Equipment Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Beaker className="w-8 h-8 text-[#28A745]" />
                  <div>
                    <h3 className="font-bold text-[#28A745]">Chemical Supply</h3>
                    <p className="text-sm text-gray-400">96% Available</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-[#28A745]/30">
                  Restock
                </Button>
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
                <div className="flex items-center gap-3">
                  <Microscope className="w-8 h-8 text-[#28A745]" />
                  <div>
                    <h3 className="font-bold text-[#28A745]">Lab Equipment</h3>
                    <p className="text-sm text-gray-400">All Systems Operational</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-[#28A745]/30">
                  Maintain
                </Button>
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
                <div className="flex items-center gap-3">
                  <Thermometer className="w-8 h-8 text-[#28A745]" />
                  <div>
                    <h3 className="font-bold text-[#28A745]">Temperature Control</h3>
                    <p className="text-sm text-gray-400">Optimal Conditions</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-[#28A745]/30">
                  Adjust
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Production Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ProductionStats />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <LocationCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}