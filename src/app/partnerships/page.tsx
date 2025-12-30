
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const blogPosts = [
    { 
        title: "L'impact de la tokenisation sur l'immobilier en Afrique",
        description: "Découvrez comment la blockchain et la tokenisation, via des projets comme Z-Immo, peuvent révolutionner l'accès à la propriété sur le continent.",
        author: { name: "ImmoToken", username: "immotoken", avatar: "https://picsum.photos/seed/immo/100/100" },
        image: "https://picsum.photos/seed/building/800/400",
        imageHint: "modern architecture",
        category: "Technologie",
        readTime: "8 min de lecture"
    },
    { 
        title: "Agriculture Durable : Le rôle des EcoTokens",
        description: "Les EcoTokens ne sont pas juste une monnaie, c'est un mouvement. Voici comment ils financent des projets à impact positif pour notre environnement.",
        author: { name: "EcoVille", username: "ecoville", avatar: "https://picsum.photos/seed/eco/100/100" },
        image: "https://picsum.photos/seed/farm/800/400",
        imageHint: "vertical farm",
        category: "Écologie",
        readTime: "6 min de lecture"
    },
];

function PostBlogDialog() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Publier un article de blog</DialogTitle>
                <DialogDescription>
                    Partagez votre expertise avec la communauté. Votre article sera publié après examen.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="post-title">Titre de l'article</Label>
                    <Input id="post-title" placeholder="Ex: L'avenir du Web3 en Afrique" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="post-content">Contenu</Label>
                    <Textarea id="post-content" placeholder="Rédigez votre article ici..." className="min-h-[200px]" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="post-image">Image de couverture</Label>
                    <Input id="post-image" type="file" />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour publication</Button>
            </div>
        </DialogContent>
    );
}

export default function PartnershipsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="text-left">
                <h1 className="text-3xl font-bold">Partenariats & Blog</h1>
                <p className="text-muted-foreground">Découvrez les projets de l'écosystème et partagez vos connaissances.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                     <Button>
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        Publier un article
                    </Button>
                </DialogTrigger>
                <PostBlogDialog />
            </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-0">
                        <Image src={post.image} alt={post.title} width={800} height={400} className="object-cover" data-ai-hint={post.imageHint} />
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-sm font-semibold text-primary mb-2">{post.category}</p>
                        <CardTitle className="text-xl mb-2 line-clamp-2 h-14">{post.title}</CardTitle>
                        <CardDescription className="mb-4 h-10 line-clamp-2">{post.description}</CardDescription>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <Link href={`/profile/${post.author.username}`} className="flex items-center gap-2 group">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="profile avatar" />
                                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="group-hover:underline">Par {post.author.name}</span>
                            </Link>
                            <span>{post.readTime}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
