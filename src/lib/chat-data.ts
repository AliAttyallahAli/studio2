
export interface ChatMessage {
  id: string;
  type: 'text' | 'image' | 'file' | 'audio';
  content?: string;
  url?: string;
  hint?: string;
  duration?: string;
  file?: {
    name: string;
    size: string;
  };
  sender: 'me' | 'other';
  time: string;
}

export interface UserProfileDetails {
  bio: string;
  parcours: string;
  interests: string;
  maritalStatus: string;
}

export interface UserProfileData {
  id: string;
  name: string;
  avatar: string;
  description: string;
  isGroup: boolean;
  details?: UserProfileDetails;
}

export interface ChatData {
  id: string;
  contact: {
    id: string;
    name: string;
    avatar: string;
    type: 'user' | 'group';
  };
  lastMessage: string;
  time: string;
  messages: ChatMessage[];
}

const userProfiles: Record<string, UserProfileData> = {
  '1': {
    id: '1',
    name: 'SAHEL Annonces',
    avatar: 'https://picsum.photos/seed/announce/100/100',
    description: '24 Membres',
    isGroup: true,
  },
  '2': {
    id: '2',
    name: 'Alice',
    avatar: 'https://picsum.photos/seed/alice/100/100',
    description: '@alice_crypto',
    isGroup: false,
    details: {
      bio: "Passionnée de crypto et de voyages. J'explore le web3 un bloc à la fois. 🚀",
      parcours: "Développeuse Blockchain depuis 5 ans, spécialisée dans les contrats intelligents sur Ethereum. A travaillé sur plusieurs projets DeFi et NFT.",
      interests: "Blockchain, Randonnée, Photographie, Musique électronique",
      maritalStatus: "Célibataire"
    }
  },
  '3': {
    id: '3',
    name: 'Bob',
    avatar: 'https://picsum.photos/seed/bob/100/100',
    description: '@bob_trader',
    isGroup: false,
    details: {
      bio: "Trader et analyste technique. Fan de SAHEL coin.",
      parcours: "Trader indépendant depuis 2018.",
      interests: "Trading, Analyse Technique, Économie",
      maritalStatus: "En couple"
    }
  },
  '4': {
    id: '4',
    name: 'Projet Z-NFT',
    avatar: 'https://picsum.photos/seed/nft/100/100',
    description: '12 Membres',
    isGroup: true,
  },
   '5': {
    id: '5',
    name: 'Charlie',
    avatar: 'https://picsum.photos/seed/charlie/100/100',
    description: '@charlie_dev',
    isGroup: false,
     details: {
      bio: "Développeur Full-Stack, curieux du Web3.",
      parcours: "Développeur Web avec 3 ans d'expérience.",
      interests: "React, Next.js, Web3",
      maritalStatus: "Célibataire"
    }
  },
};


export const allChats: ChatData[] = [
  { 
    id: '1', 
    contact: { id: '1', name: 'SAHEL Annonces', avatar: 'https://picsum.photos/seed/announce/100/100', type: 'group' },
    lastMessage: 'Bienvenue sur SAHEL !', 
    time: '14:32', 
    messages: [
      { id: 'msg1-1', type: 'text', content: 'Bienvenue sur SAHEL ! Découvrez les dernières nouveautés.', sender: 'other', time: '14:32' },
    ]
  },
  { 
    id: '2', 
    contact: { id: '2', name: 'Alice', avatar: 'https://picsum.photos/seed/alice/100/100', type: 'user' },
    lastMessage: 'Bienvenue ! C\'est une super plateforme.', 
    time: '14:31', 
    messages: [
      { id: 'msg2-1', type: 'text', content: 'Salut ! Comment ça va ?', sender: 'other', time: '14:28' },
      { id: 'msg2-2', type: 'text', content: 'Ça va bien, merci ! Et toi ?', sender: 'me', time: '14:29' },
      { id: 'msg2-3', type: 'text', content: 'Super ! Heureux de rejoindre la communauté SAHEL ! Prêt à miner mes premiers SAHEL. 🚀', sender: 'other', time: '14:30' },
      { id: 'msg2-4', type: 'image', url: 'https://picsum.photos/seed/abstract/600/400', hint: 'abstract design', sender: 'other', time: '14:32' },
      { id: 'msg2-5', type: 'text', content: 'Bienvenue ! C\'est une super plateforme.', sender: 'me', time: '14:31' },
      { id: 'msg2-6', type: 'file', file: { name: 'whitepaper_sahel.pdf', size: '1.2 MB' }, sender: 'me', time: '14:35' },
    ]
  },
  { 
    id: '3', 
    contact: { id: '3', name: 'Bob', avatar: 'https://picsum.photos/seed/bob/100/100', type: 'user' },
    lastMessage: 'On se voit plus tard.', 
    time: '12:15',
    messages: [
      { id: 'msg3-1', type: 'text', content: 'On se voit plus tard.', sender: 'other', time: '12:15' },
    ]
  },
  { 
    id: '4', 
    contact: { id: '4', name: 'Projet Z-NFT', avatar: 'https://picsum.photos/seed/nft/100/100', type: 'group' },
    lastMessage: 'N\'oubliez pas la réunion de 16h.', 
    time: '11:58',
    messages: [
        { id: 'msg4-1', type: 'text', content: 'N\'oubliez pas la réunion de 16h.', sender: 'other', time: '11:58' },
    ]
  },
];

export const getChatData = (id: string): ChatData | undefined => {
    return allChats.find(chat => chat.id === id);
}

export const getUserProfile = (id: string): UserProfileData | undefined => {
    return userProfiles[id];
}
