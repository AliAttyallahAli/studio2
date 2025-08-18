
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StoryCarousel } from '@/components/StoryCarousel';

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
    <AppLayout>
      <div className="grid md:grid-cols-[300px_1fr] h-full gap-6">
        <div className="flex-col h-full hidden md:flex">
          <Card className="h-full">
              <CardContent className="p-0 h-full">
                <div className="divide-y divide-border h-full overflow-y-auto">
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </div>
        <div className="h-full flex-col items-center justify-center text-center hidden md:flex">
            <MessageSquare size={64} className="text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold">Sélectionnez une conversation</h2>
            <p className="text-muted-foreground">Choisissez parmi vos conversations existantes pour commencer à chatter.</p>
        </div>
         <div className="md:hidden">
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
                        </div>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
