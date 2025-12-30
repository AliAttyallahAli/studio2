
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Image as ImageIcon, X, ThumbsUp, Laugh, Angry, Copy } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { StoryCarousel } from '@/components/StoryCarousel';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const urlRegex = /(https?:\/\/[^\s]+)/g;

const LinkPreviewCard = ({ link }: { link: any }) => (
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


const PostCard = ({ post }: { post: any }) => {
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

    return (
    <Card>
        <CardHeader>
            <Link href={`/profile/${post.user.username}`} className="flex items-center gap-3 group">
                <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} data-ai-hint="profile avatar" />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold group-hover:underline">{post.user.name}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
            </Link>
        </CardHeader>
        <CardContent>
            {contentWithoutUrl && <p className="mb-4 whitespace-pre-wrap">{contentWithoutUrl}</p>}
            
            {post.image && (
                <div className="mb-4">
                    <Image src={post.image} alt="Post image" width={600} height={400} className="rounded-lg object-cover w-full" data-ai-hint={post.imageHint} />
                </div>
            )}

            {link && <LinkPreviewCard link={link} />}

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{likes > 0 ? `${likes} ${reaction?.label || 'J\'aime'}` : ''}</span>
                <span>{comments.length > 0 ? `${comments.length} commentaires` : ''}</span>
            </div>

            <Separator className="mt-2" />
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

const initialFeedPosts = [
  {
    id: 'post-1',
    user: { name: '@SahelUser', username: 'saheluser', avatar: 'https://picsum.photos/seed/sahel/100/100' },
    time: 'Il y a 2 heures',
    content: 'Heureux de rejoindre la communauté SAHEL ! Prêt à miner mes premiers SAHEL. 🚀',
    image: 'https://picsum.photos/seed/rocket/600/400',
    imageHint: 'rocket launch',
    linkPreview: null,
    likes: 12,
    comments: [
        { id: 'c1-1', user: { name: 'Alice', avatar: 'https://picsum.photos/seed/alice/100/100' }, content: 'Bienvenue !', time: '1h' }
    ]
  },
  {
    id: 'post-2',
    user: { name: '@tech_news', username: 'tech_news', avatar: 'https://picsum.photos/seed/guru/100/100' },
    time: 'Il y a 4 heures',
    content: 'Article intéressant sur le futur du Web3 : https://example-web3-news.com/article',
    image: null,
    imageHint: '',
    linkPreview: {
        url: 'https://example-web3-news.com/article',
        title: 'Le futur du Web3 : décentralisation et tokens',
        description: 'Un aperçu des tendances qui façonneront la prochaine génération d\'internet, de la DeFi aux DAO en passant par les identités décentralisées.',
        image: 'https://picsum.photos/seed/web3news/600/315',
    },
    likes: 42,
    comments: []
  },
  {
    id: 'post-3',
    user: { name: '@crypto_queen', username: 'crypto_queen', avatar: 'https://picsum.photos/seed/queen/100/100' },
    time: 'Il y a 5 heures',
    content: "Le marché est en pleine effervescence aujourd'hui. J'ai échangé quelques SAHEL contre un bon d'achat. C'est tellement pratique !",
    image: null,
    imageHint: '',
    linkPreview: null,
    likes: 5,
    comments: []
  },
];


export default function FeedPage() {
  const [posts, setPosts] = useState(initialFeedPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if(imageInputRef.current) {
        imageInputRef.current.value = '';
    }
  }

  const handlePublish = () => {
    if (newPostContent.trim() === '' && !imagePreview) return;

    const newPost = {
      id: `post-${Date.now()}`,
      user: { name: '@SahelUser', username: 'saheluser', avatar: 'https://picsum.photos/seed/sahel/100/100' },
      time: 'À l\'instant',
      content: newPostContent,
      image: imagePreview,
      imageHint: 'user content',
      linkPreview: null,
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    removeImage();
  };


  return (
    <AppLayout>
        <div className="max-w-2xl mx-auto w-full space-y-6">
            <StoryCarousel />

            <Card>
            <CardContent className="p-4 space-y-4">
                <Textarea 
                    placeholder="Quoi de neuf, @SahelUser ?" 
                    className="min-h-[100px]" 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />
                {imagePreview && (
                    <div className="relative w-24 h-24">
                        <Image src={imagePreview} alt="Aperçu" layout="fill" objectFit="cover" className="rounded-md" />
                        <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 bg-black/50 hover:bg-black/70 rounded-full h-6 w-6" onClick={removeImage}>
                            <X className="h-4 w-4 text-white"/>
                        </Button>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <Button variant="outline" size="icon" onClick={() => imageInputRef.current?.click()}>
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                    <input 
                        type="file" 
                        ref={imageInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <Button className="bg-accent hover:bg-accent/90" onClick={handlePublish}>Publier</Button>
                </div>
            </CardContent>
            </Card>

            <div className="space-y-4">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
      </div>
    </AppLayout>
  );
}
