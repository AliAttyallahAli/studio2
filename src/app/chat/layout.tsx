
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

const chats = [
  { id: '1', name: 'Zoudou Annonces', lastMessage: 'Bienvenue sur Zoudou !', time: '14:32', avatar: 'https://placehold.co/100x100.png', type: 'group' },
  { id: '2', name: 'Alice', lastMessage: 'Salut ! Ça va ?', time: '14:30', avatar: 'https://placehold.co/100x100.png', type: 'user' },
  { id: '3', name: 'Bob', lastMessage: 'On se voit plus tard.', time: '12:15', avatar: 'https://placehold.co/100x100.png', type: 'user' },
  { id: '4', name: 'Projet Z-NFT', lastMessage: 'N\'oubliez pas la réunion de 16h.', time: '11:58', avatar: 'https://placehold.co/100x100.png', type: 'group' },
];

const ChatList = () => {
    const router = useRouter();
    const handleChatClick = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    return (
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
    )
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            <div className="md:grid md:grid-cols-[auto,1fr] h-full gap-0 md:p-0 -m-4 md:-m-6">
                <div className="hidden md:flex flex-col border-r h-full">
                    <ChatList />
                </div>
                <div className="h-full">
                    {children}
                </div>
            </div>
        </AppLayout>
    );
}
