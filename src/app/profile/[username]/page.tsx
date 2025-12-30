'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, ThumbsUp, MessageSquare, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Type pour le profil utilisateur
type UserProfile = {
  name: string;
  avatar: string;
  email: string;
  bio: string;
  parcours: string;
  interests: string;
  maritalStatus: string;
};

// Mock data avec typage
const userProfiles: Record<string, UserProfile> = {
  user123: {
    name: '@user123',
    avatar: 'https://picsum.photos/seed/user123/100/100',
    email: 'user123@exemple.com',
    bio: "Heureux de rejoindre la communauté Zoudou ! Prêt à miner mes premiers SAHEL. 🚀",
    parcours: "Je m'intéresse à la crypto depuis 2020. J'ai participé à plusieurs projets communautaires.",
    interests: "Crypto, Gaming, Voyages",
    maritalStatus: "Célibataire",
  },
  tech_news: {
    name: '@tech_news',
    avatar: 'https://picsum.photos/seed/guru/100/100',
    email: 'tech_news@exemple.com',
    bio: "Toutes les dernières actualités sur la technologie et le Web3.",
    parcours: "Journaliste tech avec plus de 10 ans d'expérience. Focus sur la blockchain et l'IA.",
    interests: "Technologie, Journalisme, Futurisme",
    maritalStatus: "Ne pas spécifier",
  },
  crypto_queen: {
    name: '@crypto_queen',
    avatar: 'https://picsum.photos/seed/queen/100/100',
    email: 'crypto_queen@exemple.com',
    bio: "Reine de la crypto. J'explore, j'investis et je partage mes connaissances. #WomenInCrypto",
    parcours: "Analyste financière convertie en experte DeFi. Spécialisée dans les stratégies de yield farming.",
    interests: "DeFi, NFT, Finance décentralisée",
    maritalStatus: "En couple",
  },
  saheluser: {
    name: '@SahelUser',
    avatar: 'https://picsum.photos/seed/zoudou/100/100',
    email: `sahel.user@exemple.com`,
    bio: "Passionné par la révolution Web3 en Afrique. #SAHEL",
    parcours: "Développeur et entrepreneur, focus sur les solutions décentralisées pour les marchés émergents.",
    interests: "Web3, Entrepreneuriat, Afrique",
    maritalStatus: "En couple"
  }
};

export default function UserProfilePage({ params }: { params: { username: string } }) {
    const userProfile = userProfiles[params.username] || {
        name: `@${params.username}`,
        avatar: 'https://picsum.photos/seed/random/100/100',
        email: `${params.username}@exemple.com`,
        bio: "Ce profil est généré dynamiquement.",
        parcours: "N/A",
        interests: "N/A",
        maritalStatus: "N/A"
    };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              data-ai-hint="profile avatar" 
            />
            <AvatarFallback>
              {userProfile.name.replace('@','').substring(0,2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-muted-foreground">{userProfile.email}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> 
              Suivre
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" /> 
              Message
            </Button>
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
              <Heart className="mr-2 h-4 w-4 text-muted-foreground" />
              <p className="text-sm">{userProfile.maritalStatus}</p>
            </div>
            
            <div className="flex items-center">
              <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground" />
              <p className="text-sm">{userProfile.interests}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
