import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Beaker, TrendingUp } from "lucide-react";

export function ProductionStats() {
  return (
    <Card className="bg-black/50 border-[#28A745]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-[#28A745]" />
          Production Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Purity</span>
              <span className="text-sm text-[#28A745]">96.2%</span>
            </div>
            <Progress value={96.2} className="bg-[#28A745]/20" />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Efficiency</span>
              <span className="text-sm text-[#28A745]">78.5%</span>
            </div>
            <Progress value={78.5} className="bg-[#28A745]/20" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4 text-[#28A745]" />
            <span className="text-sm text-muted-foreground">
              Production rate: 50kg/week
            </span>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}