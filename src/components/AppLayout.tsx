
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User, Wallet, Menu, Settings, LogOut, Shield, BarChart2, Repeat, MessageSquare, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart2 },
  { href: '/wallet', label: 'Portefeuille', icon: Wallet },
  { href: '/feed', label: 'Feed', icon: MessageSquare },
  { href: '/citizens', label: 'Citoyens', icon: Landmark },
  { href: '/marketplace', label: 'Marché', icon: Repeat },
];


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    const current = navItems.find(i => pathname.startsWith(i.href) && i.href !== '/');
    if(pathname === '/') return 'Dashboard';
    if (current) return current.label;

    if (pathname.startsWith('/chat')) return 'Chat';
    if (pathname.startsWith('/profile')) return 'Profil';
    if (pathname.startsWith('/verification')) return 'Vérification';
    if (pathname.startsWith('/story')) return 'Statut';
    if (pathname.startsWith('/admin')) return 'Administration';
    return 'Zoudou';
  }
  
  const pageTitle = getPageTitle();


  return (
    <div className="flex h-screen bg-background">
       <aside className="hidden md:flex flex-col w-64 border-r">
          <div className="h-16 flex items-center px-4 border-b">
             <Shield className="h-6 w-6 text-primary mr-2"/>
             <h1 className="text-xl font-semibold">Zoudou</h1>
          </div>
           <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => router.push(item.href)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
              ))}
           </nav>
            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/profile')}>
                    <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="@username" data-ai-hint="profile avatar" />
                        <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">@CryptoMiner</span>
                </Button>
            </div>
       </aside>

       <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-background md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <div className="flex h-16 items-center px-4 border-b">
                        <Shield className="h-6 w-6 text-primary mr-2"/>
                        <h1 className="text-xl font-semibold">Zoudou</h1>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <SheetClose asChild key={item.label}>
                            <Button
                                variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                                className="justify-start"
                                onClick={() => router.push(item.href)}
                            >
                                <item.icon className="mr-2 h-5 w-5" />
                                {item.label}
                            </Button>
                            </SheetClose>
                        ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
             <h1 className="font-semibold">{pageTitle}</h1>
              <Button variant="ghost" size="icon" onClick={() => router.push('/chat/new')}>
                <MessageSquare className="w-5 h-5" />
            </Button>
          </header>
          <main className="flex-grow p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
       </div>
    </div>
  );
}
