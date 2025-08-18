'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Block, FileImage, LogOut, Trash2, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatSettingsPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    // In a real app, you'd fetch chat details based on params.id
    const isGroup = params.id === '1' || params.id === '4';
    const chatName = isGroup ? "Zoudou Annonces" : "Alice";
    const chatAvatar = "https://placehold.co/100x100.png";
    const chatDescription = isGroup ? "24 Membres" : "En ligne";

    return (
        <div className="flex flex-col h-full bg-background">
             <header className="flex items-center p-3 border-b shrink-0 bg-background sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-lg font-semibold ml-4">{isGroup ? 'Infos du groupe' : 'Infos du contact'}</h2>
            </header>
            <div className="flex-grow p-4 space-y-6 overflow-y-auto">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={chatAvatar} alt={chatName} data-ai-hint="profile avatar" />
                        <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">{chatName}</h1>
                        <p className="text-muted-foreground">{chatDescription}</p>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-0">
                         <div className="flex items-center justify-between p-4">
                            <Label htmlFor="mute-notifications">Notifications</Label>
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
                                Bloquer {chatName}
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
