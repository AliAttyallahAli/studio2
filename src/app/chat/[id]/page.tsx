
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowLeft, Mic, MoreVertical, Paperclip, Phone, Send, Video, FileText, Download, PhoneOff, MicOff, VideoOff, Volume2, Play, Pause, BarChart3, Plus, Trash2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { getChatData, type ChatMessage, type ChatData } from '@/lib/chat-data';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

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
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const parseDuration = (durationStr: string) => {
    const parts = durationStr.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };
  
  const totalSeconds = parseDuration(duration);

  useEffect(() => {
      if (isPlaying) {
          intervalRef.current = setInterval(() => {
              setCurrentTime(prevTime => {
                  if (prevTime >= totalSeconds) {
                      clearInterval(intervalRef.current!);
                      setIsPlaying(false);
                      return totalSeconds;
                  }
                  return prevTime + 1;
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
    setProgress((currentTime / totalSeconds) * 100);
    if (currentTime >= totalSeconds) {
      setIsPlaying(false);
    }
  }, [currentTime, totalSeconds]);

  const togglePlay = () => {
      if (isPlaying) {
          setIsPlaying(false);
      } else {
          if (currentTime >= totalSeconds) {
              setCurrentTime(0);
          }
          setIsPlaying(true);
      }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center" onClick={togglePlay}>
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <div className="flex-grow h-1 bg-primary/30 rounded-full relative">
          <div className="absolute left-0 top-0 h-1 bg-primary rounded-full" style={{width: `${progress}%`}}></div>
          <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-primary rounded-full" style={{left: `${progress}%`}}></div>
      </div>
      <span className="text-xs opacity-80">{formatTime(currentTime)} / {duration}</span>
    </div>
  );
};

const ChatPoll = ({ poll, sender }: { poll: NonNullable<ChatMessage['poll']>, sender: 'me' | 'other' }) => {
    const [voted, setVoted] = useState<number | null>(null);
    const [options, setOptions] = useState(poll.options);

    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

    const handleVote = (index: number) => {
        if (voted !== null) return;
        setVoted(index);
        const newOptions = [...options];
        newOptions[index].votes += 1;
        setOptions(newOptions);
    };

    return (
        <div className="space-y-3 mt-2">
            <h4 className="font-semibold">{poll.question}</h4>
            <div className="space-y-2">
                {options.map((option, index) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                        <div key={index} className="space-y-1">
                            {voted !== null ? (
                                <div className="relative">
                                    <Progress value={percentage} className={cn("h-8", sender === 'me' ? "bg-primary-foreground/30" : "bg-background/30")} />
                                    <div className={cn("absolute inset-0 flex items-center justify-between px-3 font-medium", sender === 'me' ? "text-primary-foreground" : "text-foreground")}>
                                        <span>{option.text}</span>
                                        <span>{Math.round(percentage)}%</span>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    variant={sender === 'me' ? 'secondary' : 'outline'}
                                    className="w-full justify-start h-10"
                                    onClick={() => handleVote(index)}
                                >
                                    {option.text}
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="text-xs opacity-80">{totalVotes} votes</p>
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

const CreatePollDialog = ({ onPollCreate }: { onPollCreate: (pollData: NonNullable<ChatMessage['poll']>) => void }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [open, setOpen] = useState(false);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, '']);
        }
    };
    
    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleCreate = () => {
        const validOptions = options.map(o => o.trim()).filter(o => o !== '');
        if (question.trim() && validOptions.length >= 2) {
            onPollCreate({
                question: question.trim(),
                options: validOptions.map(opt => ({ text: opt, votes: 0 })),
            });
            setOpen(false);
            setQuestion('');
            setOptions(['','']);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <BarChart3 className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer un sondage</DialogTitle>
                    <DialogDescription>
                        Posez une question et définissez les options de réponse.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="poll-question">Votre question</Label>
                        <Input 
                            id="poll-question" 
                            placeholder="Ex: Quel sujet pour la prochaine réunion ?" 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Options de réponse</Label>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input 
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                                {options.length > 2 ? (
                                    <Button variant="ghost" size="icon" onClick={() => removeOption(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                ) : <div className="w-10"/> }
                            </div>
                        ))}
                    </div>
                     <Button variant="outline" size="sm" onClick={addOption} disabled={options.length >= 5}>
                        <Plus className="mr-2 h-4 w-4" /> Ajouter une option
                    </Button>
                </div>
                <DialogFooter>
                    <Button onClick={handleCreate} disabled={!question.trim() || options.filter(o=>o.trim()).length < 2}>Créer le sondage</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
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

  const handleSendMessage = (pollData: ChatMessage['poll'] | null = null) => {
    if (newMessage.trim() === '' && !pollData) return;

    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    let message: ChatMessage;

    if (pollData) {
        message = {
            id: `msg-${Date.now()}`,
            sender: 'me',
            time: time,
            type: 'poll',
            poll: pollData
        };
    } else {
        message = {
            id: `msg-${Date.now()}`,
            content: newMessage,
            sender: 'me',
            time: time,
            type: 'text'
        };
    }

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
  
  const handleInitiateCall = (type: 'audio' | 'video') => {
    if (chatData?.contact.status === 'En ligne') {
        setCallState({ active: true, type: type });
    } else {
        toast({
            title: "Contact hors ligne",
            description: `${chatData?.contact.name} n'est pas en ligne. Une notification d'appel manqué lui sera envoyée.`,
        });
    }
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

  const { name: chatName, avatar: chatAvatar, status, type: contactType } = chatData.contact;

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
            <div className="relative">
                <Avatar>
                    <AvatarImage src={chatAvatar} alt={chatName} data-ai-hint="profile avatar"/>
                    <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
                </Avatar>
                {contactType === 'user' && (
                    <div className={cn(
                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                        status === 'En ligne' ? 'bg-green-500' : 'bg-gray-400'
                    )} />
                )}
            </div>
            <div>
                <h2 className="text-lg font-semibold">{chatName}</h2>
                {contactType === 'user' && <p className="text-xs text-muted-foreground">{status}</p>}
            </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleInitiateCall('audio')}>
                <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleInitiateCall('video')}>
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
                   (message.type === 'audio' || message.type === 'poll') && 'w-full'
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

                {message.type === 'poll' && message.poll && (
                   <ChatPoll poll={message.poll} sender={message.sender} />
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
               <CreatePollDialog onPollCreate={(pollData) => handleSendMessage(pollData)} />
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
              <Button type="submit" size="icon" disabled={!newMessage} className="bg-primary hover:bg-primary/90">
                <Send className="h-5 w-5" />
              </Button>
            </form>
        )}
      </footer>
    </div>
  );
}

    
