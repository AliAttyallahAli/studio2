
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Link2, X } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { StoryCarousel } from '@/components/StoryCarousel';
import { cn } from '@/lib/utils';
import React, { useState, useRef } from 'react';
import Link from 'next/link';

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

            <Separator className="mt-4" />
            <div className="flex justify-around pt-2">
                <Button variant="ghost" className="w-full">
                    <Heart className="mr-2 h-4 w-4" /> J'aime
                </Button>
                <Button variant="ghost" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" /> Commenter
                </Button>
                <Button variant="ghost" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" /> Partager
                </Button>
            </div>
        </CardContent>
    </Card>
    );
};

const initialFeedPosts = [
  {
    user: { name: '@user123', username: 'user123', avatar: 'https://placehold.co/100x100.png' },
    time: 'Il y a 2 heures',
    content: 'Heureux de rejoindre la communauté Zoudou ! Prêt à miner mes premiers tokens Z. 🚀',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'rocket launch',
    linkPreview: null,
  },
  {
    user: { name: '@tech_news', username: 'tech_news', avatar: 'https://placehold.co/100x100.png' },
    time: 'Il y a 4 heures',
    content: 'Article intéressant sur le futur du Web3 : https://example-web3-news.com/article',
    image: null,
    imageHint: '',
    linkPreview: {
        url: 'https://example-web3-news.com/article',
        title: 'Le futur du Web3 : décentralisation et tokens',
        description: 'Un aperçu des tendances qui façonneront la prochaine génération d\'internet, de la DeFi aux DAO en passant par les identités décentralisées.',
        image: 'https://placehold.co/600x315.png',
    }
  },
  {
    user: { name: '@crypto_queen', username: 'crypto_queen', avatar: 'https://placehold.co/100x100.png' },
    time: 'Il y a 5 heures',
    content: "Le marché est en pleine effervescence aujourd'hui. J'ai échangé quelques Z contre un bon d'achat. C'est tellement pratique !",
    image: null,
    imageHint: '',
    linkPreview: null,
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

  const handlePublish = () => {
    if (newPostContent.trim() === '' && !imagePreview) return;

    const newPost = {
      user: { name: '@NomUtilisateur', username: 'NomUtilisateur', avatar: 'https://placehold.co/100x100.png' },
      time: 'À l\'instant',
      content: newPostContent,
      image: imagePreview,
      imageHint: 'user content',
      linkPreview: null, // Link detection can be added here in a real scenario
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setImagePreview(null);
    if(imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };


  return (
    <AppLayout>
      <div className="space-y-6">
        <StoryCarousel />

        <Card>
          <CardContent className="p-4 space-y-4">
            <Textarea 
                placeholder="Quoi de neuf, @NomUtilisateur ?" 
                className="min-h-[100px]" 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
            />
            {imagePreview && (
                <div className="relative">
                    <Image src={imagePreview} alt="Aperçu" width={100} height={100} className="rounded-md" />
                    <Button variant="ghost" size="icon" className="absolute top-0 right-0 bg-black/50 hover:bg-black/70 rounded-full h-6 w-6" onClick={() => setImagePreview(null)}>
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
            {posts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
