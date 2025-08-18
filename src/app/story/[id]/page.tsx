
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Mock data, in a real app this would be fetched
const storyData = {
  id: 'story-2',
  user: { name: 'Alice', avatar: 'https://placehold.co/100x100.png' },
  items: [
    { type: 'image', url: 'https://placehold.co/1080x1920.png', hint: 'tropical beach' },
  ],
  timestamp: 'Il y a 2h',
};

export default function StoryViewerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          router.back(); // Go back when story ends
          return 100;
        }
        return prev + 2; // Increase progress every 100ms for a 5s story
      });
    }, 100);

    return () => clearInterval(timer);
  }, [router]);

  const currentItem = storyData.items[0]; // Assuming one item per story for now

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-lg h-full sm:h-[90vh] sm:max-h-[800px] flex flex-col bg-background rounded-none sm:rounded-lg overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-2 left-2 right-2 z-20">
            <Progress value={progress} className="h-1" />
        </div>

        {/* Header */}
        <header className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={storyData.user.avatar} alt={storyData.user.name} data-ai-hint="profile avatar" />
              <AvatarFallback>{storyData.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white text-shadow">{storyData.user.name}</p>
              <p className="text-xs text-neutral-300 text-shadow">{storyData.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => router.back()}>
            <X className="h-6 w-6" />
          </Button>
        </header>

        {/* Content */}
        <div className="relative flex-grow">
          {currentItem.type === 'image' && (
            <Image
              src={currentItem.url}
              alt={`Statut de ${storyData.user.name}`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={currentItem.hint}
            />
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
        </div>

        {/* Navigation */}
        <div className="absolute inset-y-0 left-0 w-1/3 z-10" title="Previous" />
        <div className="absolute inset-y-0 right-0 w-1/3 z-10" title="Next" />

         <style jsx>{`
            .text-shadow {
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
            }
        `}</style>
      </div>
    </div>
  );
}
