
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search, UserPlus, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { getUserProfile } from '@/lib/chat-data';
import Link from 'next/link';


const suggestedUserIds = ['2', '3', '5'];
const suggestedUsers = suggestedUserIds.map(id => getUserProfile(id)).filter(Boolean);

export default function NewChatPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background absolute inset-0 z-20 md:relative md:border-l">
      <header className="flex items-center p-3 border-b shrink-0 bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="ml-4">
            <h2 className="text-lg font-semibold">Nouveau Chat</h2>
            <p className="text-sm text-muted-foreground">Sélectionnez un contact ou créez un groupe</p>
        </div>
      </header>

      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Rechercher par nom ou @utilisateur" className="pl-10" />
        </div>

        <Card>
            <CardContent className="p-0">
                <Link href="/chat/new/group" className="block">
                    <Button variant="ghost" className="w-full justify-start p-4 h-auto text-base">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground mr-4">
                            <Users className="h-5 w-5" />
                        </div>
                        Nouveau groupe
                    </Button>
                </Link>
            </CardContent>
        </Card>

        <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">CONTACTS FRÉQUENTS</h3>
             <Card>
                <CardContent className="p-0 divide-y divide-border">
                    {suggestedUsers.map((user) => (
                      user && (
                        <div
                            key={user.id}
                            className="flex items-center p-3 cursor-pointer hover:bg-secondary"
                            onClick={() => router.push(`/chat/${user.id}`)}
                        >
                            <Avatar className="w-10 h-10 mr-4">
                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile avatar" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold flex-grow">{user.name}</p>
                            <Button variant="ghost" size="icon">
                                <UserPlus className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                      )
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
