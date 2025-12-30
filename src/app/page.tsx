
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@/components/ui/circular-progress';

const workers = [
  { id: 'worker-001', name: 'RIG-01', status: 'En ligne', hashRate: '72 TH/s', temp: '65°C', uptime: '24h' },
  { id: 'worker-002', name: 'RIG-02', status: 'En ligne', hashRate: '70 TH/s', temp: '68°C', uptime: '24h' },
  { id: 'worker-003', name: 'RIG-03', status: 'Hors ligne', hashRate: '0 TH/s', temp: '-', uptime: '0h' },
]

const recentTransactions = [
    {id: 'tx-1', type: 'Récompense de minage', amount: '+0.005 SAHEL', date: '2024-07-07 14:30'},
    {id: 'tx-2', type: 'Transfert P2P', amount: '-10 SAHEL', date: '2024-07-06 10:00'},
    {id: 'tx-3', type: 'Récompense de minage', amount: '+0.0048 SAHEL', date: '2024-07-05 14:25'},
]

export default function MiningPage() {
    const [timeRemaining, setTimeRemaining] = useState(15 * 3600 + 45 * 60 + 22); // 15h 45m 22s in seconds
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalDuration = 24 * 3600; // 24 hours in seconds
        const initialProgress = ((totalDuration - timeRemaining) / totalDuration) * 100;
        setProgress(initialProgress);

        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                const newTime = prevTime - 1;
                const newProgress = ((totalDuration - newTime) / totalDuration) * 100;
                setProgress(newProgress);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };


  return (
    <AppLayout>
      <div className="space-y-6">
        
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Session de Minage Quotidienne</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="relative w-40 h-40">
                <CircularProgress value={progress} strokeWidth={10} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-primary">{formatTime(timeRemaining)}</p>
                    <p className="text-xs text-muted-foreground">Restant</p>
                </div>
            </div>
            <div className="flex-grow">
              <p className="font-bold text-2xl">Minage Actif</p>
              <p className="text-muted-foreground">Taux de base : +0.1 SAHEL/h</p>
               <Button size="lg" className="bg-primary hover:bg-primary/90 mt-4 w-full sm:w-auto">Arrêter le minage</Button>
            </div>
          </CardContent>
        </Card>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Solde SAHEL (en attente)</CardTitle>
              <CardDescription>Coins minés non vérifiés (KYC requis)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">12.50 SAHEL</p>
              <p className="text-xs text-muted-foreground mt-1">Sera transféré à votre wallet après KYC.</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Hash Rate Actuel</CardTitle>
              <CardDescription>Performance globale</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">142 TH/s</p>
               <p className="text-xs text-muted-foreground mt-1">+2.1% depuis hier</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Statut des Workers</CardTitle>
              <CardDescription>Aperçu de vos équipements</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-green-400">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        <div>
                            <p className="font-bold">2</p>
                            <p className="text-xs">En ligne</p>
                        </div>
                    </div>
                     <div className="flex items-center text-red-400">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                         <div>
                            <p className="font-bold">1</p>
                            <p className="text-xs">Hors ligne</p>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Workers</CardTitle>
                    <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Hash Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workers.map(worker => (
                                <TableRow key={worker.id}>
                                    <TableCell className="font-medium">{worker.name}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            worker.status === 'En ligne' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                                        }`}>
                                            {worker.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{worker.hashRate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Transactions Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentTransactions.map(tx => (
                            <div key={tx.id} className="flex items-center">
                                <div className="flex-grow">
                                    <p className="font-semibold">{tx.type}</p>
                                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                                </div>
                                <p className={`font-mono text-sm ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-foreground'}`}>{tx.amount}</p>
                            </div>
                        ))}
                    </div>
                     <Button variant="outline" className="w-full mt-4">
                        Voir tout <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        </div>


      </div>
    </AppLayout>
  );
}
