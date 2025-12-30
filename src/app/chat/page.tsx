
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const chats = [
  { id: '1', name: 'Zoudou Annonces', lastMessage: 'Bienvenue sur Zoudou !', time: '14:32', avatar: 'https://picsum.photos/seed/announce/100/100', type: 'group' },
  { id: '2', name: 'Alice', lastMessage: 'Salut ! Ça va ?', time: '14:30', avatar: 'https://picsum.photos/seed/alice/100/100', type: 'user' },
  { id: '3', name: 'Bob', lastMessage: 'On se voit plus tard.', time: '12:15', avatar: 'https://picsum.photos/seed/bob/100/100', type: 'user' },
  { id: '4', name: 'Projet Z-NFT', lastMessage: 'N\'oubliez pas la réunion de 16h.', time: '11:58', avatar: 'https://picsum.photos/seed/nft/100/100', type: 'group' },
];

const ChatList = () => {
    const router = useRouter();
    const handleChatClick = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b">
                <Button className="w-full" onClick={() => router.push('/chat/new')}>
                    Nouveau Message
                </Button>
            </div>
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
        </div>
    )
}

export default function ChatListPage() {

  return (
    <div className="h-full flex flex-col">
        <ChatList />
    </div>
  );
}
