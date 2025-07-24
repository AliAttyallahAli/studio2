import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarHeader } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { ProfileView } from "@/components/profile-view"
import { SentinelIcon } from "@/components/icons"
import { LayoutDashboard, Settings, LifeBuoy, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
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
              <SidebarMenuButton href="/" tooltip={{ children: "Dashboard" }}>
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
          <ProfileView />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
