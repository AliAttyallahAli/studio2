
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Check, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createForumChat } from '@/lib/chat-data';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function NewForumPage() {
  const router = useRouter();
  const [forumName, setForumName] = useState('');
  const [forumDescription, setForumDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateForum = () => {
    if (!forumName) return;
    
    const newForum = createForumChat({
      name: forumName,
      description: forumDescription,
      avatar: imagePreview || `https://picsum.photos/seed/${forumName.toLowerCase()}/100/100`,
    });
    
    router.push(`/chat/${newForum.id}`);
  };

  return (
    <div className="flex flex-col h-full bg-background absolute inset-0 z-30 md:relative md:border-l">
      <header className="flex items-center p-3 border-b shrink-0 bg-background sticky top-0">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Nouveau forum</h2>
          <p className="text-sm text-muted-foreground">Créez un espace pour de larges audiences</p>
        </div>
      </header>

      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
                {imagePreview ? (
                    <AvatarImage src={imagePreview} alt={forumName} />
                ) : (
                    <AvatarFallback className="text-4xl bg-secondary">
                        <Megaphone />
                    </AvatarFallback>
                )}
            </Avatar>
             <Button 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={() => imageInputRef.current?.click()}
             >
                <Camera className="h-4 w-4" />
            </Button>
            <input 
                type="file" 
                ref={imageInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
            />
          </div>
          <div className="w-full space-y-4">
             <div className="space-y-2">
                <Label htmlFor="forum-name">Nom du forum</Label>
                <Input 
                    id="forum-name"
                    placeholder="Nom du forum" 
                    className="text-base" 
                    value={forumName} 
                    onChange={(e) => setForumName(e.target.value)}
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="forum-description">Description (optionnel)</Label>
                <Textarea 
                    id="forum-description"
                    placeholder="Décrivez l'objectif de ce forum..." 
                    value={forumDescription} 
                    onChange={(e) => setForumDescription(e.target.value)}
                />
            </div>
          </div>
        </div>
      </div>
      
      <footer className="p-4 border-t shrink-0">
        <Button 
          size="lg" 
          className="w-full bg-accent hover:bg-accent/90"
          onClick={handleCreateForum}
          disabled={!forumName}
        >
          <Check className="mr-2 h-5 w-5" />
          Créer le forum
        </Button>
      </footer>
    </div>
  );
}
