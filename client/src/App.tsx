import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import DashboardPage from "@/pages/dashboard";
import RevenueAnalyticsPage from "@/pages/revenue-analytics";
import OperationsPage from "@/pages/operations";
import LeaderboardPage from "@/pages/leaderboard";
import TerritoryPage from "@/pages/territory";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/analytics" component={RevenueAnalyticsPage} />
      <Route path="/operations" component={OperationsPage} />
      <Route path="/territory" component={TerritoryPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;