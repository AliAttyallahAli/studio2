import { StatsCard } from "./stats-card";
import { PerformanceChart } from "./performance-chart";
import { RecentActivity } from "./recent-activity";
import { Alerts } from "./alerts";
import { Activity, Zap, Clock, ShieldCheck } from "lucide-react";

export function DashboardView() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Hashrate" value="1.25 TH/s" icon={<Activity className="h-6 w-6 text-muted-foreground" />} description="+20.1% from last month" />
        <StatsCard title="Active Workers" value="1,024" icon={<Zap className="h-6 w-6 text-muted-foreground" />} description="+180 since last hour" />
        <StatsCard title="Pending Rewards" value="0.45 ETH" icon={<Clock className="h-6 w-6 text-muted-foreground" />} description="~ $1,575.00 USD" />
        <StatsCard title="Efficiency" value="98.2%" icon={<ShieldCheck className="h-6 w-6 text-muted-foreground" />} description="All systems nominal" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
      <Alerts />
    </div>
  )
}
