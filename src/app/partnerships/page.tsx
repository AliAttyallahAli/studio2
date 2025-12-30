
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
import { allBlogPosts, addBlogPost, type BlogPost } from '@/lib/chat-data';


export default function PartnershipsPage() {
    const [blogPosts, setBlogPosts] = useState(allBlogPosts);
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

        const newPost: BlogPost = {
            id: `blog-${Date.now()}`,
            title: title,
            description: content.substring(0, 100) + '...',
            content: content,
            author: { name: institution || "SahelUser", username: "saheluser", avatar: "https://picsum.photos/seed/zoudou/100/100" },
            image: "https://picsum.photos/seed/newpost/800/400",
            imageHint: "user blog post",
            category: "Communauté",
            readTime: "5 min de lecture"
        };
        addBlogPost(newPost);
        setBlogPosts([...allBlogPosts]);
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
                <Link href={`/partnerships/${post.id}`} key={post.id} className="group">
                    <Card className="overflow-hidden h-full flex flex-col group-hover:border-primary transition-all">
                        <CardHeader className="p-0">
                            <div className="aspect-video relative">
                                <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.imageHint} />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col flex-grow">
                            <p className="text-sm font-semibold text-primary mb-2">{post.category}</p>
                            <CardTitle className="text-xl mb-2 line-clamp-2 h-14 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                            <CardDescription className="mb-4 h-10 line-clamp-2">{post.description}</CardDescription>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="profile avatar" />
                                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>Par {post.author.name}</span>
                                </div>
                                <span>{post.readTime}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
