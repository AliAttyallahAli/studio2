
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Download, Handshake, CreditCard } from 'lucide-react';
import QRCode from 'react-qr-code';
import { walletData, updateSahelBalance, addFeeToCoreTeamWallet } from '@/lib/chat-data';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { PinDialog } from '@/components/PinDialog';
import { useToast } from '@/hooks/use-toast';


const currentUser = {
    name: 'Sahel User',
    username: 'saheluser',
    accountNumber: '4000 1234 5678 9010', // Example account number
    validThru: '12/28',
    cvv: '123'
};

const VisaCard = React.forwardRef<HTMLDivElement, { p2pUrl: string }>((props, ref) => {
    const { p2pUrl } = props;

    return (
        <div ref={ref} className="w-[350px] h-[220px] bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-xl p-6 flex flex-col justify-between shadow-lg text-gray-800 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-12 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <Handshake className="w-8 h-8 text-black" />
                    <span className="text-xl font-bold text-black">SAHEL</span>
                </div>
                <svg viewBox="0 0 75 25" className="h-8 w-auto">
                    <path d="M20.25,0 L20.25,0.11 C19.38,0.36 18.73,1.06 18.73,1.96 C18.73,2.05 18.74,2.14 18.76,2.23 L14.73,15.60 L10.69,2.23 C10.67,2.14 10.66,2.05 10.66,1.96 C10.66,1.06 10.01,0.36 9.14,0.11 L9.14,0 L0,0 L0,0.11 C0.85,0.35 1.5,1.06 1.5,1.96 C1.5,2.05 1.49,2.14 1.47,2.23 L6.85,24.81 L12.58,24.81 L22.68,2.23 C22.69,2.14 22.7,2.05 22.7,1.96 C22.7,1.06 22.05,0.35 21.2,0.11 L21.2,0 L20.25,0 Z M33.15,0 L26.33,24.81 L32.33,24.81 L39.15,0 L33.15,0 Z M49.19,0 L42.37,24.81 L48.37,24.81 L49.6,20.89 L56.32,20.89 L57.55,24.81 L63.55,24.81 L56.73,0 L49.19,0 Z M50.8,15.82 L53.05,8.81 L55.3,15.82 L50.8,15.82 Z M75,1.96 C75,1.06 74.35,0.35 73.5,0.11 L73.5,0 L65.95,0 L66.01,0.23 C66.01,0.23 68.17,9.75 68.17,9.75 C68.17,9.75 69.1,4.71 69.1,4.71 C69.1,4.71 69.1,4.68 69.12,4.65 C69.45,3.31 70.4,2.54 71.55,2.54 C72.13,2.54 72.88,2.83 73.35,3.48 C73.54,3.71 73.7,3.98 73.81,4.27 L74.22,3.01 C74.31,2.65 74.62,2.23 75,1.96" fill="#00529F"/>
                    <path d="M7,24.81 L12.73,24.81 L22.83,2.23 C22.84,2.14 22.85,2.05 22.85,1.96 C22.85,1.06 22.2,0.35 21.35,0.11 L21.35,0 L13.5,0 L13.5,0.11 C14.38,0.36 15.03,1.06 15.03,1.96 C15.03,2.05 15.02,2.14 15,2.23 L7,24.81 Z" fill="#F7A600"/>
                </svg>
            </div>
            <div className="text-center font-mono text-xl tracking-widest">{currentUser.accountNumber}</div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs">Valide Fin</p>
                    <p className="font-semibold">{currentUser.validThru}</p>
                    <p className="font-semibold text-lg uppercase tracking-wider">{currentUser.name}</p>
                </div>
                <div className="bg-white p-1 rounded-md">
                    {p2pUrl ? <QRCode value={p2pUrl} size={50} /> : <div className="w-[50px] h-[50px] bg-gray-200 animate-pulse" />}
                </div>
            </div>
        </div>
    );
});
VisaCard.displayName = 'VisaCard';

const VisaCardBack = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className="w-[350px] h-[220px] bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-xl shadow-lg text-gray-800 flex flex-col justify-between">
            <div className="h-12 bg-black mt-6"></div>
            <div className="px-6 py-4 flex items-center gap-4">
                <div className="bg-white h-8 flex-grow rounded-sm flex items-end justify-end italic pr-2 text-sm">
                    {currentUser.name}
                </div>
                <div className="font-mono bg-white px-2 py-1 rounded-sm text-lg">
                    {currentUser.cvv}
                </div>
            </div>
            <div className="px-6 pb-4 text-xs text-black/60">
                <p>This card is issued by SAHEL DEFI Bank. Use of this card is subject to the terms and conditions of the Cardholder Agreement. Not for resale. For assistance, visit sahel.app.</p>
            </div>
        </div>
    );
});
VisaCardBack.displayName = 'VisaCardBack';

export default function CardPage() {
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const [p2pUrl, setP2pUrl] = useState('');
    const [isCardPurchased, setIsCardPurchased] = useState<boolean | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const purchaseStatus = localStorage.getItem('sahel_card_purchased') === 'true';
        setIsCardPurchased(purchaseStatus);

        if (purchaseStatus) {
            const url = `${window.location.origin}/p2p?address=${walletData.sahel.address}`;
            setP2pUrl(url);
        }
    }, []);

    const handlePurchaseCard = () => {
        const fee = 30;
        updateSahelBalance(-fee);
        addFeeToCoreTeamWallet(fee);
        localStorage.setItem('sahel_card_purchased', 'true');
        setIsCardPurchased(true);
        toast({ title: 'Achat réussi !', description: `Votre carte SAHEL est activée. ${fee} SAHEL ont été déduits.` });
        
        // Set P2P URL after purchase
        const url = `${window.location.origin}/p2p?address=${walletData.sahel.address}`;
        setP2pUrl(url);
    };

    const downloadCardAsPdf = () => {
        if (cardContainerRef.current) {
            html2canvas(cardContainerRef.current, { backgroundColor: null }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [370, 480]
                });
                pdf.addImage(imgData, 'PNG', 10, 10, 350, 460);
                pdf.save('sahel-card.pdf');
            });
        }
    };

    if (isCardPurchased === null) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center h-full">
                    <p>Chargement...</p>
                </div>
            </AppLayout>
        );
    }

    if (!isCardPurchased) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center h-full">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Activer votre Carte SAHEL</CardTitle>
                            <CardDescription>Obtenez votre carte virtuelle pour des transactions simplifiées.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <CreditCard className="h-4 w-4" />
                                <AlertTitle>Frais d'activation uniques</AlertTitle>
                                <AlertDescription>
                                    Pour obtenir votre carte, des frais de <span className="font-bold text-primary">30 SAHEL</span> seront déduits de votre portefeuille.
                                </AlertDescription>
                            </Alert>
                            <PinDialog onPinSuccess={handlePurchaseCard}>
                                <Button className="w-full bg-accent hover:bg-accent/90">Acheter ma carte</Button>
                            </PinDialog>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="space-y-6 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Votre Carte SAHEL</h1>
                    <p className="text-muted-foreground">Voici votre carte virtuelle. Téléchargez-la en PDF.</p>
                </div>
                
                <div ref={cardContainerRef} className="space-y-5">
                    <VisaCard p2pUrl={p2pUrl} />
                    <VisaCardBack />
                </div>

                <Button onClick={downloadCardAsPdf}>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger la carte (Recto/Verso)
                </Button>
            </div>
        </AppLayout>
    );
}

    