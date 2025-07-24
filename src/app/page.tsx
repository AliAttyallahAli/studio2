import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarHeader } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { DashboardView } from "@/components/dashboard-view"
import { OptimizationView } from "@/components/optimization-view"
import { SentinelIcon } from "@/components/icons"
import { LayoutDashboard, Settings, LifeBuoy } from "lucide-react"

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <div className="flex flex-col h-full">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <SentinelIcon className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold text-foreground">Crypto Sentinel</h1>
            </div>
          </SidebarHeader>
          <SidebarMenu className="flex-1 px-2">
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive={true} tooltip={{ children: "Dashboard" }}>
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip={{ children: "Settings" }}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="mt-auto p-2">
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip={{children: "Support"}}>
                        <LifeBuoy/>
                        <span>Support</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </div>
        </div>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 lg:p-6 bg-background">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="dashboard">Monitoring</TabsTrigger>
              <TabsTrigger value="optimizer">AI Optimizer</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="mt-6">
              <DashboardView />
            </TabsContent>
            <TabsContent value="optimizer" className="mt-6">
              <OptimizationView />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
