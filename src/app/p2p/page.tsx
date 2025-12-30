
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PinDialog } from '@/components/PinDialog';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const buyOffers = [
    { user: 'CryptoKing', rate: 1.05, available: 500, limits: {min: 50, max: 500} },
    { user: 'SahelTrader', rate: 1.04, available: 1200, limits: {min: 100, max: 1200} },
    { user: 'ZoudouFan', rate: 1.03, available: 250, limits: {min: 20, max: 250} },
]

const sellOffers = [
    { user: 'P2P_Master', rate: 1.06, available: 800, limits: {min: 100, max: 800} },
    { user: 'QuickCash', rate: 1.07, available: 300, limits: {min: 50, max: 300} },
]

type Offer = typeof buyOffers[0];

const P2PTransactionDialog = ({ offer, type, onTransactionSuccess }: { offer: Offer, type: 'Acheter' | 'Vendre', onTransactionSuccess: (type: 'Acheter' | 'Vendre') => void }) => {
    const [fiatAmount, setFiatAmount] = useState('');
    const [sahelAmount, setSahelAmount] = useState('');
    const [openPin, setOpenPin] = useState(false);

    const handleFiatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFiatAmount(value);
        if (value && !isNaN(Number(value))) {
            setSahelAmount((Number(value) / offer.rate).toFixed(6));
        } else {
            setSahelAmount('');
        }
    };

    const handleSahelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSahelAmount(value);
        if (value && !isNaN(Number(value))) {
            setFiatAmount((Number(value) * offer.rate).toFixed(2));
        } else {
            setFiatAmount('');
        }
    };
    
    const handleConfirm = () => {
        onTransactionSuccess(type);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{type} du SAHEL avec {offer.user}</DialogTitle>
                <DialogDescription>Taux : <span className="font-bold text-primary">{offer.rate} USD / SAHEL</span></DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="fiat-amount">Montant à {type === 'Acheter' ? 'payer' : 'recevoir'} (USD)</Label>
                    <Input id="fiat-amount" type="number" placeholder={`Min: ${offer.limits.min} USD`} value={fiatAmount} onChange={handleFiatChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sahel-amount">Montant à {type === 'Acheter' ? 'recevoir' : 'vendre'} (SAHEL)</Label>
                    <Input id="sahel-amount" type="number" placeholder={`Disponible: ${offer.available} SAHEL`} value={sahelAmount} onChange={handleSahelChange} />
                </div>
                <PinDialog onPinSuccess={handleConfirm}>
                    <Button className="w-full">{type} le SAHEL</Button>
                </PinDialog>
            </div>
        </DialogContent>
    );
};


export default function P2PPage() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const address = searchParams.get('address');
        if (address) {
            setSearchQuery(address);
        }
    }, [searchParams]);

    const handleTransaction = (type: 'Acheter' | 'Vendre') => {
        toast({
            title: 'Transaction Confirmée',
            description: `Votre ordre pour ${type.toLowerCase()} a été placé.`,
        });
    }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="text-left">
            <h1 className="text-3xl font-bold">Échange P2P</h1>
            <p className="text-muted-foreground">Achetez et vendez des SAHEL Coins directement avec d'autres utilisateurs.</p>
        </div>

        <Card>
            <CardContent className="p-4">
                 <Tabs defaultValue="buy" className="w-full">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <TabsList className="grid grid-cols-2 w-full md:w-auto">
                            <TabsTrigger value="buy">Acheter</TabsTrigger>
                            <TabsTrigger value="sell">Vendre</TabsTrigger>
                        </TabsList>
                        <div className="flex-grow flex items-center gap-2">
                           <Input 
                                placeholder="Montant ou addresse" 
                                className="max-w-xs"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                           />
                           <Select defaultValue="USD">
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="XAF">XAF</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button>Rechercher</Button>
                        </div>
                    </div>
                    
                    <TabsContent value="buy" className="mt-4">
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Annonceur</TableHead>
                                    <TableHead>Prix</TableHead>
                                    <TableHead>Disponible / Limites</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {buyOffers.map(offer => (
                                    <TableRow key={offer.user}>
                                        <TableCell className="font-medium">{offer.user}</TableCell>
                                        <TableCell className="text-primary font-semibold">{offer.rate} USD / SAHEL</TableCell>
                                        <TableCell>
                                            <div>{offer.available} SAHEL</div>
                                            <div className="text-xs text-muted-foreground">{offer.limits.min} - {offer.limits.max} USD</div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" variant="secondary">Acheter</Button>
                                                </DialogTrigger>
                                                <P2PTransactionDialog offer={offer} type="Acheter" onTransactionSuccess={handleTransaction} />
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                     <TabsContent value="sell" className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Annonceur</TableHead>
                                    <TableHead>Prix</TableHead>
                                    <TableHead>Disponible / Limites</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sellOffers.map(offer => (
                                    <TableRow key={offer.user}>
                                        <TableCell className="font-medium">{offer.user}</TableCell>
                                        <TableCell className="text-primary font-semibold">{offer.rate} USD / SAHEL</TableCell>
                                        <TableCell>
                                            <div>{offer.available} SAHEL</div>
                                            <div className="text-xs text-muted-foreground">{offer.limits.min} - {offer.limits.max} USD</div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                           <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" variant="destructive">Vendre</Button>
                                                </DialogTrigger>
                                                <P2PTransactionDialog offer={offer} type="Vendre" onTransactionSuccess={handleTransaction} />
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
