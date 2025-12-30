
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle2, ChevronRight, RefreshCw, Zap } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const chartData = [
  { date: '01/07', hashRate: 125 },
  { date: '02/07', hashRate: 130 },
  { date: '03/07', hashRate: 128 },
  { date: '04/07', hashRate: 135 },
  { date: '05/07', hashRate: 140 },
  { date: '06/07', hashRate: 138 },
  { date: '07/07', hashRate: 142 },
];
const chartConfig = {
  hashRate: {
    label: 'Hash Rate (TH/s)',
    color: 'hsl(var(--primary))',
  },
} satisfies import('@/components/ui/chart').ChartConfig;


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
  return (
    <AppLayout>
      <div className="space-y-6">
        
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Session de Minage Quotidienne</CardTitle>
            <CardDescription>Votre session de minage se termine dans 15h 45m 22s.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Zap className="w-24 h-24 text-primary animate-pulse"/>
            </div>
            <div className="flex-grow w-full">
              <p className="font-bold text-lg">Minage Actif</p>
              <Progress value={35} className="mt-2 mb-1" />
              <p className="text-sm text-muted-foreground">Taux de base : +0.1 SAHEL/h</p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto">Arrêter le minage</Button>
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
