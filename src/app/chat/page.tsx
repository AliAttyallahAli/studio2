'use client';

import { AppLayout } from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const chats = [
  { id: '1', name: 'Zoudou Annonces', lastMessage: 'Bienvenue sur Zoudou !', time: '14:32', avatar: 'https://placehold.co/100x100.png', type: 'group' },
  { id: '2', name: 'Alice', lastMessage: 'Salut ! Ça va ?', time: '14:30', avatar: 'https://placehold.co/100x100.png', type: 'user' },
  { id: '3', name: 'Bob', lastMessage: 'On se voit plus tard.', time: '12:15', avatar: 'https://placehold.co/100x100.png', type: 'user' },
  { id: '4', name: 'Projet Z-NFT', lastMessage: 'N\'oubliez pas la réunion de 16h.', time: '11:58', avatar: 'https://placehold.co/100x100.png', type: 'group' },
];

export default function ChatListPage() {
  const router = useRouter();

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="relative h-full flex flex-col">
        <div className="p-4 space-y-4 bg-background fixed top-16 left-0 right-0 z-10">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Rechercher ou démarrer une nouvelle discussion" className="pl-10" />
            </div>
        </div>
        
        <div className="pt-24 pb-20 flex-grow overflow-y-auto">
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className="flex items-center p-4 cursor-pointer hover:bg-secondary"
                                onClick={() => handleChatClick(chat.id)}
                            >
                                <Avatar className="w-12 h-12 mr-4">
                                    <AvatarImage src={chat.avatar} alt={chat.name} data-ai-hint={chat.type === 'group' ? 'group icon' : 'profile avatar'} />
                                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-semibold">{chat.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">{chat.time}</p>
                                    {/* Unread count badge can go here */}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="fixed bottom-20 right-4">
            <Button size="icon" className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 shadow-lg">
                <Plus className="h-6 w-6" />
            </Button>
        </div>
    </div>
  );
}
