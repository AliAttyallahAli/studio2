
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { addStory, type Story } from '@/lib/chat-data';

export default function CreateStoryPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = () => {
    if (!imageFile || !imagePreview) return;
    
    const newStory: Story = {
        id: `story-${Date.now()}`,
        user: {
            name: 'Moi',
            avatar: 'https://picsum.photos/seed/sahel/100/100'
        },
        items: [{
            type: 'image',
            url: imagePreview,
            hint: 'user story'
        }],
        timestamp: 'À l\'instant',
        seen: true, // User's own story is always seen
    };
    
    addStory(newStory);
    router.push('/feed');
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <header className="flex items-center justify-between p-3 border-b bg-background">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Créer un Statut</h1>
        <Button onClick={handlePublish} disabled={!imageFile} className="bg-accent hover:bg-accent/90">
            Publier <Send className="ml-2 h-4 w-4" />
        </Button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-4">
        <label
            htmlFor="story-upload"
            className="w-full max-w-sm aspect-[9/16] border-2 border-dashed border-muted-foreground rounded-lg cursor-pointer hover:bg-muted flex items-center justify-center overflow-hidden relative bg-secondary"
        >
            {imagePreview ? (
                 <Image
                    src={imagePreview}
                    alt="Aperçu"
                    layout="fill"
                    className="object-cover"
                />
            ) : (
                <div className="text-center p-2">
                     <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                     <p className="text-md text-muted-foreground mt-2">Ajouter une photo ou vidéo</p>
                </div>
            )}
             <Input
                id="story-upload"
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleImageChange}
            />
        </label>

        <Textarea
            placeholder="Ajouter une légende..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full max-w-sm"
        />
      </div>
    </div>
  );
}
