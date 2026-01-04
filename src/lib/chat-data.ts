
export interface ChatMessage {
  id: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'poll';
  content?: string;
  url?: string;
  hint?: string;
  duration?: string;
  file?: {
    name: string;
    size: string;
  };
   poll?: {
    question: string;
    options: { text: string; votes: number }[];
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
  status?: 'En ligne' | 'Hors ligne';
  details?: UserProfileDetails;
}

export interface ChatData {
  id: string;
  contact: {
    id: string;
    name: string;
    avatar: string;
    type: 'user' | 'group' | 'forum';
    status?: 'En ligne' | 'Hors ligne';
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
  user: { name: string; username: string; avatar: string, status?: 'En ligne' | 'Hors ligne' };
  time: string;
  content: string;
  mediaUrl: string | null;
  mediaType: 'image' | 'video' | null;
  imageHint: string;
  linkPreview: {
    url: string;
    title: string;
    description: string;
    image?: string;
  } | null;
  poll: {
    question: string;
    options: { text: string; votes: number }[];
  } | null;
  likes: number;
  comments: { id: string; user: { name: string; avatar: string }; content: string; time: string }[];
  boosted?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: { name: string; username: string; avatar: string };
  image: string;
  imageHint: string;
  category: string;
  readTime: string;
  attachment?: {
      name: string;
      url: string;
      size: string;
  }
}

export const miningData = {
    completedSessions: 6,
};

export const coreTeamWallet = {
    address: '0xSHELCORETEAM...a1b2c3d4e5f6',
    balance: 1500000 + (6 * 8), // Base + mining fees
    tokens: [
        { name: 'Z-Immo', balance: '25000.00 ZIM', address: '0xZIMCORE...12345' },
        { name: 'EcoToken', balance: '125000.00 ECO', address: '0xECOCORE...67890' },
    ],
    chains: ['Ethereum', 'BNB Chain', 'Polygon']
};

export const addFeeToCoreTeamWallet = (fee: number) => {
    coreTeamWallet.balance += fee;
}

export const walletData = {
    sahel: { balance: 200.00, address: '0xSHEL123abc456def789ghi012jkl345mno' },
    privateKey: '0xprivkey_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6',
    accessKey: 'zoudou-access-key-gamma-7-zeta-9',
    tokens: [
        { name: 'Z-Immo', balance: '0.00 ZIM', address: '0xZIM456def789ghi012jkl345mno456def' },
        { name: 'EcoToken', balance: '0.00 ECO', address: '0xECO789ghi012jkl345mno456def789ghi' },
    ]
};

export const updateSahelBalance = (amount: number): boolean => {
    if (walletData.sahel.balance + amount < 0) {
        return false; // Insufficient funds
    }
    walletData.sahel.balance += amount;
    return true;
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
    status: 'En ligne',
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
    status: 'Hors ligne',
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
    status: 'En ligne',
     details: {
      bio: "Développeur Full-Stack, curieux du Web3.",
      parcours: "Développeur Web avec 3 ans d'expérience.",
      interests: "React, Next.js, Web3",
      maritalStatus: "Célibataire"
    }
  },
  '6': {
    id: '6',
    name: 'Diana',
    avatar: 'https://picsum.photos/seed/diana/100/100',
    description: '@diana_designer',
    isGroup: false,
    status: 'Hors ligne',
    details: {
      bio: "Designer UI/UX spécialisée dans les applications décentralisées.",
      parcours: "Designer depuis 4 ans, passionnée par l'esthétique et la fonctionnalité.",
      interests: "UI/UX, Design, Art digital",
      maritalStatus: "Célibataire"
    }
  },
   'saheluser': {
    id: 'saheluser',
    name: '@SahelUser',
    avatar: 'https://picsum.photos/seed/sahel/100/100',
    description: 'Moi',
    isGroup: false,
    status: 'En ligne',
    details: {
        bio: "Passionné par la révolution Web3 en Afrique. #SAHEL",
        parcours: "Développeur et entrepreneur, focus sur les solutions décentralisées pour les marchés émergents.",
        interests: "Web3, Entrepreneuriat, Afrique",
        maritalStatus: "En couple"
    }
   }
};


export let allChats: ChatData[] = [
  { 
    id: '1', 
    contact: { id: '1', name: 'SAHEL Annonces', avatar: 'https://picsum.photos/seed/announce/100/100', type: 'forum' },
    lastMessage: 'Bienvenue sur SAHEL !', 
    time: '14:32', 
    messages: [
      { id: 'msg1-1', type: 'text', content: 'Bienvenue sur SAHEL ! Découvrez les dernières nouveautés.', sender: 'other', time: '14:32' },
    ]
  },
  { 
    id: '2', 
    contact: { id: '2', name: 'Alice', avatar: 'https://picsum.photos/seed/alice/100/100', type: 'user', status: 'En ligne' },
    lastMessage: 'Bienvenue ! C\'est une super plateforme.', 
    time: '14:31', 
    messages: [
      { id: 'msg2-1', type: 'text', content: 'Salut ! Comment ça va ?', sender: 'other', time: '14:28' },
      { id: 'msg2-2', type: 'text', content: 'Ça va bien, merci ! Et toi ?', sender: 'me', time: '14:29' },
      { id: 'msg2-3', type: 'text', content: 'Super ! Heureux de rejoindre la communauté SAHEL ! Prêt à miner mes premiers SAHEL. 🚀', sender: 'other', time: '14:30' },
      { id: 'msg2-4', type: 'image', url: 'https://picsum.photos/seed/abstract/600/400', hint: 'abstract design', sender: 'other', time: '14:32' },
      { id: 'msg2-5', type: 'text', content: 'Bienvenue ! C\'est une super plateforme.', sender: 'me', time: '14:31' },
      { id: 'msg2-6', type: 'file', file: { name: 'whitepaper_sahel.pdf', size: '1.2 MB' }, sender: 'me', time: '14:35' },
      { id: 'msg2-7', type: 'audio', duration: '00:12', sender: 'me', time: '14:38'},
      { id: 'msg2-8', type: 'audio', duration: '00:25', sender: 'other', time: '14:40'},
    ]
  },
  { 
    id: '3', 
    contact: { id: '3', name: 'Bob', avatar: 'https://picsum.photos/seed/bob/100/100', type: 'user', status: 'Hors ligne' },
    lastMessage: 'On se voit plus tard.', 
    time: '12:15',
    messages: [
      { id: 'msg3-1', type: 'text', content: 'On se voit plus tard.', sender: 'other', time: '12:15' },
    ]
  },
  { 
    id: '4', 
    contact: { id: '4', name: 'Projet Z-NFT', avatar: 'https://picsum.photos/seed/nft/100/100', type: 'group' },
    lastMessage: 'Quel est votre design préféré ?', 
    time: '11:58',
    messages: [
        { id: 'msg4-1', type: 'text', content: 'N\'oubliez pas la réunion de 16h.', sender: 'other', time: '11:58' },
        { 
            id: 'msg4-2', 
            type: 'poll',
            sender: 'other',
            time: '11:59',
            poll: {
                question: 'Quel est votre design préféré pour le prochain NFT ?',
                options: [
                    { text: 'Abstrait', votes: 1 },
                    { text: 'Figuratif', votes: 3 },
                    { text: 'Minimaliste', votes: 5 },
                ]
            }
        },
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
    user: { name: '@SahelUser', username: 'saheluser', avatar: 'https://picsum.photos/seed/sahel/100/100', status: 'En ligne' },
    time: 'Il y a 2 heures',
    content: 'Heureux de rejoindre la communauté SAHEL ! Prêt à miner mes premiers SAHEL. 🚀',
    mediaUrl: 'https://picsum.photos/seed/rocket/600/400',
    mediaType: 'image',
    imageHint: 'rocket launch',
    linkPreview: null,
    poll: null,
    likes: 12,
    comments: [
        { id: 'c1-1', user: { name: 'Alice', avatar: 'https://picsum.photos/seed/alice/100/100' }, content: 'Bienvenue !', time: '1h' }
    ],
    boosted: false,
  },
  {
    id: 'post-2',
    user: { name: '@tech_news', username: 'tech_news', avatar: 'https://picsum.photos/seed/guru/100/100', status: 'En ligne' },
    time: 'Il y a 4 heures',
    content: 'Article intéressant sur le futur du Web3 : https://www.facebook.com/watch/?v=1103763354229954',
    mediaUrl: null,
    mediaType: null,
    imageHint: '',
    linkPreview: {
        url: 'https://www.facebook.com/watch/?v=1103763354229954',
        title: 'Le futur du Web3 : décentralisation et tokens',
        description: 'Un aperçu des tendances qui façonneront la prochaine génération d\'internet, de la DeFi aux DAO en passant par les identités décentralisées.',
        image: 'https://i.ytimg.com/vi/m15kRt_Bqpw/maxresdefault.jpg',
    },
    poll: null,
    likes: 42,
    comments: [],
    boosted: true,
  },
  {
    id: 'post-4',
    user: { name: 'SAHEL Annonces', username: 'sahel_annonces', avatar: 'https://picsum.photos/seed/announce/100/100' },
    time: 'Il y a 8 heures',
    content: 'Quelle fonctionnalité attendez-vous le plus ?',
    mediaUrl: null,
    mediaType: null,
    imageHint: '',
    poll: {
        question: 'Quelle fonctionnalité attendez-vous le plus ?',
        options: [
            { text: 'Staking de SAHEL', votes: 18 },
            { text: 'Intégration de plus de DApps', votes: 32 },
            { text: 'Gouvernance (DAO)', votes: 25 },
        ]
    },
    likes: 75,
    comments: [],
    boosted: false,
  },
  {
    id: 'post-3',
    user: { name: '@crypto_queen', username: 'crypto_queen', avatar: 'https://picsum.photos/seed/queen/100/100', status: 'Hors ligne' },
    time: 'Il y a 5 heures',
    content: "Le marché est en pleine effervescence aujourd'hui. J'ai échangé quelques SAHEL contre un bon d'achat. C'est tellement pratique !",
    mediaUrl: null,
    mediaType: null,
    imageHint: '',
    linkPreview: null,
    poll: null,
    likes: 5,
    comments: [],
    boosted: false,
  },
];

export let allBlogPosts: BlogPost[] = [
    { 
        id: 'blog-1',
        title: "L'impact de la tokenisation sur l'immobilier en Afrique",
        description: "Découvrez comment la blockchain et la tokenisation, via des projets comme Z-Immo, peuvent révolutionner l'accès à la propriété sur le continent.",
        content: "La tokenisation immobilière représente une opportunité sans précédent pour démocratiser l'investissement immobilier en Afrique. En divisant des actifs de grande valeur en plus petites parts numériques (tokens), elle abaisse considérablement le seuil d'entrée pour les investisseurs. \n\nLes avantages sont multiples : liquidité accrue, transparence des transactions grâce à la blockchain, et accès à un marché plus large. Des projets pionniers comme Z-Immo montrent la voie en proposant des fractions de propriétés résidentielles et commerciales, permettant aux petits épargnants de percevoir des revenus locatifs et de participer à la plus-value des biens. \n\nCependant, des défis réglementaires et d'éducation du marché subsistent. Une collaboration étroite entre les innovateurs technologiques et les régulateurs sera cruciale pour libérer tout le potentiel de cette révolution.",
        author: { name: "ImmoToken", username: "immotoken", avatar: "https://picsum.photos/seed/immo/100/100" },
        image: "https://picsum.photos/seed/building/800/400",
        imageHint: "modern architecture",
        category: "Technologie",
        readTime: "8 min de lecture",
        attachment: {
            name: "Analyse_Immo_Token.pdf",
            url: "/downloads/analyse_immo_token.pdf",
            size: "2.5 MB"
        }
    },
    { 
        id: 'blog-2',
        title: "Agriculture Durable : Le rôle des EcoTokens",
        description: "Les EcoTokens ne sont pas juste une monnaie, c'est un mouvement. Voici comment ils financent des projets à impact positif pour notre environnement.",
        content: "Face aux défis climatiques et alimentaires, les EcoTokens émergent comme un outil de financement innovant pour l'agriculture durable. Chaque token représente un investissement dans un projet écologique concret, comme une ferme urbaine, un projet de reforestation ou une initiative d'agriculture biologique. \n\nCe mécanisme permet non seulement de lever des fonds en dehors des circuits traditionnels, mais aussi de créer une communauté engagée autour de projets à fort impact. Les détenteurs de tokens peuvent suivre la progression des projets en temps réel, participer aux décisions et même recevoir une partie des récoltes ou des bénéfices. \n\nEn liant directement l'investissement à des résultats environnementaux mesurables, les EcoTokens favorisent la transparence et la responsabilité, tout en offrant une nouvelle classe d'actifs pour les investisseurs soucieux de leur impact.",
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
    const chat = allChats.find(chat => chat.id === id);
    if (chat && chat.contact.type === 'user') {
        const userProfile = getUserProfile(chat.contact.id);
        if (userProfile) {
            chat.contact.status = userProfile.status;
        }
    }
    return chat;
}

export const createGroupChat = (groupInfo: {name: string, avatar: string, members: string[]}): ChatData => {
    const newGroupId = `group-${Date.now()}`;
    const newGroup: ChatData = {
        id: newGroupId,
        contact: {
            id: newGroupId,
            name: groupInfo.name,
            avatar: groupInfo.avatar,
            type: 'group',
        },
        lastMessage: 'Vous avez créé le groupe.',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        messages: [{
            id: `msg-${Date.now()}`,
            type: 'text',
            content: `Vous avez créé le groupe "${groupInfo.name}".`,
            sender: 'me',
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        }],
    };
    allChats.unshift(newGroup);
    return newGroup;
};

export const createForumChat = (forumInfo: {name: string, description: string, avatar: string}): ChatData => {
    const newForumId = `forum-${Date.now()}`;
    const newForum: ChatData = {
        id: newForumId,
        contact: {
            id: newForumId,
            name: forumInfo.name,
            avatar: forumInfo.avatar,
            type: 'forum',
        },
        lastMessage: forumInfo.description || `Bienvenue sur le forum ${forumInfo.name}.`,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        messages: [{
            id: `msg-${Date.now()}`,
            type: 'text',
            content: `Forum "${forumInfo.name}" créé.`,
            sender: 'me',
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        }],
    };
    allChats.unshift(newForum);
    return newForum;
};

export const getOrCreateChat = (userId: string): ChatData => {
    let chat = allChats.find(c => c.contact.id === userId && c.contact.type === 'user');
    if (chat) {
        return chat;
    }

    const user = getUserProfile(userId);
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    const newChatId = `chat-${Date.now()}-${userId}`;
    const newChat: ChatData = {
        id: newChatId,
        contact: {
            id: userId,
            name: user.name,
            avatar: user.avatar,
            type: 'user',
            status: user.status
        },
        lastMessage: `Commencez à discuter avec ${user.name}`,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        messages: [],
    };
    allChats.unshift(newChat);
    return newChat;
}

export const getUserProfile = (id: string): UserProfileData | undefined => {
    return userProfiles[id];
}

export const getSuggestedUsers = (): UserProfileData[] => {
    const chatUserIds = allChats.map(c => c.contact.id);
    return Object.values(userProfiles).filter(p => !p.isGroup && !chatUserIds.includes(p.id) && p.id !== 'saheluser');
}

export const getStoryData = (id: string): Story | undefined => {
    return allStories.find(story => story.id === id);
};

export const getBlogPost = (id: string): BlogPost | undefined => {
    return allBlogPosts.find(post => post.id === id);
}

    
    

    

