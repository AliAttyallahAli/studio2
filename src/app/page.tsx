
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle2, ChevronRight, RefreshCw, Play, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { useRouter } from 'next/navigation';

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

const TOTAL_DURATION = 24 * 3600; // 24 hours in seconds
const MINING_SESSION_START_KEY = 'mining_session_start_time';

export default function MiningPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMining, setIsMining] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(TOTAL_DURATION);
    const [progress, setProgress] = useState(0);

    // Check for auth status on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authStatus = localStorage.getItem('isAuthenticated') === 'true';
            setIsAuthenticated(authStatus);
            if (!authStatus) {
                router.push('/auth');
            }
        }
    }, [router]);

    // Initialize mining state from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sessionStartTime = localStorage.getItem(MINING_SESSION_START_KEY);

            if (sessionStartTime) {
                const startTime = parseInt(sessionStartTime, 10);
                const currentTime = Date.now();
                const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

                if (elapsedSeconds < TOTAL_DURATION) {
                    setIsMining(true);
                    setTimeRemaining(TOTAL_DURATION - elapsedSeconds);
                } else {
                    // Session has expired
                    setIsMining(false);
                    setTimeRemaining(0);
                    localStorage.removeItem(MINING_SESSION_START_KEY);
                }
            }
        }
    }, []);

    // Timer effect
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isMining && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prevTime => {
                    const newTime = prevTime - 1;
                    if (newTime <= 0) {
                        clearInterval(timer);
                        setIsMining(false);
                        if(typeof window !== 'undefined') {
                            localStorage.removeItem(MINING_SESSION_START_KEY);
                        }
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isMining, timeRemaining]);

    // Progress calculation effect
    useEffect(() => {
        if (isMining) {
            const newProgress = ((TOTAL_DURATION - timeRemaining) / TOTAL_DURATION) * 100;
            setProgress(newProgress);
        } else {
            setProgress(0);
        }
    }, [isMining, timeRemaining]);
    
    const handleStartMining = () => {
        if (!isMining) {
            const startTime = Date.now();
            if (typeof window !== 'undefined') {
                localStorage.setItem(MINING_SESSION_START_KEY, startTime.toString());
            }
            setTimeRemaining(TOTAL_DURATION);
            setIsMining(true);
        }
    }

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Redirection vers la page de connexion...</p>
            </div>
        );
    }


  return (
    <AppLayout>
      <div className="space-y-6">
        
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Session de Minage Quotidienne</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="relative w-40 h-40">
                <CircularProgress value={isMining ? progress : 0} strokeWidth={10} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {isMining && timeRemaining > 0 ? (
                        <>
                           <p className="text-2xl font-bold text-primary">{formatTime(timeRemaining)}</p>
                           <p className="text-xs text-muted-foreground">Restant</p>
                        </>
                    ) : (
                         <p className="text-2xl font-bold">Inactif</p>
                    )}
                </div>
            </div>
            <div className="flex-grow">
               {isMining && timeRemaining > 0 ? (
                    <>
                        <p className="font-bold text-2xl">Minage Actif</p>
                        <p className="text-muted-foreground">Taux de base : +0.1 SAHEL/h</p>
                    </>
               ) : (
                    <>
                        <p className="font-bold text-2xl">Minage Arrêté</p>
                        <p className="text-muted-foreground">Appuyez pour commencer une nouvelle session de 24h.</p>
                    </>
               )}
               <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 mt-4 w-full sm:w-auto" 
                    onClick={handleStartMining}
                    disabled={isMining}
                >
                    {isMining ? <StopCircle className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                    {isMining ? 'Minage en cours...' : 'Commencer le minage'}
                </Button>
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
              <p className="text-4xl font-bold">{isMining ? '142 TH/s' : '0 TH/s'}</p>
               <p className="text-xs text-muted-foreground mt-1">{isMining ? '+2.1% depuis hier' : '-'}</p>
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
                            <p className="font-bold">{isMining ? '2' : '0'}</p>
                            <p className="text-xs">En ligne</p>
                        </div>
                    </div>
                     <div className="flex items-center text-red-400">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                         <div>
                            <p className="font-bold">{isMining ? '1' : '3'}</p>
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
                                            isMining && worker.status === 'En ligne' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                                        }`}>
                                            {isMining ? worker.status : 'Hors ligne'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{isMining ? worker.hashRate : '0 TH/s'}</TableCell>
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

    
