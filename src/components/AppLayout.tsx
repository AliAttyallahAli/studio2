
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User, Wallet, Menu, Settings, LogOut, Shield, BarChart2, Repeat, MessageSquare, Landmark, Pickaxe } from 'lucide-react';
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
  { href: '/', label: 'Minage', icon: Pickaxe },
  { href: '/wallet', label: 'Portefeuille', icon: Wallet },
  { href: '/p2p', label: 'Échange P2P', icon: Repeat },
  { href: '/citizens', label: 'Citoyens', icon: Landmark },
  { href: '/profile', label: 'Profil', icon: User },
];


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    const current = navItems.find(i => pathname === i.href);
    if (current) return current.label;
    if (pathname.startsWith('/profile')) return 'Profil';
    return 'Crypto Sentinel';
  }
  
  const pageTitle = getPageTitle();


  return (
    <div className="flex h-screen bg-background">
       <aside className="hidden md:flex flex-col w-64 border-r">
          <div className="h-16 flex items-center px-4 border-b">
             <Shield className="h-6 w-6 text-primary mr-2"/>
             <h1 className="text-xl font-semibold">Crypto Sentinel</h1>
          </div>
           <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
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
                        <AvatarImage src="https://placehold.co/100x100.png" alt="@username" data-ai-hint="profile avatar"/>
                        <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <span>@CryptoMiner</span>
                </Button>
                 <Separator className="my-2"/>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/auth')}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Se déconnecter
                </Button>
            </div>
       </aside>

       <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between h-16 px-4 border-b md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex items-center">
                                <Shield className="h-6 w-6 text-primary mr-2"/>
                                <span>Crypto Sentinel</span>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                        <div className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <SheetClose asChild key={item.label}>
                            <Button
                                variant={pathname === item.href ? 'secondary' : 'ghost'}
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
             <div className="w-8"></div>
          </header>
          <main className="flex-grow p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
       </div>
    </div>
  );
}
