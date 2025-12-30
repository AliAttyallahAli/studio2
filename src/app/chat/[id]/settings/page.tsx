
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Block, FileImage, Heart, Bell, LogOut, Trash2, Users, ThumbsUp } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { getUserProfile, type UserProfileData } from '@/lib/chat-data';
import { useEffect, useState } from 'react';

export default function ChatSettingsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const pathname = usePathname();
    const [profile, setProfile] = useState<UserProfileData | null>(null);

    useEffect(() => {
        const id = pathname.split('/').slice(-2, -1)[0];
        const userProfile = getUserProfile(id);
        if (userProfile) {
            setProfile(userProfile);
        } else {
            // Handle case where profile is not found, maybe redirect
            // For now, we'll just let it be null and the component will show a loading state
        }
    }, [pathname]);

    if (!profile) {
        return (
            <div className="flex flex-col h-full bg-background md:border-l items-center justify-center">
                 <p>Chargement du profil...</p>
            </div>
        );
    }
    
    const { isGroup, name, avatar, description, details } = profile;

    return (
        <div className="flex flex-col h-full bg-background md:border-l">
             <header className="flex items-center p-3 border-b shrink-0 bg-background sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-lg font-semibold ml-4">{isGroup ? 'Infos du groupe' : 'Profil'}</h2>
            </header>
            <div className="flex-grow p-4 space-y-6 overflow-y-auto">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={avatar} alt={name} data-ai-hint="profile avatar" />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                </div>

                {!isGroup && details && (
                    <>
                         <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">À propos</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-1">Biographie</h4>
                                    <p className="text-sm text-muted-foreground">{details.bio}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold mb-1">Parcours</h4>
                                    <p className="text-sm text-muted-foreground">{details.parcours}</p>
                                </div>
                                <div className="flex items-center">
                                    <Heart className="mr-2 h-4 w-4 text-muted-foreground"/>
                                    <p className="text-sm">{details.maritalStatus}</p>
                                </div>
                                <div className="flex items-center">
                                    <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground"/>
                                    <p className="text-sm">{details.interests}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
                

                <Card>
                    <CardContent className="p-0">
                         <div className="flex items-center justify-between p-4">
                            <div className="flex items-center">
                                <Bell className="mr-4 h-5 w-5 text-muted-foreground" />
                                <Label htmlFor="mute-notifications">Notifications</Label>
                            </div>
                             <Switch id="mute-notifications" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                     <CardContent className="p-0 divide-y divide-border">
                        <Button variant="ghost" className="w-full justify-start p-4 h-auto text-base">
                            <FileImage className="mr-4 h-5 w-5 text-muted-foreground" />
                            Médias, liens et docs
                        </Button>
                        {isGroup && (
                            <Button variant="ghost" className="w-full justify-start p-4 h-auto text-base">
                                <Users className="mr-4 h-5 w-5 text-muted-foreground" />
                                Voir les membres
                            </Button>
                        )}
                    </CardContent>
                </Card>
                 
                 <Card>
                    <CardContent className="p-0 divide-y divide-border">
                        {!isGroup && (
                             <Button variant="ghost" className="w-full justify-start p-4 h-auto text-base text-destructive hover:text-destructive">
                                <Block className="mr-4 h-5 w-5" />
                                Bloquer {name}
                            </Button>
                        )}
                        <Button variant="ghost" className="w-full justify-start p-4 h-auto text-base text-destructive hover:text-destructive">
                            <Trash2 className="mr-4 h-5 w-5" />
                            {isGroup ? 'Effacer le contenu' : 'Effacer la discussion'}
                        </Button>
                         {isGroup && (
                            <Button variant="ghost" className="w-full justify-start p-4 h-auto text-base text-destructive hover:text-destructive">
                                <LogOut className="mr-4 h-5 w-5" />
                                Quitter le groupe
                            </Button>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Simple Label component for use with the Switch
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {children}
    </label>
);
