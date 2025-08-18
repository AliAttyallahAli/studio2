'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User, Repeat, Wallet } from 'lucide-react';
import { Mine } from '@/components/ui/mine';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/wallet', label: 'Portefeuille', icon: Wallet },
  { href: '/mining', label: 'Minage', icon: Mine },
  { href: '/marketplace', label: 'Marché', icon: Repeat },
  { href: '/profile', label: 'Profil', icon: User },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4 md:p-6 overflow-y-auto pb-24">
          {children}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-border z-50">
        <nav className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
