
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

export default function CreateStoryPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = () => {
    // Logic to upload image and caption would go here
    console.log('Publishing story:', { image: imagePreview, caption });
    router.push('/feed'); // Redirect to feed after publishing
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <header className="flex items-center justify-between p-3 border-b bg-background">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Créer un Statut</h1>
        <div className="w-9" />
      </header>

      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-secondary/50">
        {imagePreview ? (
          <div className="relative w-full max-w-lg aspect-[9/16]">
            <Image
              src={imagePreview}
              alt="Aperçu du statut"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ) : (
          <label
            htmlFor="story-upload"
            className="flex flex-col items-center justify-center w-full max-w-lg aspect-[9/16] border-2 border-dashed border-muted-foreground rounded-lg cursor-pointer hover:bg-muted"
          >
            <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Appuyez pour ajouter une photo</p>
            <Input
              id="story-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <footer className="p-3 border-t bg-background">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Ajouter une légende..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-0 h-10 flex-grow"
          />
          <Button
            size="icon"
            className="bg-accent hover:bg-accent/90"
            onClick={handlePublish}
            disabled={!imagePreview}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
