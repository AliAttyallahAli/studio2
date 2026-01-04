
'use client';

import { useState, useEffect, useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Repeat, Copy, ShieldAlert, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
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
import { walletData, addFeeToCoreTeamWallet } from '@/lib/chat-data';
import QRCode from "react-qr-code";


const transactions = [
    { id: 'tx1', type: 'reçu', amount: '+ 50.25 SAHEL', from: 'de @user123', to: '@SahelUser', date: 'Aujourd\'hui', icon: ArrowDown, fee: '0.001' },
    { id: 'tx2', type: 'swap', amount: '- 100.00 SAHEL', from: 'pour 10000.00 ECO', to: 'DEX', date: 'Hier', icon: Repeat, fee: '0.002' },
    { id: 'tx3', type: 'envoyé', amount: '- 10.00 ZIM', from: '@SahelUser', to: 'à @market', date: 'Hier', icon: ArrowUp, fee: '0.0005' },
    { id: 'tx4', type: 'récompense', amount: '+ 2.50 SAHEL', from: 'Minage quotidien', to: '@SahelUser', date: 'Hier', icon: ArrowDown, fee: '0.000' },
];

type TransactionDetails = {
    sender: string;
    receiver: string;
    amount: string;
    asset: string;
    fee: string;
    date: string;
    transactionId: string;
};

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

const TransactionConfirmationDialog = ({ details, onConfirm, showConfirmButton = true }: { details: TransactionDetails, onConfirm?: () => void, showConfirmButton?: boolean }) => (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Détails de la Transaction</DialogTitle>
            <DialogDescription>Veuillez vérifier les détails de la transaction.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date et Heure:</span>
                <span>{details.date}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-muted-foreground">De (Expéditeur):</span>
                <span className="font-mono truncate max-w-[50%]">{details.sender}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-muted-foreground">À (Destinataire):</span>
                <span className="font-mono truncate max-w-[50%]">{details.receiver}</span>
            </div>
             <div className="flex justify-between items-center font-semibold text-lg text-primary">
                <span>Montant:</span>
                <span>{details.amount} {details.asset}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Frais de réseau (estim.):</span>
                <span>{details.fee} SAHEL</span>
            </div>
            <div className="flex flex-col gap-1 pt-2 border-t">
                <span className="text-muted-foreground text-xs">ID de Transaction:</span>
                <span className="font-mono text-xs break-all">{details.transactionId}</span>
            </div>
        </div>
         {showConfirmButton && onConfirm && <Button onClick={onConfirm} className="w-full">Confirmer et Envoyer</Button>}
    </DialogContent>
);


export default function WalletPage() {
  const [pinState, setPinState] = useState<'checking' | 'setup' | 'locked' | 'unlocked'>('checking');
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [qrCodeValue, setQrCodeValue] = useState('');

  const [sendForm, setSendForm] = useState({ asset: 'SAHEL', recipient: '', amount: '' });
  
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const { toast } = useToast();
  
  // Use a state to be able to re-render when balance changes
  const [currentWalletData, setCurrentWalletData] = useState(walletData);

  useEffect(() => {
    const pinIsSet = localStorage.getItem('pin_is_set') === 'true';
    if (pinIsSet) {
      setPinState('locked');
    } else {
      setPinState('setup');
    }
    
    if (typeof window !== 'undefined') {
        const url = new URL('/p2p', window.location.origin);
        url.searchParams.set('address', currentWalletData.sahel.address);
        setQrCodeValue(url.toString());
    }
  }, [currentWalletData.sahel.address]);
  
   // This effect will re-sync the component state if the global data changes
   // This is a simple way to propagate state changes without a full state management library
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentWalletData({...walletData});
     }, 500); // Check for updates periodically
     return () => clearInterval(interval);
   }, []);
   
   const totalBalanceUSD = useMemo(() => {
        const rates = {
            SAHEL: 1.05,
            ZIM: 0.10,
            ECO: 0.01
        };

        let total = 0;
        
        // Sahel balance
        total += currentWalletData.sahel.balance * rates.SAHEL;

        // Tokens balance
        currentWalletData.tokens.forEach(token => {
            const [amountStr, ticker] = token.balance.split(' ');
            const amount = parseFloat(amountStr);
            const rate = rates[ticker as keyof typeof rates];
            if (amount && rate) {
                total += amount * rate;
            }
        });

        return total;
   }, [currentWalletData]);

  const handlePinSuccess = () => {
    setPinState('unlocked');
  }
  
  const handlePinSetupSuccess = () => {
     localStorage.setItem('user_pin', 'true');
     setPinState('unlocked');
  }

  const handleSendPinSuccess = () => {
    setShowSendDialog(false);
    const fee = 0.001; // Example fee
    const details: TransactionDetails = {
        sender: currentWalletData.sahel.address,
        receiver: sendForm.recipient,
        amount: sendForm.amount,
        asset: sendForm.asset,
        fee: fee.toString(),
        date: new Date().toLocaleString('fr-FR'),
        transactionId: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
    };
    setTransactionDetails(details);
    setShowConfirmDialog(true);
  }
  
  const handleConfirmSend = () => {
    setShowConfirmDialog(false);
    
    if (transactionDetails) {
        const fee = parseFloat(transactionDetails.fee);
        if (!isNaN(fee)) {
            addFeeToCoreTeamWallet(fee);
        }
    }

    toast({
        title: 'Envoi Confirmé',
        description: 'Votre transaction a été soumise au réseau.'
    });
    // Reset form
    setSendForm({ asset: 'SAHEL', recipient: '', amount: '' });
  }

  const handleRevealInfo = () => {
    setShowSensitiveInfo(true);
  }

  const handleShowDetails = (tx: typeof transactions[0]) => {
    const [amount, asset] = tx.amount.replace('+ ', '').replace('- ', '').split(' ');
    const details: TransactionDetails = {
        sender: tx.type === 'reçu' || tx.type === 'récompense' ? tx.from.replace('de ', '') : currentWalletData.sahel.address,
        receiver: tx.type === 'envoyé' ? tx.to.replace('à ', '') : currentWalletData.sahel.address,
        amount: amount,
        asset: asset,
        fee: tx.fee,
        date: tx.date,
        transactionId: tx.id,
    };
    setTransactionDetails(details);
    setShowDetailsDialog(true);
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
                          <CardDescription>Solde total estimé : <span className="font-bold text-primary">${totalBalanceUSD.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span></CardDescription>
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
                                            <Select value={sendForm.asset} onValueChange={(value) => setSendForm(prev => ({ ...prev, asset: value }))}>
                                                <SelectTrigger id="asset-select">
                                                    <SelectValue placeholder="Sélectionnez un actif" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SAHEL">SAHEL Coin</SelectItem>
                                                    {currentWalletData.tokens.map(t => (
                                                        <SelectItem key={t.name} value={t.balance.split(' ')[1]}>{t.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="recipient">Adresse ou @utilisateur du destinataire</Label>
                                            <Input id="recipient" placeholder="@utilisateur ou 0x..." value={sendForm.recipient} onChange={(e) => setSendForm(prev => ({...prev, recipient: e.target.value}))} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Montant</Label>
                                            <Input id="amount" type="number" placeholder="0.00" value={sendForm.amount} onChange={(e) => setSendForm(prev => ({...prev, amount: e.target.value}))} />
                                        </div>
                                        <PinDialog onPinSuccess={handleSendPinSuccess}>
                                            <Button className="w-full" disabled={!sendForm.recipient || !sendForm.amount}>Vérifier et Envoyer</Button>
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
                                            <span className="font-mono text-xs break-all">{currentWalletData.sahel.address}</span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex justify-center p-4 bg-white rounded-md">
                                        {qrCodeValue && (
                                            <QRCode
                                                value={qrCodeValue}
                                                size={192}
                                                bgColor="#FFFFFF"
                                                fgColor="#000000"
                                                level="L"
                                            />
                                        )}
                                    </div>
                                    <Link href={qrCodeValue} className="text-center text-sm text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                        Ouvrir le lien P2P
                                    </Link>
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
                                  <p className="text-2xl font-bold text-primary">{currentWalletData.sahel.balance.toFixed(2)} SAHEL</p>
                                  <div className="mt-2">
                                      <Label className="text-xs">Votre adresse SAHEL</Label>
                                      <AddressRow address={currentWalletData.sahel.address} />
                                  </div>
                              </CardContent>
                          </Card>
                      </TabsContent>
                      <TabsContent value="tokens" className="mt-4 space-y-4">
                         {currentWalletData.tokens.map(token => (
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

            {transactionDetails && (
                <>
                    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                        <TransactionConfirmationDialog details={transactionDetails} onConfirm={handleConfirmSend} />
                    </Dialog>
                    <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                        <TransactionConfirmationDialog details={transactionDetails} showConfirmButton={false} />
                    </Dialog>
                </>
            )}


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
                            <AddressRow address={currentWalletData.sahel.address} />
                        </div>
                        <div>
                            <Label>Clé Privée</Label>
                            <AddressRow address={currentWalletData.privateKey} />
                        </div>
                        <div>
                            <Label>Clé d'Accès (Mot de passe de récupération)</Label>
                            <AddressRow address={currentWalletData.accessKey} />
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
                                  <div className="text-right flex items-center gap-2">
                                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                                       <Button variant="ghost" size="icon" onClick={() => handleShowDetails(tx)}>
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
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
