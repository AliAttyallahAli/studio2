import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"

export function Alerts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle className="font-headline">Upcoming Maintenance</AlertTitle>
            <AlertDescription>
                Scheduled maintenance on Pool '2Miners' will occur on 2024-08-15 at 02:00 UTC. Workers will be migrated automatically.
            </AlertDescription>
        </Alert>
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="font-headline">High Temperature Warning</AlertTitle>
            <AlertDescription>
                Worker #128 is reporting temperatures above the recommended threshold. Check cooling systems immediately.
            </AlertDescription>
        </Alert>
    </div>
  )
}
