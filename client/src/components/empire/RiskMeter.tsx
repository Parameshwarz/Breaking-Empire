import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export function RiskMeter() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, []);

  return (
    <Card className="bg-black/50 border-[#D72638]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-[#D72638]" />
          Risk Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          animate={controls}
          className="relative h-40 flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#D72638]/30" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-[#D72638]"
          >
            65%
          </motion.div>
        </motion.div>
        <div className="mt-4 text-center text-sm text-[#D72638]">
          DEA Attention: Moderate
        </div>
      </CardContent>
    </Card>
  );
}
