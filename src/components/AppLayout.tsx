'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User, Repeat, Wallet, Menu, Rss, ShieldCheck, Store, MessageSquare, Search } from 'lucide-react';
import { Mine } from '@/components/ui/mine';
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
import { Input } from './ui/input';

const navItems = [
  { href: '/', label: 'Minage', icon: Mine },
  { href: '/wallet', label: 'Portefeuille', icon: Wallet },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/feed', label: 'Feed', icon: Rss },
  { href: '/marketplace', label: 'Marché', icon: Store },
  { href: '/p2p', label: 'P2P', icon: Repeat },
  { href: '/verification', label: 'Vérification', icon: ShieldCheck },
  { href: '/profile', label: 'Profil', icon: User },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isChatPage = pathname.startsWith('/chat');

  const currentPage = navItems.find((item) => item.href === pathname);
  // For dynamic routes like /chat/[id], find the base path
  const pageTitle = currentPage ? currentPage.label : navItems.find(i => pathname.startsWith(i.href))?.label || 'Zoudou';


  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-background">
        <div className="flex items-center gap-2">
           {isChatPage && pathname === '/chat' ? (
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10 bg-secondary border-none" />
            </div>
           ) : (
             <h1 className="text-lg font-semibold">{pageTitle}</h1>
           )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 py-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start",
                      pathname === item.href && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => router.push(item.href)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-24">
        {children}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-border z-50">
        <nav className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {navItems.map((item) => {
             if (['/verification', '/profile', '/p2p'].includes(item.href)) return null;

            const isActive = pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/');
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
