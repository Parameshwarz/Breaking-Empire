import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Building2, Shield } from "lucide-react";

export function LocationCard() {
  return (
    <Card className="bg-black/50 border-[#00A8E8]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#00A8E8]" />
          Current Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Superlab</span>
            <Badge variant="secondary" className="bg-[#00A8E8]/20 text-[#00A8E8]">
              Level 3
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#00A8E8]" />
              <span className="text-sm text-muted-foreground">
                Security Level: High
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Cost: $50,000/week
            </div>
          </div>

          <div className="pt-4 border-t border-[#00A8E8]/20">
            <span className="text-sm text-[#00A8E8]">
              Upgrade available: Industrial Ventilation
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
