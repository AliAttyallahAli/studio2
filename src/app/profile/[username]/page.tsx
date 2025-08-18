
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, ThumbsUp, MessageSquare, UserPlus } from 'lucide-react';


// Mock data - in a real app, you would fetch this based on the username param
const userProfiles: { [key: string]: any } = {
    user123: {
        name: '@user123',
        avatar: 'https://placehold.co/100x100.png',
        email: 'user123@exemple.com',
        bio: "Heureux de rejoindre la communauté Zoudou ! Prêt à miner mes premiers tokens Z. 🚀",
        parcours: "Je m'intéresse à la crypto depuis 2020. J'ai participé à plusieurs projets communautaires.",
        interests: "Crypto, Gaming, Voyages",
        maritalStatus: "Célibataire",
    },
    tech_news: {
        name: '@tech_news',
        avatar: 'https://placehold.co/100x100.png',
        email: 'tech_news@exemple.com',
        bio: "Toutes les dernières actualités sur la technologie et le Web3.",
        parcours: "Journaliste tech avec plus de 10 ans d'expérience. Focus sur la blockchain et l'IA.",
        interests: "Technologie, Journalisme, Futurisme",
        maritalStatus: "Ne pas spécifier",
    },
     crypto_queen: {
        name: '@crypto_queen',
        avatar: 'https://placehold.co/100x100.png',
        email: 'crypto_queen@exemple.com',
        bio: "Reine de la crypto. J'explore, j'investis et je partage mes connaissances. #WomenInCrypto",
        parcours: "Analyste financière convertie en experte DeFi. Spécialisée dans les stratégies de yield farming.",
        interests: "DeFi, NFT, Finance décentralisée",
        maritalStatus: "En couple",
    }
};


export default function UserProfilePage({ params: { username } }: { params: { username: string } }) {
    const userProfile = userProfiles[username] || {
        name: `@${username}`,
        avatar: 'https://placehold.co/100x100.png',
        email: `${username}@exemple.com`,
        bio: "Ce profil n'a pas encore été complété.",
        parcours: "Aucune information.",
        interests: "Aucun centre d'intérêt spécifié.",
        maritalStatus: "Non spécifié",
    };

  return (
    <AppLayout>
        <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} data-ai-hint="profile avatar" />
                    <AvatarFallback>{userProfile.name.charAt(1)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                </div>
                 <div className="flex items-center gap-2">
                    <Button><UserPlus className="mr-2" /> Suivre</Button>
                    <Button variant="outline"><MessageSquare className="mr-2" /> Message</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>À propos de {userProfile.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-1">Biographie</h4>
                        <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
                    </div>
                        <div>
                        <h4 className="font-semibold mb-1">Parcours</h4>
                        <p className="text-sm text-muted-foreground">{userProfile.parcours}</p>
                    </div>
                    <div className="flex items-center">
                        <Heart className="mr-2 h-4 w-4 text-muted-foreground"/>
                        <p className="text-sm">{userProfile.maritalStatus}</p>
                    </div>
                    <div className="flex items-center">
                        <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground"/>
                        <p className="text-sm">{userProfile.interests}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
