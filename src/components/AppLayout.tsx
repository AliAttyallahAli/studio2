
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User, Wallet, Menu, Settings, LogOut, Shield, BarChart2, Repeat, MessageSquare } from 'lucide-react';
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
  { href: '/config', label: 'Configuration', icon: Settings },
  { href: '/transactions', label: 'Transactions', icon: Repeat },
  { href: '/chat', label: 'Support Chat', icon: MessageSquare },
];


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    const current = navItems.find(i => pathname === i.href);
    if (current) return current.label;
    if (pathname.startsWith('/config')) return 'Configuration';
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
                        <AvatarImage src="https://placehold.co/100x100.png" alt="@username" data-ai-hint="profile avatar" />
                        <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">@CryptoMiner</span>
                </Button>
            </div>
       </aside>

       <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-50 flex items-center justify-between md:justify-end h-16 px-4 border-b shrink-0 bg-background">
             <div className="md:hidden">
                 <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Ouvrir le menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader className="border-b pb-4 mb-4">
                           <SheetTitle>
                                <div className="flex items-center">
                                    <Shield className="h-6 w-6 text-primary mr-2"/>
                                    Crypto Sentinel
                                </div>
                           </SheetTitle>
                        </SheetHeader>
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
                         <Separator className="my-2"/>
                         <SheetClose asChild>
                             <Button variant="ghost" className="justify-start" onClick={() => router.push('/profile')}>
                                <User className="mr-2 h-5 w-5" />
                                Profil
                            </Button>
                         </SheetClose>
                          <SheetClose asChild>
                             <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" onClick={() => router.push('/auth')}>
                                <LogOut className="mr-2 h-5 w-5" />
                                Se déconnecter
                            </Button>
                         </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
             <h1 className="font-semibold md:hidden">{pageTitle}</h1>
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => router.push('/profile')}>
              <User className="w-5 h-5" />
            </Button>
          </header>
          <main className="flex-grow p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
       </div>
    </div>
  );
}
