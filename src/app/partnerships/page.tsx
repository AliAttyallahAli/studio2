
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
import { useState } from 'react';

const initialBlogPosts = [
    { 
        id: 'blog-1',
        title: "L'impact de la tokenisation sur l'immobilier en Afrique",
        description: "Découvrez comment la blockchain et la tokenisation, via des projets comme Z-Immo, peuvent révolutionner l'accès à la propriété sur le continent.",
        author: { name: "ImmoToken", username: "immotoken", avatar: "https://picsum.photos/seed/immo/100/100" },
        image: "https://picsum.photos/seed/building/800/400",
        imageHint: "modern architecture",
        category: "Technologie",
        readTime: "8 min de lecture"
    },
    { 
        id: 'blog-2',
        title: "Agriculture Durable : Le rôle des EcoTokens",
        description: "Les EcoTokens ne sont pas juste une monnaie, c'est un mouvement. Voici comment ils financent des projets à impact positif pour notre environnement.",
        author: { name: "EcoVille", username: "ecoville", avatar: "https://picsum.photos/seed/eco/100/100" },
        image: "https://picsum.photos/seed/farm/800/400",
        imageHint: "vertical farm",
        category: "Écologie",
        readTime: "6 min de lecture"
    },
];


export default function PartnershipsPage() {
    const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
    const [openDialog, setOpenDialog] = useState(false);
    
    // Form state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [institution, setInstitution] = useState('');
    const [projectObject, setProjectObject] = useState('');
    const [contactAddress, setContactAddress] = useState('');
    const [attachedFile, setAttachedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAttachedFile(event.target.files[0]);
        }
    };

    const handleAddNewPost = () => {
        if (!title || !content) return;

        const newPost = {
            id: `blog-${Date.now()}`,
            title: title,
            description: content.substring(0, 100) + '...',
            author: { name: institution || "SahelUser", username: "saheluser", avatar: "https://picsum.photos/seed/zoudou/100/100" },
            image: "https://picsum.photos/seed/newpost/800/400",
            imageHint: "user blog post",
            category: "Communauté",
            readTime: "5 min de lecture"
        };
        setBlogPosts(prev => [newPost, ...prev]);
        setOpenDialog(false);
        // Reset form
        setTitle('');
        setContent('');
        setInstitution('');
        setProjectObject('');
        setContactAddress('');
        setAttachedFile(null);
    };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="text-left">
                <h1 className="text-3xl font-bold">Partenariats & Blog</h1>
                <p className="text-muted-foreground">Découvrez les projets de l'écosystème et partagez vos connaissances.</p>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                     <Button>
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        Proposer un Partenariat
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Proposer un Partenariat ou Publier un Article</DialogTitle>
                        <DialogDescription>
                            Partagez votre projet ou votre expertise avec la communauté. Votre soumission sera examinée.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                        <div className="space-y-2">
                            <Label htmlFor="institution-name">Nom de l'auteur ou de l'institution</Label>
                            <Input id="institution-name" placeholder="Ex: Sahel Ventures" value={institution} onChange={e => setInstitution(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="post-title">Titre de l'article / Objet du projet</Label>
                            <Input id="post-title" placeholder="Ex: L'avenir du Web3 en Afrique" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="post-content">Détails du projet / Contenu de l'article</Label>
                            <Textarea id="post-content" placeholder="Rédigez votre proposition ou votre article ici..." className="min-h-[150px]" value={content} onChange={e => setContent(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="post-image">Fichiers joints (optionnel)</Label>
                            <Input id="post-image" type="file" onChange={handleFileChange} />
                             {attachedFile && <p className="text-sm text-muted-foreground">Fichier sélectionné : {attachedFile.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-address">Adresse de contact (email ou téléphone)</Label>
                            <Input id="contact-address" placeholder="contact@exemple.com" value={contactAddress} onChange={e => setContactAddress(e.target.value)} />
                        </div>
                         <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleAddNewPost}>Soumettre</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
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
