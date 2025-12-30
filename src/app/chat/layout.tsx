
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const chats = [
  { id: '1', name: 'Zoudou Annonces', lastMessage: 'Bienvenue sur Zoudou !', time: '14:32', avatar: 'https://picsum.photos/seed/announce/100/100', type: 'group' },
  { id: '2', name: 'Alice', lastMessage: 'Salut ! Ça va ?', time: '14:30', avatar: 'https://picsum.photos/seed/alice/100/100', type: 'user' },
  { id: '3', name: 'Bob', lastMessage: 'On se voit plus tard.', time: '12:15', avatar: 'https://picsum.photos/seed/bob/100/100', type: 'user' },
  { id: '4', name: 'Projet Z-NFT', lastMessage: 'N\'oubliez pas la réunion de 16h.', time: '11:58', avatar: 'https://picsum.photos/seed/nft/100/100', type: 'group' },
];

const ChatList = () => {
    const router = useRouter();
    const pathname = usePathname();
    
    const handleChatClick = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    return (
        <div className='h-full flex flex-col'>
             <div className="p-4 border-b">
                <Button className="w-full" onClick={() => router.push('/chat/new')}>
                    Nouveau Message
                </Button>
            </div>
             <div className="divide-y divide-border flex-grow overflow-y-auto">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={cn("flex items-center p-4 cursor-pointer hover:bg-secondary",
                            pathname === `/chat/${chat.id}` && 'bg-secondary'
                        )}
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

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isRootChatPage = pathname === '/chat';
    
    return (
        <AppLayout>
            <div className="md:grid md:grid-cols-[320px,1fr] h-full gap-0 md:p-0 -m-4 md:-m-6">
                <div className={cn("hidden md:flex flex-col border-r h-full bg-background", isRootChatPage && "md:flex", !isRootChatPage && "md:flex")}>
                    <ChatList />
                </div>
                 <div className={cn("h-full", isRootChatPage && "hidden md:block")}>
                    {children}
                </div>
            </div>
        </AppLayout>
    );
}
