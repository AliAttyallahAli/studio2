
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDown, ArrowUp, QrCode, Repeat, KeyRound, Copy, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const hotWallet = {
    address: '0x4a7c7e5a3e1b9b8c6d4f5a3e1b9b8c6d4f5a3e1b',
    balance: '234.56 Z'
};

const coldWallet = {
    address: '0x9f8e7d6c5b4a3f2e1d9c8b7a6f5e4d3c2b1a9f8e',
    balance: '1,000.00 Z',
    privateKey: 'cold-wallet-private-key-example-never-share-this'
};

const transactions = [
    { type: 'reçu', amount: '+ 50.25 Z', from: 'de @user123', date: 'Aujourd\'hui', icon: ArrowDown },
    { type: 'envoyé', amount: '- 10.00 Z', from: 'à @market', date: 'Hier', icon: ArrowUp },
    { type: 'reçu', amount: '+ 2.50 Z', from: 'Minage quotidien', date: 'Hier', icon: ArrowDown },
];


function AddressRow({ address }: { address: string }) {
    return (
        <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
            <p className="text-sm font-mono text-primary flex-grow truncate">{address}</p>
            <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(address)}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    );
}

function PrivateKeyDialog({ privateKey }: { privateKey: string }) {
    const [showKey, setShowKey] = useState(false);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Clé Privée de votre Portefeuille Cold</DialogTitle>
                <DialogDescription>
                    Cette clé vous donne un accès total à vos fonds. Ne la partagez JAMAIS.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                 <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Danger ! N'exposez jamais cette clé.</AlertTitle>
                  <AlertDescription>
                    Toute personne ayant accès à cette clé privée peut voler vos actifs. Conservez-la en lieu sûr et hors ligne.
                  </AlertDescription>
                </Alert>
                <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
                    <p className="text-sm font-mono text-destructive flex-grow truncate">
                        {showKey ? privateKey : '************************************************'}
                    </p>
                    <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}>
                        {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                 <Button className="w-full" onClick={() => navigator.clipboard.writeText(privateKey)}>
                    <Copy className="mr-2 h-4 w-4"/> Copier la clé privée
                </Button>
            </div>
        </DialogContent>
    );
}

function QrDialog({ address }: { address: string }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>QR Code de Réception</DialogTitle>
                <DialogDescription>
                    Scannez ce code pour envoyer des fonds à l'adresse : <br />
                    <span className="font-mono text-xs break-all">{address}</span>
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
                <DialogDescription>Depuis votre portefeuille Hot.</DialogDescription>
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
      <Dialog onOpenChange={(open) => !open && setDialogContent(null)}>
        <div className="space-y-6">
            
            <Card>
                <CardHeader>
                    <CardTitle>Portefeuille Hot</CardTitle>
                    <CardDescription>Pour les transactions quotidiennes. Solde : <span className="font-bold text-primary">{hotWallet.balance}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Adresse de réception</Label>
                        <AddressRow address={hotWallet.address} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                         <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setDialogContent(<SendDialog />)}>
                                <ArrowUp className="mr-2 h-4 w-4"/>Envoyer
                            </Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setDialogContent(<QrDialog address={hotWallet.address} />)}>
                                <QrCode className="mr-2 h-4 w-4"/>Recevoir
                            </Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                           <Button variant="outline" onClick={() => setDialogContent(<ExchangeDialog />)}>
                                <Repeat className="mr-2 h-4 w-4"/>Échanger
                            </Button>
                        </DialogTrigger>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Portefeuille Cold</CardTitle>
                    <CardDescription>Pour le stockage sécurisé à long terme. Solde : <span className="font-bold text-primary">{coldWallet.balance}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Adresse de réception</Label>
                        <AddressRow address={coldWallet.address} />
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setDialogContent(<QrDialog address={coldWallet.address} />)}>
                                <QrCode className="mr-2 h-4 w-4"/>Recevoir
                            </Button>
                        </DialogTrigger>
                         <DialogTrigger asChild>
                            <Button variant="destructive" onClick={() => setDialogContent(<PrivateKeyDialog privateKey={coldWallet.privateKey}/>)}>
                                <KeyRound className="mr-2 h-4 w-4"/>Clé Privée
                            </Button>
                        </DialogTrigger>
                    </div>
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
        {dialogContent}
      </Dialog>
    </AppLayout>
  );
}
