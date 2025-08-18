'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDown, ArrowUp, QrCode, Repeat, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const transactions = [
    { type: 'reçu', amount: '+ 50.25 Z', from: 'de @user123', date: 'Aujourd\'hui', icon: ArrowDown },
    { type: 'envoyé', amount: '- 10.00 Z', from: 'à @market', date: 'Hier', icon: ArrowUp },
    { type: 'reçu', amount: '+ 2.50 Z', from: 'Minage quotidien', date: 'Hier', icon: ArrowDown },
];

function QrDialog() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Votre QR Code</DialogTitle>
                <DialogDescription>
                    Partagez ce code pour recevoir des tokens Z.
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center p-4">
                 <div className="w-48 h-48 bg-white flex items-center justify-center" data-ai-hint="QR code">
                    <QrCode className="w-40 h-40 text-black" />
                 </div>
            </div>
        </DialogContent>
    );
}

function SendDialog() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Envoyer des Tokens Z</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="recipient">Adresse ou @utilisateur du destinataire</Label>
                    <Input id="recipient" placeholder="@utilisateur ou 0x..." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="amount">Montant</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">Envoyer</Button>
            </div>
        </DialogContent>
    );
}

const gsmOperators: Record<string, string[]> = {
    'Cameroun': ['MTN', 'Orange', 'Nexttel', 'Camtel'],
    'Gabon': ['Airtel', 'Moov'],
    'Congo-Brazzaville': ['MTN', 'Airtel'],
    'Tchad': ['Airtel', 'Moov'],
    'République Centrafricaine': ['Orange', 'Telecel', 'Moov'],
    'Guinée Équatoriale': ['Orange', 'MTN', 'Getesa'],
    'Nigeria': ['MTN', 'Airtel', 'Glo', '9mobile'],
    'Ghana': ['MTN', 'Vodafone', 'AirtelTigo'],
    'Côte d\'Ivoire': ['Orange', 'MTN', 'Moov'],
    'Sénégal': ['Orange', 'Free', 'Expresso'],
};

function ExchangeDialog() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [operators, setOperators] = useState<string[]>([]);

    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
        setOperators(gsmOperators[country] || []);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Échanger Z contre du Crédit GSM</DialogTitle>
                <DialogDescription>
                    Sélectionnez le pays et l'opérateur, puis entrez le numéro.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                     <Select onValueChange={handleCountryChange}>
                        <SelectTrigger id="country">
                            <SelectValue placeholder="Sélectionnez un pays" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(gsmOperators).map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 {selectedCountry && (
                    <div className="space-y-2">
                        <Label htmlFor="operator">Opérateur</Label>
                        <Select>
                            <SelectTrigger id="operator">
                                <SelectValue placeholder="Sélectionnez un opérateur" />
                            </SelectTrigger>
                            <SelectContent>
                                {operators.map(operator => (
                                    <SelectItem key={operator} value={operator}>{operator}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input id="phone" placeholder="+237..." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="amount-exchange">Montant en Z à échanger</Label>
                    <Input id="amount-exchange" type="number" placeholder="0.00" />
                </div>
                <p className="text-sm text-muted-foreground">Taux de change : 1 Z = 500 XAF</p>
                <Button className="w-full bg-accent hover:bg-accent/90" disabled={!selectedCountry}>Échanger</Button>
            </div>
        </DialogContent>
    );
}

export default function WalletPage() {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null);

  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="text-center">
            <CardHeader>
                <CardDescription>Solde Total</CardDescription>
                <CardTitle className="text-5xl font-bold">
                    1,234.56 Z
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Dialog onOpenChange={(open) => !open && setDialogContent(null)}>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                        <DialogTrigger asChild>
                            <button onClick={() => setDialogContent(<SendDialog />)} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-secondary">
                                <ArrowUp className="w-5 h-5"/>
                                <span>Envoyer</span>
                            </button>
                        </DialogTrigger>
                         <DialogTrigger asChild>
                            <button onClick={() => setDialogContent(<QrDialog />)} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-secondary">
                                <ArrowDown className="w-5 h-5"/>
                                <span>Recevoir</span>
                            </button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                           <button onClick={() => setDialogContent(<ExchangeDialog />)} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-secondary">
                                <Repeat className="w-5 h-5"/>
                                <span>Échanger</span>
                            </button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <button onClick={() => setDialogContent(<QrDialog />)} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-secondary">
                                <QrCode className="w-5 h-5"/>
                                <span>QR Code</span>
                            </button>
                        </DialogTrigger>
                    </div>
                     {dialogContent}
                </Dialog>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-lg font-semibold mb-2">Historique des transactions</h2>
            <Card>
                <CardContent className="p-0">
                    <ScrollArea className="h-64">
                    <div className="divide-y divide-border">
                        {transactions.map((tx, index) => (
                            <div key={index} className="flex items-center p-4">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${tx.type === 'reçu' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                                    <tx.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{tx.amount}</p>
                                    <p className="text-sm text-muted-foreground">{tx.from}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
