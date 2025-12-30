
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User, Wallet, Menu, LogOut, Shield, Repeat, MessageSquare, Landmark, Pickaxe, UserCog, Rss, ShoppingBag, Handshake, Newspaper } from 'lucide-react';
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
  { href: '/feed', label: 'Feed', icon: Rss },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/wallet', label: 'Portefeuille', icon: Wallet },
  { href: '/p2p', label: 'Échange P2P', icon: Repeat },
  { href: '/marketplace', label: 'Marché', icon: ShoppingBag },
  { href: '/partnerships', label: 'Partenariats', icon: Newspaper },
  { href: '/verification', label: 'Vérification', icon: Shield },
  { href: '/profile', label: 'Profil', icon: User },
];

const adminNavItems = [
    { href: '/admin', label: 'Admin', icon: UserCog },
]


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    const allItems = [...navItems, ...adminNavItems];
    if (pathname === '/') return 'Minage';
    // Match more specific paths first
    const sortedItems = [...allItems].sort((a, b) => b.href.length - a.href.length);
    const current = sortedItems.find(i => pathname.startsWith(i.href) && i.href !== '/');
    if (current) return current.label;

    // Handle dynamic routes
    if (pathname.startsWith('/profile/')) return 'Profil';
    if (pathname.startsWith('/chat/')) return 'Chat';
    if (pathname.startsWith('/story/')) return 'Statut';

    return 'Zoudou';
  }
  
  const pageTitle = getPageTitle();

  const isChatPage = pathname.startsWith('/chat');


  return (
    <div className="flex h-screen bg-muted/20">
       <aside className={cn("hidden md:flex flex-col border-r bg-background", isChatPage ? "w-80" : "w-64")}>
          <div className="h-16 flex items-center px-4 border-b shrink-0">
             <Handshake className="h-6 w-6 text-primary mr-2"/>
             <h1 className="text-xl font-semibold">Zoudou</h1>
          </div>
           <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/') ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => router.push(item.href)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
              ))}
                <Separator className="my-4"/>
                {adminNavItems.map((item) => (
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
            <div className="p-4 border-t shrink-0">
                 <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/profile')}>
                    <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src="https://picsum.photos/seed/zoudou/100/100" alt="@SahelUser" data-ai-hint="profile avatar"/>
                        <AvatarFallback>SU</AvatarFallback>
                    </Avatar>
                    <span>@SahelUser</span>
                </Button>
                 <Separator className="my-2"/>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/auth')}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Se déconnecter
                </Button>
            </div>
       </aside>

       <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between h-16 px-4 border-b md:hidden shrink-0 bg-background">
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0 flex flex-col bg-background">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle>
                            <div className="flex items-center">
                                <Handshake className="h-6 w-6 text-primary mr-2"/>
                                <span>Zoudou</span>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="py-4 px-4 space-y-2 overflow-y-auto flex-grow">
                        {navItems.map((item) => (
                            <SheetClose asChild key={item.label}>
                            <Button
                                variant={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/') ? 'secondary' : 'ghost'}
                                className="justify-start w-full"
                                onClick={() => router.push(item.href)}
                            >
                                <item.icon className="mr-2 h-5 w-5" />
                                {item.label}
                            </Button>
                            </SheetClose>
                        ))}
                         <Separator className="my-4"/>
                        {adminNavItems.map((item) => (
                            <SheetClose asChild key={item.label}>
                                <Button
                                    variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                                    className="justify-start w-full"
                                    onClick={() => router.push(item.href)}
                                >
                                    <item.icon className="mr-2 h-5 w-5" />
                                    {item.label}
                                </Button>
                            </SheetClose>
                        ))}
                    </div>
                     <div className="p-4 border-t mt-auto">
                        <SheetClose asChild>
                             <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/auth')}>
                                <LogOut className="mr-2 h-5 w-5" />
                                Se déconnecter
                            </Button>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
             <h1 className="font-semibold truncate">{pageTitle}</h1>
             <div className="w-10 flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => router.push('/profile')}>
                     <Avatar className="w-8 h-8">
                        <AvatarImage src="https://picsum.photos/seed/zoudou/100/100" alt="@SahelUser" data-ai-hint="profile avatar"/>
                        <AvatarFallback>SU</AvatarFallback>
                    </Avatar>
                </Button>
             </div>
          </header>
          <main className="flex-grow p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
       </div>
    </div>
  );
}
