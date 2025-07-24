import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
    { name: "Worker #345", action: "restarted automatically.", value: "", image: "https://placehold.co/40x40" },
    { name: "Reward Payout", action: "0.05 ETH received.", value: "+$175.00", image: "https://placehold.co/40x40" },
    { name: "Pool Switched", action: "to Ethermine for better latency.", value: "", image: "https://placehold.co/40x40" },
    { name: "Settings Optimized", action: "by AI suggestion.", value: "+1.2%", image: "https://placehold.co/40x40" },
    { name: "Maintenance", action: "scheduled for tomorrow.", value: "", image: "https://placehold.co/40x40" },
]

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Recent Activity</CardTitle>
        <CardDescription>A log of recent system events and payouts.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={activity.image} alt="Avatar" data-ai-hint="abstract block" />
                    <AvatarFallback>{activity.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="ml-auto font-medium">{activity.value}</div>
            </div>
        ))}
      </CardContent>
    </Card>
  )
}
