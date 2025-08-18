
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { ArrowRight, Briefcase, Handshake, Lightbulb, PiggyBank } from 'lucide-react';

const projects = [
    { 
        title: "Ferme Écologique Urbaine",
        description: "Développer une ferme verticale pour fournir des produits frais et locaux à la communauté. Nous cherchons des volontaires et des experts en agronomie.",
        author: { name: "EcoVille", avatar: "https://placehold.co/100x100.png" },
        tags: ["Écologie", "Communauté"],
        action: "Participer"
    },
     { 
        title: "Ateliers de Code pour Enfants",
        description: "Lancer des ateliers gratuits pour initier les jeunes de 8 à 14 ans à la programmation et à la robotique.",
        author: { name: "TechFuture", avatar: "https://placehold.co/100x100.png" },
        tags: ["Éducation", "Technologie"],
        action: "S'inscrire"
    },
];

const fundingCampaigns = [
    {
        title: "Application Mobile 'Zoudou Pay'",
        description: "Financer le développement d'une solution de paiement mobile intégrée à l'écosystème Zoudou pour faciliter les transactions locales.",
        author: { name: "Zoudou Core", avatar: "https://placehold.co/100x100.png" },
        goal: "100,000 Z",
        raised: "45,000 Z",
        progress: 45,
        image: "https://placehold.co/600x400.png",
        imageHint: "mobile payment app"
    },
    {
        title: "Installation de Panneaux Solaires",
        description: "Équiper le marché communautaire de panneaux solaires pour une énergie propre et réduire les coûts pour les vendeurs.",
        author: { name: "Énergie Solidaire", avatar: "https://placehold.co/100x100.png" },
        goal: "50,000 Z",
        raised: "42,500 Z",
        progress: 85,
        image: "https://placehold.co/600x400.png",
        imageHint: "solar panels market"
    }
];

const investments = [
    {
        title: "Obligations Zoudou - Tranche 1",
        description: "Investissez dans le développement de l'infrastructure Zoudou et recevez un rendement annuel de 5%.",
        minInvestment: "500 Z",
        apy: "5% APY",
        term: "2 ans",
    },
    {
        title: "Parts dans 'Z-Immobilier'",
        description: "Devenez co-propriétaire d'un projet immobilier tokenisé, générant des revenus locatifs mensuels.",
        minInvestment: "1,000 Z",
        apy: "8% APY (estimé)",
        term: "Long terme",
    }
]

export default function CitizensSpacePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="text-left">
            <h1 className="text-3xl font-bold">Espace Citoyens</h1>
            <p className="text-muted-foreground">Participez, financez et investissez dans l'avenir de la communauté.</p>
        </div>

        <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="projects"><Lightbulb className="mr-2 h-4 w-4" />Appels à Projets</TabsTrigger>
                <TabsTrigger value="funding"><PiggyBank className="mr-2 h-4 w-4" />Financement</TabsTrigger>
                <TabsTrigger value="investment"><Briefcase className="mr-2 h-4 w-4" />Investissement</TabsTrigger>
                <TabsTrigger value="loans"><Handshake className="mr-2 h-4 w-4" />Prêts & Achats</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="mt-6">
                <div className="space-y-4">
                    {projects.map((project, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                 <div className="flex items-center gap-2 pt-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={project.author.avatar} alt={project.author.name} data-ai-hint="profile avatar" />
                                        <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground">Proposé par {project.author.name}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{project.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary">{tag}</span>
                                        ))}
                                    </div>
                                    <Button variant="outline">{project.action} <ArrowRight className="ml-2 h-4 w-4"/></Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="funding" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fundingCampaigns.map((campaign, index) => (
                        <Card key={index}>
                            <CardHeader className="p-0">
                                <Image src={campaign.image} alt={campaign.title} width={600} height={400} className="rounded-t-lg object-cover" data-ai-hint={campaign.imageHint} />
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-xl mb-2">{campaign.title}</CardTitle>
                                <p className="text-sm text-muted-foreground mb-4 h-10">{campaign.description}</p>
                                <Progress value={campaign.progress} className="mb-2" />
                                <div className="flex justify-between items-center text-sm mb-4">
                                    <span className="text-primary font-bold">{campaign.raised}</span>
                                    <span className="text-muted-foreground">sur {campaign.goal}</span>
                                </div>
                                <Button className="w-full bg-accent hover:bg-accent/90">Contribuer</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

             <TabsContent value="investment" className="mt-6">
                 <div className="space-y-4">
                    {investments.map((inv, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{inv.title}</CardTitle>
                                <CardDescription>Rendement : <span className="text-primary font-semibold">{inv.apy}</span> | Durée : {inv.term}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{inv.description}</p>
                                 <div className="flex items-center justify-between">
                                    <p className="text-sm">Investissement min: <span className="font-semibold">{inv.minInvestment}</span></p>
                                    <Button variant="default">Investir <ArrowRight className="ml-2 h-4 w-4"/></Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
             </TabsContent>

             <TabsContent value="loans" className="mt-6">
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Les propositions de prêts et les pré-achats seront bientôt disponibles ici.</p>
                </div>
             </TabsContent>

        </Tabs>
      </div>
    </AppLayout>
  );
}
