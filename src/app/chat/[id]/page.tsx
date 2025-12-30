
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowLeft, Mic, MoreVertical, Paperclip, Phone, Send, Video, FileText, Download, PhoneOff, MicOff, VideoOff, Volume2, Play, Pause } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { getChatData, type ChatMessage, type ChatData } from '@/lib/chat-data';

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

const AudioPlayer = ({ duration }: { duration: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSeconds = parseInt(duration.split(':')[0]) * 60 + parseInt(duration.split(':')[1]);

  useEffect(() => {
      if (isPlaying) {
          intervalRef.current = setInterval(() => {
              setProgress(prev => {
                  if (prev >= 100) {
                      clearInterval(intervalRef.current!);
                      setIsPlaying(false);
                      return 100;
                  }
                  return prev + (100 / totalSeconds);
              });
          }, 1000);
      } else {
          if (intervalRef.current) {
              clearInterval(intervalRef.current);
          }
      }
      return () => {
          if (intervalRef.current) {
              clearInterval(intervalRef.current);
          }
      };
  }, [isPlaying, totalSeconds]);
  
  useEffect(() => {
    if (progress >= 100) {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [progress]);

  const togglePlay = () => {
      setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center" onClick={togglePlay}>
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <div className="flex-grow h-1 bg-primary/30 rounded-full relative">
          <div className="absolute left-0 top-0 h-1 bg-primary rounded-full" style={{width: `${progress}%`}}></div>
          <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-primary rounded-full" style={{left: `${progress}%`}}></div>
      </div>
      <span className="text-xs opacity-80">{duration}</span>
    </div>
  );
};

const CallView = ({ contact, type, onHangUp }: { contact: ChatData['contact'], type: 'audio' | 'video', onHangUp: () => void }) => {
    const [callTime, setCallTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCallTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="absolute inset-0 bg-background/95 z-50 flex flex-col items-center justify-between p-8 text-white">
            <div className="text-center mt-20">
                <Avatar className="w-28 h-28 mx-auto border-4 border-primary">
                    <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="profile avatar" />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold mt-4">{contact.name}</h1>
                <p className="text-lg text-muted-foreground mt-2">{formatTime(callTime)}</p>
            </div>
            
            {type === 'video' && (
                <div className="w-32 h-48 rounded-lg bg-secondary/50 overflow-hidden absolute top-8 right-8">
                     {/* Your self-view video would go here */}
                </div>
            )}

            <div className="flex items-center justify-center gap-4">
                 <Button variant="secondary" size="icon" className="rounded-full w-16 h-16 bg-white/10 hover:bg-white/20">
                    {type === 'video' ? <VideoOff className="h-7 w-7" /> : <Volume2 className="h-7 w-7" />}
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full w-16 h-16 bg-white/10 hover:bg-white/20">
                    <MicOff className="h-7 w-7" />
                </Button>
                <Button onClick={onHangUp} size="icon" className="rounded-full w-16 h-16 bg-destructive hover:bg-destructive/90">
                    <PhoneOff className="h-7 w-7" />
                </Button>
            </div>
        </div>
    );
};


export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [callState, setCallState] = useState<{ active: boolean, type: 'audio' | 'video' }>({ active: false, type: 'audio' });

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = pathname.split('/').pop() || '';
    setChatId(id);
    const data = getChatData(id);
    if (!data) {
      router.push('/chat');
    } else {
      setChatData(data);
      setMessages(data.messages);
    }
  }, [pathname, router]);


  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      
      const messageBase = {
        id: `msg-${Date.now()}`,
        sender: 'me' as 'me',
        time: time,
      };

      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        const imageMessage: ChatMessage = {
          ...messageBase,
          type: 'image',
          url: imageUrl,
          hint: 'user attachment',
        };
        setMessages(prev => [...prev, imageMessage]);
      } else {
        const fileMessage: ChatMessage = {
          ...messageBase,
          type: 'file',
          file: { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` },
        };
        setMessages(prev => [...prev, fileMessage]);
      }
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const message: ChatMessage = {
        id: `msg-${Date.now()}`,
        content: newMessage,
        sender: 'me',
        time: time,
        type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };
  
  const formatRecordingTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
      }, 1000);
  };

  const handleStopRecording = () => {
      setIsRecording(false);
      if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
      }
      
      if (recordingTime > 0) {
          const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
          const voiceMessage: ChatMessage = {
              id: `msg-${Date.now()}`,
              sender: 'me',
              time: time,
              type: 'audio',
              duration: formatRecordingTime(recordingTime),
          };
          setMessages(prev => [...prev, voiceMessage]);
      }
      setRecordingTime(0);
  };


  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div:first-child > div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  if (!chatData || !chatId) {
    return (
       <div className="flex flex-col h-full bg-card md:border-l items-center justify-center">
            <p>Chargement de la discussion...</p>
       </div>
    );
  }

  const { name: chatName, avatar: chatAvatar } = chatData.contact;

  return (
    <div className="flex flex-col h-full bg-card md:border-l">
      {callState.active && (
        <CallView 
            contact={chatData.contact} 
            type={callState.type} 
            onHangUp={() => setCallState({ active: false, type: 'audio' })}
        />
      )}
      <header className="flex items-center p-3 border-b shrink-0">
        <Button variant="ghost" size="icon" onClick={() => router.push('/chat')} className="md:hidden">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3 ml-2 cursor-pointer" onClick={() => router.push(`/chat/${chatId}/settings`)}>
            <Avatar>
                <AvatarImage src={chatAvatar} alt={chatName} data-ai-hint="profile avatar"/>
                <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">{chatName}</h2>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setCallState({ active: true, type: 'audio' })}>
                <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCallState({ active: true, type: 'video' })}>
                <Video className="h-5 w-5" />
            </Button>
             <Button variant="ghost" size="icon" onClick={() => router.push(`/chat/${chatId}/settings`)}>
                <MoreVertical className="h-5 w-5" />
            </Button>
        </div>
      </header>
      
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
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
                   (message.type !== 'text') && 'p-2',
                   message.type === 'audio' && 'w-64'
                )}
              >
                {message.type === 'text' && <p>{message.content}</p>}
                
                {message.type === 'image' && (
                    <Image src={message.url as string} alt="Pièce jointe" width={300} height={200} className="rounded-md object-cover" data-ai-hint={message.hint} />
                )}

                {message.type === 'file' && (
                    <FileAttachmentCard file={message.file as {name: string, size: string}} />
                )}
                
                {message.type === 'audio' && (
                   <AudioPlayer duration={message.duration as string} />
                )}


                <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <footer className="p-3 border-t shrink-0 bg-background">
        {isRecording ? (
            <div className="flex items-center justify-between">
                <Mic className="h-5 w-5 text-destructive animate-pulse" />
                <p className="text-sm text-muted-foreground font-mono">{formatRecordingTime(recordingTime)}</p>
                <Button size="sm" onClick={handleStopRecording}>Envoyer</Button>
            </div>
        ) : (
            <form 
                className="flex items-center gap-2"
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            >
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" 
                    accept="image/*,application/pdf"
                />
              <Button type="button" variant="ghost" size="icon" onClick={handleAttachmentClick}>
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input 
                placeholder="Message..." 
                className="flex-grow" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
               <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onMouseDown={handleStartRecording}
                    onMouseUp={handleStopRecording}
                    onTouchStart={handleStartRecording}
                    onTouchEnd={handleStopRecording}
                >
                <Mic className="h-5 w-5" />
              </Button>
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="h-5 w-5" />
              </Button>
            </form>
        )}
      </footer>
    </div>
  );
}

    
