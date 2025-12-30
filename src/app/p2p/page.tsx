
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

const buyOffers = [
    { user: 'CryptoKing', rate: '1.05 USD / SAHEL', available: '500 SAHEL', limits: '50 - 500 USD' },
    { user: 'SahelTrader', rate: '1.04 USD / SAHEL', available: '1,200 SAHEL', limits: '100 - 1,200 USD' },
    { user: 'ZoudouFan', rate: '1.03 USD / SAHEL', available: '250 SAHEL', limits: '20 - 250 USD' },
]

const sellOffers = [
    { user: 'P2P_Master', rate: '1.06 USD / SAHEL', available: '800 SAHEL', limits: '100 - 800 USD' },
    { user: 'QuickCash', rate: '1.07 USD / SAHEL', available: '300 SAHEL', limits: '50 - 300 USD' },
]


export default function P2PPage() {
    const { toast } = useToast();

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
                           <Input placeholder="Montant" className="max-w-xs"/>
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
                                        <TableCell className="text-primary font-semibold">{offer.rate}</TableCell>
                                        <TableCell>
                                            <div>{offer.available}</div>
                                            <div className="text-xs text-muted-foreground">{offer.limits}</div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <PinDialog onPinSuccess={() => handleTransaction('Acheter')}>
                                                <Button size="sm" variant="secondary">Acheter</Button>
                                            </PinDialog>
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
                                        <TableCell className="text-primary font-semibold">{offer.rate}</TableCell>
                                        <TableCell>
                                            <div>{offer.available}</div>
                                            <div className="text-xs text-muted-foreground">{offer.limits}</div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <PinDialog onPinSuccess={() => handleTransaction('Vendre')}>
                                                <Button size="sm" variant="destructive">Vendre</Button>
                                            </PinDialog>
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
