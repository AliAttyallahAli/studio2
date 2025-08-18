'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const marketplaceItems = [
  { name: "NFT 'Z-Lion'", price: '150 Z', image: 'https://placehold.co/400x400.png', hint: 'lion abstract' },
  { name: "Bon d'achat Amazon", price: '50 Z', image: 'https://placehold.co/400x400.png', hint: 'gift card' },
  { name: "Ticket de tombola", price: '5 Z', image: 'https://placehold.co/400x400.png', hint: 'lottery ticket' },
];

export default function MarketplacePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold">Marché Zoudou</h1>
            <p className="text-muted-foreground">Échangez vos tokens Z contre des récompenses.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Vendre des Tokens Z</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="amount-sell">Montant en Z</Label>
                        <Input id="amount-sell" type="number" placeholder="100.00"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Prix en USD</Label>
                        <Input id="price" type="number" placeholder="50.00" />
                    </div>
                    <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90">Mettre en vente</Button>
                </form>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-xl font-semibold mb-4">Acheter des articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketplaceItems.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="p-0">
                            <Image src={item.image} alt={item.name} width={400} height={400} className="rounded-t-lg object-cover" data-ai-hint={item.hint}/>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <CardDescription>Prix : {item.price}</CardDescription>
                            <Button className="w-full">Acheter</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </AppLayout>
  );
}