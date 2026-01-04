
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { allChats } from '@/lib/chat-data';
import { cn } from '@/lib/utils';
import { Megaphone } from 'lucide-react';

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
                {allChats.map((chat) => (
                    <div
                        key={chat.id}
                        className="flex items-center p-4 cursor-pointer hover:bg-secondary"
                        onClick={() => handleChatClick(chat.id)}
                    >
                       <div className="relative">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={chat.contact.avatar} alt={chat.contact.name} data-ai-hint={chat.contact.type === 'group' ? 'group icon' : 'profile avatar'} />
                                <AvatarFallback>
                                    {chat.contact.type === 'forum' ? <Megaphone className="h-6 w-6"/> : chat.contact.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            {chat.contact.type === 'user' && (
                                <div className={cn(
                                    "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background",
                                    chat.contact.status === 'En ligne' ? 'bg-green-500' : 'bg-gray-400'
                                )} />
                            )}
                        </div>

                        <div className="flex-grow ml-4">
                        <p className="font-semibold">{chat.contact.name}</p>
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
