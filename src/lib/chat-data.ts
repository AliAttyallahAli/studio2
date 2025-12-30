
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

export interface Story {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    items: {
        type: 'image' | 'video';
        url: string;
        hint?: string;
    }[];
    seen?: boolean;
    timestamp: string;
}

export interface FeedPost {
  id: string;
  user: { name: string; username: string; avatar: string };
  time: string;
  content: string;
  image: string | null;
  imageHint: string;
  linkPreview: {
    url: string;
    title: string;
    description: string;
    image: string;
  } | null;
  likes: number;
  comments: { id: string; user: { name: string; avatar: string }; content: string; time: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  author: { name: string; username: string; avatar: string };
  image: string;
  imageHint: string;
  category: string;
  readTime: string;
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
   'saheluser': {
    id: 'saheluser',
    name: '@SahelUser',
    avatar: 'https://picsum.photos/seed/sahel/100/100',
    description: 'Moi',
    isGroup: false,
    details: {
        bio: "Passionné par la révolution Web3 en Afrique. #SAHEL",
        parcours: "Développeur et entrepreneur, focus sur les solutions décentralisées pour les marchés émergents.",
        interests: "Web3, Entrepreneuriat, Afrique",
        maritalStatus: "En couple"
    }
   }
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

export let allStories: Story[] = [
    {
      id: 'story-2',
      user: { name: 'Alice', avatar: 'https://picsum.photos/seed/alice/100/100' },
      items: [{ type: 'image', url: 'https://picsum.photos/seed/beach/1080/1920', hint: 'tropical beach' }],
      seen: false,
      timestamp: 'Il y a 2h',
    },
    {
      id: 'story-3',
      user: { name: 'Bob', avatar: 'https://picsum.photos/seed/bob/100/100' },
      items: [{ type: 'image', url: 'https://picsum.photos/seed/city/1080/1920', hint: 'city scape' }],
      seen: false,
      timestamp: 'Il y a 3h',
    },
    {
      id: 'story-4',
      user: { name: 'Charlie', avatar: 'https://picsum.photos/seed/charlie/100/100' },
      items: [{ type: 'image', url: 'https://picsum.photos/seed/nature/1080/1920', hint: 'nature forest' }],
      seen: true,
      timestamp: 'Il y a 5h',
    },
    {
      id: 'story-5',
      user: { name: 'David', avatar: 'https://picsum.photos/seed/david/100/100' },
      items: [{ type: 'image', url: 'https://picsum.photos/seed/food/1080/1920', hint: 'delicious food' }],
      seen: true,
      timestamp: 'Il y a 8h',
    },
];

export let allFeedPosts: FeedPost[] = [
  {
    id: 'post-1',
    user: { name: '@SahelUser', username: 'saheluser', avatar: 'https://picsum.photos/seed/sahel/100/100' },
    time: 'Il y a 2 heures',
    content: 'Heureux de rejoindre la communauté SAHEL ! Prêt à miner mes premiers SAHEL. 🚀',
    image: 'https://picsum.photos/seed/rocket/600/400',
    imageHint: 'rocket launch',
    linkPreview: null,
    likes: 12,
    comments: [
        { id: 'c1-1', user: { name: 'Alice', avatar: 'https://picsum.photos/seed/alice/100/100' }, content: 'Bienvenue !', time: '1h' }
    ]
  },
  {
    id: 'post-2',
    user: { name: '@tech_news', username: 'tech_news', avatar: 'https://picsum.photos/seed/guru/100/100' },
    time: 'Il y a 4 heures',
    content: 'Article intéressant sur le futur du Web3 : https://example-web3-news.com/article',
    image: null,
    imageHint: '',
    linkPreview: {
        url: 'https://example-web3-news.com/article',
        title: 'Le futur du Web3 : décentralisation et tokens',
        description: 'Un aperçu des tendances qui façonneront la prochaine génération d\'internet, de la DeFi aux DAO en passant par les identités décentralisées.',
        image: 'https://picsum.photos/seed/web3news/600/315',
    },
    likes: 42,
    comments: []
  },
  {
    id: 'post-3',
    user: { name: '@crypto_queen', username: 'crypto_queen', avatar: 'https://picsum.photos/seed/queen/100/100' },
    time: 'Il y a 5 heures',
    content: "Le marché est en pleine effervescence aujourd'hui. J'ai échangé quelques SAHEL contre un bon d'achat. C'est tellement pratique !",
    image: null,
    imageHint: '',
    linkPreview: null,
    likes: 5,
    comments: []
  },
];

export let allBlogPosts: BlogPost[] = [
    { 
        id: 'blog-1',
        title: "L'impact de la tokenisation sur l'immobilier en Afrique",
        description: "Découvrez comment la blockchain et la tokenisation, via des projets comme Z-Immo, peuvent révolutionner l'accès à la propriété sur le continent.",
        author: { name: "ImmoToken", username: "immotoken", avatar: "https://picsum.photos/seed/immo/100/100" },
        image: "https://picsum.photos/seed/building/800/400",
        imageHint: "modern architecture",
        category: "Technologie",
        readTime: "8 min de lecture"
    },
    { 
        id: 'blog-2',
        title: "Agriculture Durable : Le rôle des EcoTokens",
        description: "Les EcoTokens ne sont pas juste une monnaie, c'est un mouvement. Voici comment ils financent des projets à impact positif pour notre environnement.",
        author: { name: "EcoVille", username: "ecoville", avatar: "https://picsum.photos/seed/eco/100/100" },
        image: "https://picsum.photos/seed/farm/800/400",
        imageHint: "vertical farm",
        category: "Écologie",
        readTime: "6 min de lecture"
    },
];


export const addStory = (story: Story) => {
  allStories.unshift(story);
};

export const addPost = (post: FeedPost) => {
  allFeedPosts.unshift(post);
};

export const addBlogPost = (post: BlogPost) => {
  allBlogPosts.unshift(post);
};

export const getChatData = (id: string): ChatData | undefined => {
    return allChats.find(chat => chat.id === id);
}

export const getUserProfile = (id: string): UserProfileData | undefined => {
    return userProfiles[id];
}

export const getStoryData = (id: string): Story | undefined => {
    return allStories.find(story => story.id === id);
};
