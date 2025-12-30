
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Link from 'next/link';

const marketplaceItems = [
  { name: "Casque VR dernière génération", price: '150 SAHEL', image: 'https://picsum.photos/seed/vr/400/400', hint: 'vr headset', seller: '@user123', sellerAvatar: 'https://picsum.photos/seed/user123/100/100' },
  { name: "Formation Web3 complète", price: '85 SAHEL', image: 'https://picsum.photos/seed/web3/400/400', hint: 'online course', seller: '@tech_guru', sellerAvatar: 'https://picsum.photos/seed/guru/100/100' },
  { name: "Artwork NFT 'Sahel Spirit'", price: '500 ZIM', image: 'https://picsum.photos/seed/nftart/400/400', hint: 'abstract art', seller: '@crypto_queen', sellerAvatar: 'https://picsum.photos/seed/queen/100/100' },
  { name: "T-shirt 'Zoudou'", price: '25 ECO', image: 'https://picsum.photos/seed/tshirt/400/400', hint: 'branded t-shirt', seller: '@z_fashion', sellerAvatar: 'https://picsum.photos/seed/fashion/100/100' },

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
                 <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="item-price">Prix</Label>
                        <Input id="item-price" type="number" placeholder="0.00" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="item-currency">Devise</Label>
                         <Select>
                            <SelectTrigger id="item-currency">
                                <SelectValue placeholder="Devise" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sahel">SAHEL</SelectItem>
                                <SelectItem value="zim">ZIM</SelectItem>
                                <SelectItem value="eco">ECO</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
                <p className="text-muted-foreground">Échangez vos coins et tokens contre des biens et services.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        Devenir vendeur
                    </Button>
                </DialogTrigger>
                <SellItemDialog />
            </Dialog>
        </div>

        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {marketplaceItems.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="p-0">
                            <Image src={item.image} alt={item.name} width={400} height={400} className="rounded-t-lg object-cover aspect-square" data-ai-hint={item.hint}/>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <CardTitle className="text-lg h-12 line-clamp-2">{item.name}</CardTitle>
                             <Link href={`/profile/${item.seller.substring(1)}`}>
                                <p className="text-sm text-muted-foreground hover:underline">Vendu par {item.seller}</p>
                             </Link>
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
