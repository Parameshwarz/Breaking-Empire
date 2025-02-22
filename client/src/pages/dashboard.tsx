import { BackgroundScene } from "@/components/empire/BackgroundScene";
import { Dashboard } from "@/components/empire/Dashboard";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Factory,
  Skull,
  BarChart3,
  Shield,
  LogOut
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-black/50 border-r border-[#28A745]/30 p-4 flex flex-col"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#28A745]">Criminal Empire</h2>
          <p className="text-sm text-gray-400">Management Dashboard</p>
        </div>

        <nav className="flex-1">
          <motion.div className="space-y-2">
            {[
              { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
              { icon: Factory, label: "Production", href: "/production" },
              { icon: Skull, label: "Territory", href: "/territory" },
              { icon: BarChart3, label: "Analytics", href: "/analytics" },
              { icon: Shield, label: "Security", href: "/security" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.a
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-[#28A745] hover:bg-[#28A745]/10 transition-colors ${
                    item.href === "/dashboard" ? "bg-[#28A745]/10 text-[#28A745]" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </motion.a>
              </Link>
            ))}
          </motion.div>
        </nav>

        <Link href="/">
          <motion.a
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors mt-auto"
          >
            <LogOut className="w-5 h-5" />
            Exit Dashboard
          </motion.a>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 relative">
        <BackgroundScene />
        <Dashboard />
      </div>
    </div>
  );
}
