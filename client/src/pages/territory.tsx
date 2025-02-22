import { motion } from 'framer-motion';
import { BackgroundScene } from "@/components/empire/BackgroundScene";
import { Link } from "wouter";
import { ArrowLeft, Map, Globe, Crosshair, Radar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TerritoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#0B3D2E]">
      <BackgroundScene />
      
      {/* Cartel territory themed header */}
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
        <h1 className="text-4xl font-bold text-[#28A745]">Territory Control</h1>
        <p className="text-gray-400 mt-2">
          "I am the one who knocks" - Expand and defend your territory
        </p>
      </motion.div>

      <div className="p-6">
        {/* Territory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Map className="w-8 h-8 text-[#28A745]" />
                  <div>
                    <h3 className="font-bold text-[#28A745]">Controlled Areas</h3>
                    <p className="text-sm text-gray-400">4 Districts</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-[#28A745]/30">
                  View Map
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
                  <Globe className="w-8 h-8 text-[#28A745]" />
                  <div>
                    <h3 className="font-bold text-[#28A745]">Distribution Range</h3>
                    <p className="text-sm text-gray-400">250 mile radius</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-[#28A745]/30">
                  Expand Range
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
                  <Radar className="w-8 h-8 text-[#D72638]" />
                  <div>
                    <h3 className="font-bold text-[#D72638]">Rival Activity</h3>
                    <p className="text-sm text-gray-400">2 Threats Detected</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-[#D72638]/30 text-[#D72638]">
                  View Threats
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Territory Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative h-[600px] bg-black/30 rounded-lg border border-[#28A745]/30 p-6"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400">Interactive territory map coming soon...</p>
          </div>

          {/* Territory Control Points */}
          <motion.div
            className="absolute left-1/4 top-1/3"
            whileHover={{ scale: 1.2 }}
          >
            <Crosshair className="w-6 h-6 text-[#28A745]" />
          </motion.div>

          <motion.div
            className="absolute right-1/3 bottom-1/4"
            whileHover={{ scale: 1.2 }}
          >
            <Crosshair className="w-6 h-6 text-[#28A745]" />
          </motion.div>

          <motion.div
            className="absolute right-1/4 top-1/4"
            whileHover={{ scale: 1.2 }}
          >
            <Crosshair className="w-6 h-6 text-[#D72638]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
