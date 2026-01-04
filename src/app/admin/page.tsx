
'use client';

import { useState, useMemo, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, Copy, DollarSign, Users, Shield, ArrowDown, ArrowUp, Repeat, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { coreTeamWallet, addFeeToCoreTeamWallet, allChats, getUserProfile } from '@/lib/chat-data';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PinDialog } from '@/components/PinDialog';
import QRCode from "react-qr-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for KYC submissions - in a real app, this would come from a database
const kycSubmissions: { [key: string]: any } = {
    'test1@gmail.com': { kycStatus: 'Vérifié' },
    'test2@gmail.com': { kycStatus: 'En attente' },
    'test3@gmail.com': { kycStatus: 'Rejeté' },
};

const transactions = [
    { id: 'ctx1', type: 'frais', amount: '+ 50.00 SAHEL', from: 'Frais de vendeur de @SahelUser', date: 'Aujourd\'hui', icon: ArrowDown },
    { id: 'ctx2', type: 'frais', amount: '+ 30.00 SAHEL', from: 'Achat de carte de @Alice', date: 'Hier', icon: ArrowDown },
    { id: 'ctx3', type: 'frais', amount: '+ 0.001 SAHEL', from: 'Frais de transaction P2P', date: 'Hier', icon: ArrowDown },
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

const AddressRow = ({ address }: { address: string }) => {
    const { toast } = useToast();
    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        toast({ title: 'Copié!', description: 'L\'adresse a été copiée.' });
    }
    return (
        <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
            <p className="text-sm font-mono text-primary flex-grow truncate">{address}</p>
            <Button variant="ghost" size="icon" onClick={copyAddress}><Copy className="h-4 w-4" /></Button>
        </div>
    );
};

export default function AdminPage() {
    const router = useRouter();
    const { toast } = useToast();

    // States for wallet functionality
    const [showSendDialog, setShowSendDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [sendForm, setSendForm] = useState({ asset: 'SAHEL', recipient: '', amount: '' });
    const [currentWalletData, setCurrentWalletData] = useState(coreTeamWallet);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWalletData({ ...coreTeamWallet });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = new URL('/p2p', window.location.origin);
            url.searchParams.set('address', currentWalletData.address);
            setQrCodeValue(url.toString());
        }
    }, [currentWalletData.address]);
    
    const recentUsers = useMemo(() => Object.entries(kycSubmissions).map(([email, data]) => ({
        id: email, email, kycStatus: data.kycStatus
    })).slice(0, 3), []);

    const totalUsers = useMemo(() => allChats.length, []);

    const handleManageUser = (email: string) => {
        router.push(`/verification?email=${encodeURIComponent(email)}`);
    };

    const handleSendPinSuccess = () => {
        setShowSendDialog(false);
        const details: TransactionDetails = {
            sender: currentWalletData.address,
            receiver: sendForm.recipient,
            amount: sendForm.amount,
            asset: sendForm.asset,
            fee: "0.001",
            date: new Date().toLocaleString('fr-FR'),
            transactionId: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
        };
        setTransactionDetails(details);
        setShowConfirmDialog(true);
    };

    const handleConfirmSend = () => {
        setShowConfirmDialog(false);
        toast({ title: 'Envoi Confirmé', description: 'Votre transaction a été soumise.' });
        setSendForm({ asset: 'SAHEL', recipient: '', amount: '' });
    };

    const handleShowDetails = (tx: typeof transactions[0]) => {
         const [amount, asset] = tx.amount.replace('+ ', '').replace('- ', '').split(' ');
        const details: TransactionDetails = {
            sender: tx.from,
            receiver: currentWalletData.address,
            amount: amount,
            asset: asset,
            fee: '0.000',
            date: tx.date,
            transactionId: tx.id,
        };
        setTransactionDetails(details);
        setShowDetailsDialog(true);
    }

    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Solde Core Team</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentWalletData.balance.toLocaleString('fr-FR')} SAHEL</div>
                            <p className="text-xs text-muted-foreground mt-1">Solde total incluant les frais collectés</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Utilisateurs Total</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalUsers}</div>
                            <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Adresse du Portefeuille</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <AddressRow address={currentWalletData.address} />
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Portefeuille de la Core Team</CardTitle>
                        <CardDescription>Envoyez et recevez des fonds, consultez les soldes et l'historique.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex gap-2 mb-6">
                            <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
                                <DialogTrigger asChild>
                                    <Button className="flex-1"><ArrowUp className="mr-2 h-4 w-4" />Envoyer</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader><DialogTitle>Envoyer des Actifs</DialogTitle></DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="asset-select">Actif</Label>
                                            <Select value={sendForm.asset} onValueChange={(value) => setSendForm(prev => ({ ...prev, asset: value }))}><SelectTrigger id="asset-select"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="SAHEL">SAHEL</SelectItem></SelectContent></Select>
                                        </div>
                                        <div className="space-y-2"><Label htmlFor="recipient">Destinataire</Label><Input id="recipient" placeholder="@utilisateur ou 0x..." value={sendForm.recipient} onChange={(e) => setSendForm(prev => ({ ...prev, recipient: e.target.value }))} /></div>
                                        <div className="space-y-2"><Label htmlFor="amount">Montant</Label><Input id="amount" type="number" placeholder="0.00" value={sendForm.amount} onChange={(e) => setSendForm(prev => ({ ...prev, amount: e.target.value }))} /></div>
                                        <PinDialog onPinSuccess={handleSendPinSuccess}><Button className="w-full" disabled={!sendForm.recipient || !sendForm.amount}>Vérifier</Button></PinDialog>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild><Button className="flex-1" variant="outline"><ArrowDown className="mr-2 h-4 w-4" />Recevoir</Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader><DialogTitle>QR Code de Réception</DialogTitle></DialogHeader>
                                    <div className="flex justify-center p-4 bg-white rounded-md"><QRCode value={qrCodeValue} size={192} /></div>
                                    <p className="text-center text-sm">Scannez pour envoyer des fonds à la Core Team.</p>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Tabs defaultValue="coins" className="w-full">
                            <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="coins">Coins</TabsTrigger><TabsTrigger value="history">Historique</TabsTrigger></TabsList>
                            <TabsContent value="coins" className="mt-4"><Card className="bg-secondary"><CardHeader><CardTitle className="text-lg">SAHEL Coin</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-primary">{currentWalletData.balance.toFixed(2)} SAHEL</p></CardContent></Card></TabsContent>
                            <TabsContent value="history" className="mt-4">
                                <div className="space-y-2">
                                    {transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center p-3 rounded-md hover:bg-secondary">
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${tx.amount.startsWith('+') ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}><tx.icon className="w-4 h-4" /></div>
                                            <div className="flex-grow"><p className="font-semibold">{tx.amount}</p><p className="text-sm text-muted-foreground">{tx.from}</p></div>
                                            <div className="text-right flex items-center gap-2"><p className="text-xs text-muted-foreground">{tx.date}</p><Button variant="ghost" size="icon" onClick={() => handleShowDetails(tx)}><MoreHorizontal className="h-4 w-4" /></Button></div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {transactionDetails && (
                    <>
                        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                           <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Détails de la Transaction</DialogTitle>
                                    <DialogDescription>Veuillez vérifier les détails de la transaction.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4 text-sm">
                                    <div className="flex justify-between items-center"><span className="text-muted-foreground">De:</span><span className="font-mono truncate max-w-[50%]">{transactionDetails.sender}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-muted-foreground">À:</span><span className="font-mono truncate max-w-[50%]">{transactionDetails.receiver}</span></div>
                                    <div className="flex justify-between items-center font-semibold text-lg text-primary"><span>Montant:</span><span>{transactionDetails.amount} {transactionDetails.asset}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Frais de réseau:</span><span>{transactionDetails.fee} SAHEL</span></div>
                                    <div className="flex flex-col gap-1 pt-2 border-t"><span className="text-muted-foreground text-xs">ID de Transaction:</span><span className="font-mono text-xs break-all">{transactionDetails.transactionId}</span></div>
                                </div>
                                <Button onClick={handleConfirmSend} className="w-full">Confirmer et Envoyer</Button>
                           </DialogContent>
                        </Dialog>

                        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Détails de la Transaction</DialogTitle>
                                    <DialogDescription>Veuillez vérifier les détails de la transaction.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4 text-sm">
                                    <div className="flex justify-between items-center"><span className="text-muted-foreground">De:</span><span className="font-mono truncate max-w-[50%]">{transactionDetails.sender}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-muted-foreground">À:</span><span className="font-mono truncate max-w-[50%]">{transactionDetails.receiver}</span></div>
                                    <div className="flex justify-between items-center font-semibold text-lg text-primary"><span>Montant:</span><span>{transactionDetails.amount} {transactionDetails.asset}</span></div>
                                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Frais de réseau:</span><span>{transactionDetails.fee} SAHEL</span></div>
                                    <div className="flex flex-col gap-1 pt-2 border-t"><span className="text-muted-foreground text-xs">ID de Transaction:</span><span className="font-mono text-xs break-all">{transactionDetails.transactionId}</span></div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Gestion des Utilisateurs</CardTitle>
                        <CardDescription>Consulter et gérer les vérifications KYC/KYB.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Statut KYC</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                user.kycStatus === 'Vérifié' ? 'bg-green-900/50 text-green-400' :
                                                user.kycStatus === 'En attente' ? 'bg-yellow-900/50 text-yellow-400' :
                                                'bg-red-900/50 text-red-400'
                                            }`}>{user.kycStatus}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleManageUser(user.email)}>Gérer <ArrowUpRight className="h-4 w-4 ml-2" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
