
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Image as ImageIcon, X, ThumbsUp, Laugh, Angry, Copy, BarChart3, Plus, Trash2, Search, Video, Rocket } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { StoryCarousel } from '@/components/StoryCarousel';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { extractLinkPreview, type LinkPreview } from '@/ai/flows/extract-link-preview-flow';
import { allFeedPosts, addPost, type FeedPost, updateSahelBalance, addFeeToCoreTeamWallet } from '@/lib/chat-data';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PinDialog } from '@/components/PinDialog';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const urlRegex = /(https?:\/\/[^\s]+)/g;

const LinkPreviewCard = ({ link }: { link: any }) => {
    let youtubeVideoId: string | null = null;
    try {
        const url = new URL(link.url);
        if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
            youtubeVideoId = url.searchParams.get('v');
        } else if (url.hostname === 'youtu.be') {
            youtubeVideoId = url.pathname.substring(1);
        }
    } catch (e) {
        // Not a valid URL
    }

    if (youtubeVideoId) {
        return (
             <div className="mt-4 aspect-video">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}`}
                    title={link.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="rounded-lg"
                ></iframe>
            </div>
        )
    }


    return (
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="block mt-4">
            <Card className="hover:bg-secondary transition-colors">
                {link.image && (
                     <Image src={link.image} alt={link.title} width={600} height={315} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint="website preview" />
                )}
                <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase">{new URL(link.url).hostname}</p>
                    <h4 className="font-semibold truncate">{link.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{link.description}</p>
                </div>
            </Card>
        </a>
    );
};

const PollCard = ({ poll }: { poll: NonNullable<FeedPost['poll']> }) => {
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
        <div className="space-y-3 mt-4">
            <h4 className="font-semibold">{poll.question}</h4>
            <div className="space-y-2">
                {options.map((option, index) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                        <div key={index} className="space-y-1">
                            {voted !== null ? (
                                <div className="relative">
                                    <Progress value={percentage} className="h-8" />
                                    <div className="absolute inset-0 flex items-center justify-between px-3 text-white font-medium">
                                        <span>{option.text}</span>
                                        <span>{Math.round(percentage)}%</span>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
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
            <p className="text-xs text-muted-foreground">{totalVotes} votes</p>
        </div>
    );
};

const BoostDialog = ({ post, onBoostSuccess }: { post: FeedPost, onBoostSuccess: () => void }) => {
    const [open, setOpen] = useState(false);
    const [duration, setDuration] = useState('1'); // duration in days
    const { toast } = useToast();
    const BOOST_RATE = 5; // 5 SAHEL per day
    const fee = parseInt(duration) * BOOST_RATE;

    const handleBoost = () => {
        if (updateSahelBalance(-fee)) {
            addFeeToCoreTeamWallet(fee);
            toast({
                title: 'Post Boosté !',
                description: `Votre publication a été boostée pour ${duration} jour(s). ${fee} SAHEL ont été déduits.`,
            });
            onBoostSuccess();
            setOpen(false);
        } else {
            toast({
                variant: 'destructive',
                title: 'Solde insuffisant',
                description: `Vous avez besoin de ${fee} SAHEL pour booster cette publication.`,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full">
                    <Rocket className="mr-2 h-4 w-4" /> Booster
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booster la Publication</DialogTitle>
                    <DialogDescription>
                        Mettez votre publication en avant pour atteindre une plus grande audience.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="duration">Durée du boost</Label>
                        <Select value={duration} onValueChange={setDuration}>
                            <SelectTrigger id="duration">
                                <SelectValue placeholder="Sélectionnez une durée" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 jour</SelectItem>
                                <SelectItem value="3">3 jours</SelectItem>
                                <SelectItem value="7">7 jours</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Alert>
                        <AlertTitle>Coût du Boost</AlertTitle>
                        <AlertDescription>
                            Le coût pour booster cette publication pour {duration} jour(s) est de <span className="font-bold text-primary">{fee} SAHEL</span>.
                            Ces frais seront transférés au portefeuille de la Core Team.
                        </AlertDescription>
                    </Alert>
                    <PinDialog onPinSuccess={handleBoost}>
                        <Button className="w-full bg-accent hover:bg-accent/90">Booster pour {fee} SAHEL</Button>
                    </PinDialog>
                </div>
            </DialogContent>
        </Dialog>
    );
};


const PostCard = ({ post: initialPost }: { post: FeedPost }) => {
    const [post, setPost] = useState(initialPost);
    const link = post.linkPreview;
    const contentWithoutUrl = post.content.replace(urlRegex, '').trim();
    
    const [reaction, setReaction] = useState<{ icon: React.FC<any>, label: string, color: string } | null>(null);
    const [likes, setLikes] = useState(post.likes || 0);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');

    const handleReaction = (newReaction: { icon: React.FC<any>, label: string, color: string }) => {
        if (reaction?.label === newReaction.label) {
            setReaction(null);
            setLikes(likes - 1);
        } else {
            if (!reaction) setLikes(likes + 1);
            setReaction(newReaction);
        }
    };
    
    const handleCommentSubmit = () => {
        if(newComment.trim() === '') return;
        const newCommentObj = {
            id: `comment-${Date.now()}`,
            user: { name: '@SahelUser', avatar: 'https://picsum.photos/seed/sahel/100/100' },
            content: newComment,
            time: 'À l\'instant',
        };
        setComments([newCommentObj, ...comments]);
        setNewComment('');
    }

    const ReactionButton = () => {
        if (reaction) {
            const Icon = reaction.icon;
            return <><Icon className={`mr-2 h-4 w-4 ${reaction.color}`} /> {reaction.label}</>
        }
        return <><Heart className="mr-2 h-4 w-4" /> J'aime</>;
    }
    
    const reactions = [
        { icon: ThumbsUp, label: 'J\'aime', color: 'text-primary' },
        { icon: Heart, label: 'J\'adore', color: 'text-red-500' },
        { icon: Laugh, label: 'Haha', color: 'text-yellow-500' },
        { icon: Angry, label: 'Grr', color: 'text-orange-500' },
    ];
    
    const shareOn = (platform: 'facebook' | 'whatsapp' | 'copy') => {
        const url = encodeURIComponent(`https://sahel.app/post/${post.id}`);
        const text = encodeURIComponent(post.content);

        switch(platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(`https://sahel.app/post/${post.id}`);
                // You can add a toast notification here
                break;
        }
    }

    const handleBoostSuccess = () => {
        setPost(prev => ({ ...prev, boosted: true }));
    };

    return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <Link href={`/profile/${post.user.username}`} className="flex items-center gap-3 group">
                    <div className="relative">
                        <Avatar>
                            <AvatarImage src={post.user.avatar} alt={post.user.name} data-ai-hint="profile avatar" />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                         {post.user.status && (
                            <div className={cn(
                                "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
                                post.user.status === 'En ligne' ? 'bg-green-500' : 'bg-gray-400'
                            )} />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold group-hover:underline">{post.user.name}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                </Link>
                {post.boosted && (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">Sponsorisé</span>
                )}
            </div>
        </CardHeader>
        <CardContent>
            {contentWithoutUrl && <p className="mb-4 whitespace-pre-wrap">{contentWithoutUrl}</p>}
            
            {post.mediaType === 'image' && post.mediaUrl && (
                <div className="mb-4">
                    <Image src={post.mediaUrl} alt="Post image" width={600} height={400} className="rounded-lg object-cover w-full" data-ai-hint={post.imageHint} />
                </div>
            )}
            
            {post.mediaType === 'video' && post.mediaUrl && (
                <div className="mb-4">
                    <video src={post.mediaUrl} controls muted autoPlay loop className="rounded-lg w-full" />
                </div>
            )}

            {post.poll && <PollCard poll={post.poll} />}

            {link && <LinkPreviewCard link={link} />}

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{likes > 0 ? `${likes} ${reaction?.label || 'J\'aime'}` : ''}</span>
                <span>{comments.length > 0 ? `${comments.length} commentaires` : ''}</span>
            </div>

            <Separator className="my-2" />
            <div className="flex justify-around pt-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="w-full">
                            <ReactionButton />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {reactions.map(r => (
                            <DropdownMenuItem key={r.label} onClick={() => handleReaction(r)}>
                                <r.icon className={`mr-2 h-4 w-4 ${r.color}`} />
                                {r.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" className="w-full" onClick={() => setShowComments(!showComments)}>
                    <MessageCircle className="mr-2 h-4 w-4" /> Commenter
                </Button>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full">
                            <Share2 className="mr-2 h-4 w-4" /> Partager
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => shareOn('whatsapp')}>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.62C8.75 21.41 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 3.67C16.56 3.67 20.28 7.39 20.28 11.91C20.28 16.43 16.56 20.15 12.04 20.15C10.49 20.15 9 19.74 7.76 19L7.29 18.73L3.8 19.79L4.88 16.39L4.57 15.89C3.81 14.54 3.4 13.06 3.4 11.91C3.4 7.39 7.12 3.67 12.04 3.67M9.25 6.15L9.07 6.14C8.43 6.15 7.82 6.35 7.34 6.81C6.86 7.27 6.44 7.91 6.44 8.59C6.44 8.84 6.47 9.08 6.55 9.3C6.72 9.77 7.06 10.42 7.18 10.63L7.2 10.67C7.38 11.08 7.8 11.96 8.7 12.83C9.77 13.88 10.84 14.38 11.63 14.65C12.04 14.81 12.59 15 12.92 15C13.09 15 13.21 15 13.3 15C13.73 14.97 14.43 14.59 14.68 13.9C14.92 13.22 14.92 12.53 14.84 12.43L14.8 12.35C14.73 12.25 14.56 12.18 14.31 12.06C14.05 11.94 12.83 11.33 12.59 11.23C12.35 11.13 12.18 11.08 12 11.33C11.82 11.58 11.45 12.04 11.32 12.18C11.19 12.32 11.07 12.35 10.82 12.23C10.57 12.11 9.87 11.87 9.01 11.1C8.29 10.47 7.82 9.72 7.68 9.47C7.53 9.22 7.65 9.11 7.77 9C7.88 8.89 8 8.74 8.12 8.6C8.24 8.46 8.29 8.35 8.38 8.17C8.47 7.98 8.42 7.84 8.38 7.73C8.32 7.63 8.07 7.03 7.98 6.83L7.91 6.64C7.82 6.42 7.73 6.27 7.65 6.15Z" /></svg>
                            Partager sur WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => shareOn('facebook')}>
                           <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.64 10 6.7v2.8H7v4h3v9h4v-9Z" /></svg>
                            Partager sur Facebook
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => shareOn('copy')}>
                           <Copy className="mr-2 h-4 w-4" />
                            Copier le lien
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                {post.user.username === 'saheluser' && !post.boosted && (
                    <BoostDialog post={post} onBoostSuccess={handleBoostSuccess} />
                )}

            </div>
            {showComments && (
                <div className="pt-4 mt-4 border-t">
                    <div className="flex gap-2">
                         <Avatar className="w-8 h-8">
                            <AvatarImage src="https://picsum.photos/seed/sahel/100/100" alt="@SahelUser" data-ai-hint="profile avatar" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <Textarea 
                            placeholder="Écrire un commentaire..." 
                            className="flex-grow"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                         />
                        <Button onClick={handleCommentSubmit}>Publier</Button>
                    </div>
                    <div className="mt-4 space-y-4">
                        {comments.map((comment: any) => (
                            <div key={comment.id} className="flex gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} data-ai-hint="profile avatar" />
                                    <AvatarFallback>{comment.user.name.charAt(1)}</AvatarFallback>
                                </Avatar>
                                <div className="bg-secondary p-3 rounded-lg flex-grow">
                                    <div className="flex justify-between items-baseline">
                                        <p className="font-semibold text-sm">{comment.user.name}</p>
                                        <p className="text-xs text-muted-foreground">{comment.time}</p>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </CardContent>
    </Card>
    );
};

const CreatePollDialog = ({ onPollCreate }: { onPollCreate: (pollData: { question: string, options: { text: string, votes: number }[]}) => void }) => {
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
                <Button variant="outline" size="icon">
                    <BarChart3 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer un sondage</DialogTitle>
                    <DialogDescription>
                        Posez une question à la communauté et définissez les options de réponse.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="poll-question">Votre question</Label>
                        <Input 
                            id="poll-question" 
                            placeholder="Quelle est la meilleure cryptomonnaie ?" 
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

export default function FeedPage() {
  const [posts, setPosts] = useState(allFeedPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState<{url: string, type: 'image' | 'video'} | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video') ? 'video' : 'image';
      setMediaPreview({ url, type });
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
    if(mediaInputRef.current) {
        mediaInputRef.current.value = '';
    }
  }

  const handlePublish = async (pollData: FeedPost['poll'] = null) => {
    if (newPostContent.trim() === '' && !mediaPreview && !pollData) return;

    let linkPreview: LinkPreview | null = null;
    const urls = newPostContent.match(urlRegex);
    if (urls && urls[0]) {
        try {
            linkPreview = await extractLinkPreview({ url: urls[0] });
        } catch (error) {
            console.error("Could not extract link preview", error);
        }
    }


    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      user: { name: '@SahelUser', username: 'saheluser', avatar: 'https://picsum.photos/seed/sahel/100/100' },
      time: 'À l\'instant',
      content: newPostContent,
      mediaUrl: mediaPreview?.url || null,
      mediaType: mediaPreview?.type || null,
      imageHint: 'user content',
      linkPreview: linkPreview,
      poll: pollData,
      likes: 0,
      comments: [],
      boosted: false,
    };

    addPost(newPost);
    setPosts([...allFeedPosts]); // Re-read from the shared source
    setNewPostContent('');
    removeMedia();
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <AppLayout>
        <div className="max-w-2xl mx-auto w-full space-y-6">
            
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Rechercher dans le fil..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <StoryCarousel />

            <Card>
            <CardContent className="p-4 space-y-4">
                <Textarea 
                    placeholder="Quoi de neuf, @SahelUser ?" 
                    className="min-h-[100px]" 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />
                {mediaPreview && (
                    <div className="relative w-32 aspect-square">
                        {mediaPreview.type === 'image' ? (
                            <Image src={mediaPreview.url} alt="Aperçu" layout="fill" objectFit="cover" className="rounded-md" />
                        ) : (
                            <video src={mediaPreview.url} muted autoPlay loop className="rounded-md h-full w-full object-cover" />
                        )}
                        <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 bg-black/50 hover:bg-black/70 rounded-full h-6 w-6" onClick={removeMedia}>
                            <X className="h-4 w-4 text-white"/>
                        </Button>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => mediaInputRef.current?.click()}>
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => mediaInputRef.current?.click()}>
                            <Video className="h-4 w-4" />
                        </Button>
                         <CreatePollDialog onPollCreate={(pollData) => handlePublish(pollData)} />
                    </div>
                    <input 
                        type="file" 
                        ref={mediaInputRef} 
                        className="hidden" 
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                    />
                    <Button className="bg-accent hover:bg-accent/90" onClick={() => handlePublish()}>Publier</Button>
                </div>
            </CardContent>
            </Card>

            <div className="space-y-4">
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
      </div>
    </AppLayout>
  );
}

    

    