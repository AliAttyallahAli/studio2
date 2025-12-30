
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { getBlogPost, type BlogPost } from '@/lib/chat-data';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const postId = params.id as string;
        if (postId) {
            const data = getBlogPost(postId);
            if (data) {
                setPost(data);
            } else {
                router.push('/partnerships');
            }
        }
    }, [params.id, router]);

    if (!post) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center h-full">
                    <p>Chargement de l'article...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto">
                 <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux articles
                </Button>
                <article className="space-y-8">
                    <header className="space-y-4">
                        <p className="text-sm font-semibold text-primary">{post.category}</p>
                        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <Link href={`/profile/${post.author.username}`} className="flex items-center gap-2 group">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="profile avatar" />
                                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div >
                                    <span className="font-semibold text-foreground group-hover:underline">Par {post.author.name}</span>
                                    <p>{post.readTime}</p>
                                </div>
                            </Link>
                        </div>
                    </header>

                    <div className="relative aspect-video w-full">
                        <Image src={post.image} alt={post.title} layout="fill" className="object-cover rounded-lg" data-ai-hint={post.imageHint} />
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                        {post.content}
                    </div>

                    {post.attachment && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Fichier Joint</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center p-4 rounded-lg bg-secondary">
                                    <FileText className="h-8 w-8 mr-4 text-muted-foreground" />
                                    <div className="flex-grow">
                                        <p className="font-semibold truncate">{post.attachment.name}</p>
                                        <p className="text-sm text-muted-foreground">{post.attachment.size}</p>
                                    </div>
                                    <Button asChild>
                                        <a href={post.attachment.url} download>
                                            <Download className="mr-2 h-5 w-5" />
                                            Télécharger
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </article>
            </div>
        </AppLayout>
    );
}
