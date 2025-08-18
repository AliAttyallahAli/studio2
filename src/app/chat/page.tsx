
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
      <div className="relative h-full flex flex-col -m-4">
        <div className="flex-grow overflow-y-auto pb-20">
          <div className="p-4">
            <StoryCarousel />
          </div>
          <Card className="border-0 rounded-none border-t">
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
          <Button size="icon" className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 shadow-lg" onClick={() => router.push('/chat/new')}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
