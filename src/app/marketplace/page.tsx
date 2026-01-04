
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
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PinDialog } from '@/components/PinDialog';
import { useToast } from '@/hooks/use-toast';
import { updateSahelBalance, addFeeToCoreTeamWallet } from '@/lib/chat-data';

const initialMarketplaceItems = [
  { name: "Casque VR dernière génération", price: '150 SAHEL', image: 'https://picsum.photos/seed/vr/400/400', hint: 'vr headset', seller: '@user123', sellerAvatar: 'https://picsum.photos/seed/user123/100/100' },
  { name: "Formation Web3 complète", price: '85 SAHEL', image: 'https://picsum.photos/seed/web3/400/400', hint: 'online course', seller: '@tech_guru', sellerAvatar: 'https://picsum.photos/seed/guru/100/100' },
  { name: "Artwork NFT 'Sahel Spirit'", price: '500 ZIM', image: 'https://picsum.photos/seed/nftart/400/400', hint: 'abstract art', seller: '@crypto_queen', sellerAvatar: 'https://picsum.photos/seed/queen/100/100' },
  { name: "T-shirt 'SAHEL'", price: '25 ECO', image: 'https://picsum.photos/seed/tshirt/400/400', hint: 'branded t-shirt', seller: '@z_fashion', sellerAvatar: 'https://picsum.photos/seed/fashion/100/100' },
];

export default function MarketplacePage() {
    const { toast } = useToast();
    const [marketplaceItems, setMarketplaceItems] = useState(initialMarketplaceItems);
    const [openDialog, setOpenDialog] = useState(false);
    
    // State for the sell item form
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('SAHEL');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [isSellerActivated, setIsSellerActivated] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleListNewItem = () => {
         if (!name || !price || !image || !imagePreview) return;

        const newItem = {
            name: name,
            price: `${price} ${currency}`,
            image: imagePreview,
            hint: 'user item',
            seller: '@SahelUser',
            sellerAvatar: 'https://picsum.photos/seed/sahel/100/100'
        };
        setMarketplaceItems(prev => [newItem, ...prev]);
        setOpenDialog(false);
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setCurrency('SAHEL');
        setImage(null);
        setImagePreview(null);
        toast({ title: 'Article Mis en Vente', description: 'Votre article est maintenant visible sur le marché.' });
    }

    const handlePayFeeAndList = () => {
        const fee = 50;
        if (updateSahelBalance(-fee)) {
            addFeeToCoreTeamWallet(fee);
            setIsSellerActivated(true);
            toast({ title: 'Compte vendeur activé!', description: `${fee} SAHEL ont été déduits de votre solde et transférés à la Core Team.` });
            handleListNewItem();
        } else {
             toast({
                variant: 'destructive',
                title: 'Solde insuffisant',
                description: `Vous n'avez pas assez de SAHEL pour payer les frais de ${fee} SAHEL.`,
            });
        }
    };

    const handleAddNewItem = () => {
        if (isSellerActivated) {
            handleListNewItem();
        } else {
            // This will now be handled by the PinDialog logic which calls handlePayFeeAndList on success
            // For clarity, the function to call is handlePayFeeAndList
        }
    };

    const handleBuyItem = (itemName: string) => {
        toast({ title: 'Achat Réussi', description: `Vous avez acheté : ${itemName}.` });
    }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="text-left">
                <h1 className="text-3xl font-bold">Marché</h1>
                <p className="text-muted-foreground">Échangez vos coins et tokens contre des biens et services.</p>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        Mettre un article en vente
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Mettre un article en vente</DialogTitle>
                        {!isSellerActivated && (
                            <DialogDescription>
                                Remplissez les détails de votre article. Des frais de 50 SAHEL seront appliqués pour devenir vendeur.
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="item-name">Nom de l'article</Label>
                            <Input id="item-name" placeholder="Ex: Casque Audio Pro" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="item-description">Description</Label>
                            <Textarea id="item-description" placeholder="Décrivez votre article en quelques mots." value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                         <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="item-price">Prix</Label>
                                <Input id="item-price" type="number" placeholder="0.00" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="item-currency">Devise</Label>
                                 <Select value={currency} onValueChange={setCurrency}>
                                    <SelectTrigger id="item-currency">
                                        <SelectValue placeholder="Devise" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SAHEL">SAHEL</SelectItem>
                                        <SelectItem value="ZIM">ZIM</SelectItem>
                                        <SelectItem value="ECO">ECO</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="item-image">Image de l'article</Label>
                            <Input id="item-image" type="file" onChange={handleImageChange} accept="image/*" />
                            {imagePreview && <Image src={imagePreview} alt="Aperçu" width={100} height={100} className="rounded-md mt-2 object-cover" />}
                        </div>
                        
                        {!isSellerActivated && (
                            <Alert>
                                <AlertTitle>Frais de publication</AlertTitle>
                                <AlertDescription>
                                    Des frais uniques de <span className="font-bold text-primary">50 SAHEL</span> seront déduits de votre portefeuille pour l'activation de votre compte vendeur.
                                </AlertDescription>
                            </Alert>
                        )}
                        
                        {isSellerActivated ? (
                            <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleAddNewItem}>Mettre en vente</Button>
                        ) : (
                            <PinDialog onPinSuccess={handlePayFeeAndList}>
                                <Button className="w-full bg-accent hover:bg-accent/90">Mettre en vente et Payer les frais</Button>
                            </PinDialog>
                        )}

                    </div>
                </DialogContent>
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
                             <PinDialog onPinSuccess={() => handleBuyItem(item.name)}>
                                <Button className="w-full bg-accent hover:bg-accent/90">Acheter</Button>
                            </PinDialog>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
