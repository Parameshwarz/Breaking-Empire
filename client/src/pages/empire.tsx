import { BackgroundScene } from "@/components/empire/BackgroundScene";
import { Dashboard } from "@/components/empire/Dashboard";

export default function EmpirePage() {
  return (
    <div className="min-h-screen">
      <BackgroundScene />
      <Dashboard />
    </div>
  );
}
