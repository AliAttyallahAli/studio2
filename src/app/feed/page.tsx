'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const PostCard = ({ post }: { post: any }) => (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} data-ai-hint="profile avatar" />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="mb-4">{post.content}</p>
            {post.image && (
                <div className="mb-4">
                    <Image src={post.image} alt="Post image" width={600} height={400} className="rounded-lg object-cover w-full" data-ai-hint={post.imageHint} />
                </div>
            )}
            <Separator />
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

const feedPosts = [
  {
    user: { name: '@user123', avatar: 'https://placehold.co/100x100.png' },
    time: 'Il y a 2 heures',
    content: 'Heureux de rejoindre la communauté Zoudou ! Prêt à miner mes premiers tokens Z. 🚀',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'rocket launch'
  },
  {
    user: { name: '@crypto_queen', avatar: 'https://placehold.co/100x100.png' },
    time: 'Il y a 5 heures',
    content: "Le marché est en pleine effervescence aujourd'hui. J'ai échangé quelques Z contre un bon d'achat. C'est tellement pratique !",
    image: null,
    imageHint: ''
  },
];


export default function FeedPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4 space-y-4">
            <Textarea placeholder="Quoi de neuf, @NomUtilisateur ?" className="min-h-[100px]" />
            <div className="flex justify-between items-center">
                 <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                 </Button>
                 <Button className="bg-accent hover:bg-accent/90">Publier</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
            {feedPosts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
