
'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const stories = [
  {
    id: 'story-2',
    user: { name: 'Alice', avatar: 'https://placehold.co/100x100.png' },
    seen: false,
  },
  {
    id: 'story-3',
    user: { name: 'Bob', avatar: 'https://placehold.co/100x100.png' },
    seen: false,
  },
  {
    id: 'story-4',
    user: { name: 'Charlie', avatar: 'https://placehold.co/100x100.png' },
    seen: true,
  },
  {
    id: 'story-5',
    user: { name: 'David', avatar: 'https://placehold.co/100x100.png' },
    seen: true,
  },
  {
    id: 'story-6',
    user: { name: 'Eve', avatar: 'https://placehold.co/100x100.png' },
    seen: false,
  },
  {
    id: 'story-7',
    user: { name: 'Frank', avatar: 'https://placehold.co/100x100.png' },
    seen: true,
  },
];

export function StoryCarousel() {
  const router = useRouter();

  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
      }}
      className="w-full -ml-4"
    >
      <CarouselContent>
        {/* Add Your Story */}
        <CarouselItem className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8">
          <div className="p-1 cursor-pointer" onClick={() => router.push('/story/create')}>
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-dashed border-muted-foreground">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Votre avatar" data-ai-hint="profile avatar" />
                  <AvatarFallback>Moi</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary border-2 border-background">
                  <Plus className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <p className="text-xs font-medium truncate w-16 text-center">
                Votre statut
              </p>
            </div>
          </div>
        </CarouselItem>

        {/* Other user stories */}
        {stories.map((story) => (
          <CarouselItem key={story.id} className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8">
            <div className="p-1 cursor-pointer" onClick={() => router.push(`/story/${story.id}`)}>
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  className={cn(
                    'w-16 h-16 story-avatar-ring',
                    story.seen
                      ? 'story-avatar-ring-seen'
                      : 'story-avatar-ring-unseen'
                  )}
                >
                  <AvatarImage src={story.user.avatar} alt={story.user.name} data-ai-hint="profile avatar" />
                  <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-xs font-medium truncate w-16 text-center">
                  {story.user.name}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
