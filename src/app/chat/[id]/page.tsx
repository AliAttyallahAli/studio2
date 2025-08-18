
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowLeft, Mic, MoreVertical, Paperclip, Phone, Send, Video, FileText, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import React from 'react';

const messages = [
  { id: 1, content: 'Salut ! Comment ça va ?', sender: 'other', time: '14:28' },
  { id: 2, content: 'Ça va bien, merci ! Et toi ?', sender: 'me', time: '14:29' },
  { id: 3, content: 'Super ! Heureux de rejoindre la communauté Zoudou ! Prêt à miner mes premiers tokens Z. 🚀', sender: 'other', time: '14:30' },
  { id: 'img-1', type: 'image', url: 'https://placehold.co/600x400.png', hint: 'abstract design', sender: 'other', time: '14:32' },
  { id: 4, content: 'Bienvenue ! C\'est une super plateforme.', sender: 'me', time: '14:31' },
  { id: 'file-1', type: 'file', file: { name: 'whitepaper_zoudou.pdf', size: '1.2 MB' }, sender: 'me', time: '14:35' },
];

const FileAttachmentCard = ({ file }: { file: { name: string, size: string } }) => (
    <div className="flex items-center p-3 rounded-lg bg-background/20 mt-2">
        <FileText className="h-8 w-8 mr-3 text-muted-foreground" />
        <div className="flex-grow">
            <p className="font-semibold truncate">{file.name}</p>
            <p className="text-sm opacity-80">{file.size}</p>
        </div>
        <Button variant="ghost" size="icon">
            <Download className="h-5 w-5" />
        </Button>
    </div>
);


export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // In a real app, you'd fetch chat details based on params.id
  const chatName = "Alice";
  const chatAvatar = "https://placehold.co/100x100.png";

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Fichier sélectionné:', file.name);
      // Here you would handle the file upload
    }
  };


  return (
    <div className="flex flex-col h-full bg-card md:border-l">
      <header className="flex items-center p-3 border-b shrink-0">
        <Button variant="ghost" size="icon" onClick={() => router.push('/chat')} className="md:hidden">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3 ml-2 cursor-pointer" onClick={() => router.push(`/chat/${params.id}/settings`)}>
            <Avatar>
                <AvatarImage src={chatAvatar} alt={chatName} data-ai-hint="profile avatar"/>
                <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">{chatName}</h2>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
            </Button>
             <Button variant="ghost" size="icon" onClick={() => router.push(`/chat/${params.id}/settings`)}>
                <MoreVertical className="h-5 w-5" />
            </Button>
        </div>
      </header>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2',
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-3 py-2',
                  message.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary',
                   (message.type === 'image' || message.type === 'file') && 'p-2'
                )}
              >
                {message.content && <p>{message.content}</p>}
                
                {message.type === 'image' && message.url && (
                    <Image src={message.url} alt="Pièce jointe" width={300} height={200} className="rounded-md object-cover" data-ai-hint={message.hint} />
                )}

                {message.type === 'file' && message.file && (
                    <FileAttachmentCard file={message.file} />
                )}

                <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <footer className="p-3 border-t shrink-0 bg-background">
        <div className="flex items-center gap-2">
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
            />
          <Button variant="ghost" size="icon" onClick={handleAttachmentClick}>
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input placeholder="Message..." className="flex-grow" />
           <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
