
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { ArrowRight, Briefcase, Handshake, Lightbulb, PiggyBank, PlusCircle, Repeat } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const tokens = [
    { name: "Z-Immo Token", ticker: "ZIM", description: "Token représentant une part d'un projet immobilier tokenisé, générant des revenus locatifs mensuels.", logo: "https://picsum.photos/seed/zim/48/48" },
    { name: "EcoToken", ticker: "ECO", description: "Token pour financer et participer à des projets écologiques locaux, comme les fermes urbaines.", logo: "https://picsum.photos/seed/eco/48/48" },
];

const dexSwaps = [
    { from: "SAHEL", to: "ZIM", rate: "1 SAHEL = 10 ZIM" },
    { from: "SAHEL", to: "ECO", rate: "1 SAHEL = 100 ECO" },
    { from: "ZIM", to: "ECO", rate: "1 ZIM = 10 ECO" },
]

function CreateTokenDialog() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Créer un nouveau Token</DialogTitle>
                <DialogDescription>
                    Créez votre propre token adossé au SAHEL coin. 1 SAHEL = 100 de votre nouveau token.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                 <div className="space-y-2">
                    <Label htmlFor="token-name">Nom du Token</Label>
                    <Input id="token-name" placeholder="Ex: MonProjetToken" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="token-ticker">Symbole (Ticker)</Label>
                    <Input id="token-ticker" placeholder="Ex: MPT" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sahel-amount">Montant de SAHEL à adosser</Label>
                    <Input id="sahel-amount" type="number" placeholder="100" />
                </div>
                 <div className="text-center text-muted-foreground p-4 bg-secondary rounded-md">
                    <p>Vous recevrez</p>
                    <p className="text-2xl font-bold text-primary">10,000 MPT</p>
                    <p className="text-xs">(Basé sur 100 SAHEL)</p>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">Créer le Token</Button>
            </div>
        </DialogContent>
    );
}


export default function DexPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div className="text-left">
                <h1 className="text-3xl font-bold">DEX & Tokenisation</h1>
                <p className="text-muted-foreground">Échangez des actifs et créez vos propres tokens.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                     <Button>
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        Créer un Token
                    </Button>
                </DialogTrigger>
                <CreateTokenDialog />
            </Dialog>
        </div>

        <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="swap"><Repeat className="mr-2 h-4 w-4" />Swap</TabsTrigger>
                <TabsTrigger value="tokens"><PiggyBank className="mr-2 h-4 w-4" />Tokens Listés</TabsTrigger>
            </TabsList>

            <TabsContent value="swap" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Échanger des actifs</CardTitle>
                        <CardDescription>Échangez instantanément entre le SAHEL et les tokens de l'écosystème.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Vous donnez</Label>
                                <Input type="number" placeholder="0.0" />
                                 <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sahel">SAHEL</SelectItem>
                                        <SelectItem value="zim">ZIM</SelectItem>
                                        <SelectItem value="eco">ECO</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Vous recevez</Label>
                                <Input type="number" placeholder="0.0" readOnly />
                                 <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sahel">SAHEL</SelectItem>
                                        <SelectItem value="zim">ZIM</SelectItem>
                                        <SelectItem value="eco">ECO</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <p className="text-sm text-center text-muted-foreground">Taux de conversion : 1 SAHEL = 10 ZIM</p>
                        <Button className="w-full" size="lg">Échanger</Button>
                    </CardContent>
                </Card>
                 <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Taux de change</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {dexSwaps.map((swap, index) => (
                            <Card key={index} className="bg-secondary">
                                <CardContent className="p-4 flex justify-center items-center">
                                    <p className="font-semibold">{swap.from} <Repeat className="inline mx-2 h-4 w-4"/> {swap.to}</p>
                                    <p className="ml-auto font-mono text-primary">{swap.rate.split('=')[1]}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="tokens" className="mt-6">
                <div className="space-y-4">
                    {tokens.map((token, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={token.logo} alt={token.name} data-ai-hint="token logo" />
                                    <AvatarFallback>{token.ticker}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{token.name} ({token.ticker})</CardTitle>
                                    <CardDescription>{token.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full md:w-auto">Échanger ce token</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
