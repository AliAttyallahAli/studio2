
'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDown, ArrowUp, QrCode, Repeat, Copy, ShieldAlert } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PinDialog } from '@/components/PinDialog';
import { PinSetup } from '@/components/PinSetup';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


const walletData = {
    sahel: { balance: '1250.75 SAHEL', address: '0xSHEL123abc456def789ghi012jkl345mno' },
    privateKey: '0xprivkey_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6',
    accessKey: 'zoudou-access-key-gamma-7-zeta-9',
    tokens: [
        { name: 'Z-Immo', balance: '50.00 ZIM', address: '0xZIM456def789ghi012jkl345mno456def' },
        { name: 'EcoToken', balance: '10,000.00 ECO', address: '0xECO789ghi012jkl345mno456def789ghi' },
    ]
};

const transactions = [
    { id: 'tx1', type: 'reçu', amount: '+ 50.25 SAHEL', from: 'de @user123', date: 'Aujourd\'hui', icon: ArrowDown },
    { id: 'tx2', type: 'swap', amount: '- 100.00 SAHEL', from: 'pour 10000.00 ECO', date: 'Hier', icon: Repeat },
    { id: 'tx3', type: 'envoyé', amount: '- 10.00 ZIM', from: 'à @market', date: 'Hier', icon: ArrowUp },
    { id: 'tx4', type: 'récompense', amount: '+ 2.50 SAHEL', from: 'Minage quotidien', date: 'Hier', icon: ArrowDown },
];


function AddressRow({ address }: { address: string }) {
    const { toast } = useToast();
    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        toast({ title: 'Copié!', description: 'L\'adresse a été copiée dans le presse-papiers.'});
    }
    return (
        <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
            <p className="text-sm font-mono text-primary flex-grow truncate">{address}</p>
            <Button variant="ghost" size="icon" onClick={copyAddress}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function WalletPage() {
  const [pinState, setPinState] = useState<'checking' | 'setup' | 'locked' | 'unlocked'>('checking');
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const pinIsSet = localStorage.getItem('pin_is_set') === 'true';
    if (pinIsSet) {
      setPinState('locked');
    } else {
      setPinState('setup');
    }
  }, []);

  const handlePinSuccess = () => {
    setPinState('unlocked');
  }
  
  const handlePinSetupSuccess = () => {
     localStorage.setItem('pin_is_set', 'true');
     setPinState('unlocked');
  }
  
  const handleConfirmSend = () => {
    setShowSendDialog(false);
    toast({
        title: 'Envoi Confirmé',
        description: 'Votre transaction a été soumise au réseau.'
    });
  }

  const handleRevealInfo = () => {
    setShowSensitiveInfo(true);
  }

  if (pinState === 'checking') {
    return <AppLayout><div className="flex items-center justify-center h-full">Chargement...</div></AppLayout>;
  }

  if (pinState === 'setup') {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-full">
                <PinSetup onPinSetupSuccess={handlePinSetupSuccess} />
            </div>
        </AppLayout>
    );
  }

  if (pinState === 'locked') {
    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-full">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Portefeuille Verrouillé</CardTitle>
                        <CardDescription>Veuillez entrer votre code PIN pour accéder à votre portefeuille.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Dialog open={true} onOpenChange={() => {}}>
                          <DialogContent onInteractOutside={(e) => e.preventDefault()} className="sm:max-w-sm">
                               <PinDialog onPinSuccess={handlePinSuccess} isTrigger={false} />
                          </DialogContent>
                       </Dialog>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
          <Card>
              <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                          <CardTitle>Mon Portefeuille Multichain</CardTitle>
                          <CardDescription>Solde total estimé : <span className="font-bold text-primary">$1,850.50 USD</span></CardDescription>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                           <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
                               <DialogTrigger asChild>
                                   <Button className="flex-1 md:flex-auto">
                                        <ArrowUp className="mr-2 h-4 w-4"/>Envoyer
                                   </Button>
                               </DialogTrigger>
                               <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Envoyer des Actifs</DialogTitle>
                                        <DialogDescription>Envoyer des SAHEL ou des tokens.</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="asset-select">Actif à envoyer</Label>
                                            <Select>
                                                <SelectTrigger id="asset-select">
                                                    <SelectValue placeholder="Sélectionnez un actif" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sahel">SAHEL Coin</SelectItem>
                                                    <SelectItem value="z-immo">Z-Immo Token</SelectItem>
                                                    <SelectItem value="eco">EcoToken</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="recipient">Adresse ou @utilisateur du destinataire</Label>
                                            <Input id="recipient" placeholder="@utilisateur ou 0x..." />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Montant</Label>
                                            <Input id="amount" type="number" placeholder="0.00" />
                                        </div>
                                        <PinDialog onPinSuccess={handleConfirmSend}>
                                            <Button className="w-full">Confirmer l'envoi</Button>
                                        </PinDialog>
                                    </div>
                                </DialogContent>
                           </Dialog>

                           <Dialog>
                                <DialogTrigger asChild>
                                     <Button className="flex-1 md:flex-auto" variant="outline">
                                        <ArrowDown className="mr-2 h-4 w-4"/>Recevoir
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>QR Code de Réception</DialogTitle>
                                        <DialogDescription>
                                            Scannez ce code pour envoyer des fonds à l'adresse : <br />
                                            <span className="font-mono text-xs break-all">{walletData.sahel.address}</span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex justify-center p-4">
                                         <Link href={`/p2p?address=${walletData.sahel.address}`}>
                                            <div className="w-48 h-48 bg-white flex items-center justify-center cursor-pointer" data-ai-hint="QR code">
                                                <QrCode className="w-40 h-40 text-black" />
                                            </div>
                                         </Link>
                                    </div>
                                </DialogContent>
                           </Dialog>
                      </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <Tabs defaultValue="coins" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="coins">Coins</TabsTrigger>
                          <TabsTrigger value="tokens">Tokens</TabsTrigger>
                      </TabsList>
                      <TabsContent value="coins" className="mt-4">
                          <Card className="bg-secondary">
                              <CardHeader>
                                  <CardTitle className="text-lg">SAHEL Coin</CardTitle>
                                  <CardDescription>Le coin principal de l'écosystème</CardDescription>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-2xl font-bold text-primary">{walletData.sahel.balance}</p>
                                  <div className="mt-2">
                                      <Label className="text-xs">Votre adresse SAHEL</Label>
                                      <AddressRow address={walletData.sahel.address} />
                                  </div>
                              </CardContent>
                          </Card>
                      </TabsContent>
                      <TabsContent value="tokens" className="mt-4 space-y-4">
                         {walletData.tokens.map(token => (
                              <Card key={token.name} className="bg-secondary">
                                  <CardHeader>
                                      <CardTitle className="text-lg">{token.name}</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                      <p className="text-2xl font-bold">{token.balance}</p>
                                       <div className="mt-2">
                                          <Label className="text-xs">Votre adresse {token.name}</Label>
                                          <AddressRow address={token.address} />
                                      </div>
                                  </CardContent>
                              </Card>
                         ))}
                      </TabsContent>
                  </Tabs>
              </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Informations de Sécurité</CardTitle>
                <CardDescription>Accédez à vos clés privées et de récupération.</CardDescription>
            </CardHeader>
            <CardContent>
                {showSensitiveInfo ? (
                    <div className="space-y-4">
                        <Alert variant="destructive">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>Attention !</AlertTitle>
                            <AlertDescription>
                                Ne partagez jamais votre clé privée ou votre clé d'accès. Toute personne y ayant accès peut voler vos fonds.
                            </AlertDescription>
                        </Alert>

                         <div>
                            <Label>Adresse du Portefeuille</Label>
                            <AddressRow address={walletData.sahel.address} />
                        </div>
                        <div>
                            <Label>Clé Privée</Label>
                            <AddressRow address={walletData.privateKey} />
                        </div>
                        <div>
                            <Label>Clé d'Accès (Mot de passe de récupération)</Label>
                            <AddressRow address={walletData.accessKey} />
                        </div>

                        <Button variant="outline" onClick={() => setShowSensitiveInfo(false)}>Cacher les informations</Button>
                    </div>
                ) : (
                    <PinDialog onPinSuccess={handleRevealInfo}>
                        <Button variant="destructive">Révéler les informations sensibles</Button>
                    </PinDialog>
                )}
            </CardContent>
          </Card>


          <div>
              <h2 className="text-lg font-semibold mb-2">Historique des transactions</h2>
              <Card>
                  <CardContent className="p-0">
                      <ScrollArea className="h-64">
                      <div className="divide-y divide-border">
                          {transactions.map((tx) => (
                              <div key={tx.id} className="flex items-center p-4">
                                  <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${tx.amount.startsWith('+') ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
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
