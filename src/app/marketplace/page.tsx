
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';


const marketplaceItems = [
  { name: "NFT 'Z-Lion'", price: '150 Z', image: 'https://placehold.co/400x400.png', hint: 'lion abstract', seller: '@user123' },
  { name: "Casque Audio Pro", price: '85 Z', image: 'https://placehold.co/400x400.png', hint: 'pro headphones', seller: '@tech_guru' },
  { name: "Ticket de tombola", price: '5 Z', image: 'https://placehold.co/400x400.png', hint: 'lottery ticket', seller: '@zoudou_admin' },
  { name: "T-shirt Zoudou", price: '25 Z', image: 'https://placehold.co/400x400.png', hint: 'branded t-shirt', seller: '@z_fashion' },

];

function SellItemDialog() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Mettre un article en vente</DialogTitle>
                <DialogDescription>
                    Remplissez les détails de votre article pour le vendre sur le marché.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="item-name">Nom de l'article</Label>
                    <Input id="item-name" placeholder="Ex: Casque Audio Pro" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="item-description">Description</Label>
                    <Textarea id="item-description" placeholder="Décrivez votre article en quelques mots." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="item-price">Prix en Z</Label>
                    <Input id="item-price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="item-image">Image de l'article</Label>
                    <Input id="item-image" type="file" />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">Mettre en vente</Button>
            </div>
        </DialogContent>
    );
}

export default function MarketplacePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="text-left">
                <h1 className="text-3xl font-bold">Marché</h1>
                <p className="text-muted-foreground">Échangez vos tokens Z contre des biens et services.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        Vendre un article
                    </Button>
                </DialogTrigger>
                <SellItemDialog />
            </Dialog>
        </div>

        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketplaceItems.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="p-0">
                            <Image src={item.image} alt={item.name} width={400} height={400} className="rounded-t-lg object-cover" data-ai-hint={item.hint}/>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                             <p className="text-sm text-muted-foreground">Vendu par {item.seller}</p>
                            <CardDescription className="text-base font-semibold text-primary">{item.price}</CardDescription>
                            <Button className="w-full bg-accent hover:bg-accent/90">Acheter</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
