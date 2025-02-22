import { motion } from 'framer-motion';
import { BackgroundScene } from "@/components/empire/BackgroundScene";
import { Link } from "wouter";
import { ArrowLeft, Crown, Trophy, Star, Award } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const empireRankings = [
  {
    rank: 1,
    name: "Heisenberg",
    empire: "Blue Sky Empire",
    revenue: "$80M",
    territory: "Southwest USA",
    icon: Crown,
  },
  {
    rank: 2,
    name: "Gus Fring",
    empire: "Los Pollos Hermanos",
    revenue: "$70M",
    territory: "New Mexico",
    icon: Trophy,
  },
  {
    rank: 3,
    name: "Tuco Salamanca",
    empire: "Cartel Operations",
    revenue: "$45M",
    territory: "Mexican Border",
    icon: Star,
  },
  {
    rank: 4,
    name: "Jesse Pinkman",
    empire: "Street Level Ops",
    revenue: "$20M",
    territory: "Local Districts",
    icon: Award,
  },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#0B3D2E]">
      <BackgroundScene />
      
      {/* Header */}
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
        <h1 className="text-4xl font-bold text-[#28A745]">Empire Leaderboard</h1>
        <p className="text-gray-400 mt-2">
          "Say my name" - Top criminal empires ranked by power and influence
        </p>
      </motion.div>

      <div className="p-6">
        {/* Rankings */}
        <div className="space-y-4">
          {empireRankings.map((empire, index) => (
            <motion.div
              key={empire.rank}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/50 border-[#28A745]/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#28A745]/10">
                      <empire.icon className="w-6 h-6 text-[#28A745]" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-[#28A745]">{empire.name}</h3>
                        <span className="text-sm text-gray-400">#{empire.rank}</span>
                      </div>
                      <p className="text-gray-400">{empire.empire}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-[#28A745] font-bold">{empire.revenue}</div>
                      <div className="text-sm text-gray-400">{empire.territory}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievement Unlocks */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-[#28A745] mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-[#28A745] mx-auto mb-2" />
                <h3 className="font-bold text-[#28A745]">First Cook</h3>
                <p className="text-sm text-gray-400">Complete your first production</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-[#28A745] mx-auto mb-2" />
                <h3 className="font-bold text-[#28A745]">Master Chemist</h3>
                <p className="text-sm text-gray-400">Achieve 99% purity</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-[#28A745]/30">
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-[#28A745] mx-auto mb-2" />
                <h3 className="font-bold text-[#28A745]">Empire Builder</h3>
                <p className="text-sm text-gray-400">Control 5 territories</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
