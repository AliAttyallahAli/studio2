
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';

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
  { id: 'worker-001', name: 'RIG-01', status: 'Online', hashRate: '72 TH/s', temp: '65°C', uptime: '24h' },
  { id: 'worker-002', name: 'RIG-02', status: 'Online', hashRate: '70 TH/s', temp: '68°C', uptime: '24h' },
  { id: 'worker-003', name: 'RIG-03', status: 'Offline', hashRate: '0 TH/s', temp: '-', uptime: '0h' },
]

const recentTransactions = [
    {id: 'tx-1', type: 'Reward', amount: '+0.005 Z', date: '2024-07-07 14:30'},
    {id: 'tx-2', type: 'Payout', amount: '-10 Z', date: '2024-07-06 10:00'},
    {id: 'tx-3', type: 'Reward', amount: '+0.0048 Z', date: '2024-07-05 14:25'},
]

export default function MiningPage() {
  return (
    <AppLayout>
      <div className="space-y-6">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Hash Rate Actuel</CardTitle>
              <CardDescription>Performance globale de vos workers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">142 TH/s</p>
              <p className="text-xs text-muted-foreground mt-1">+2.1% depuis hier</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Récompenses Journalières</CardTitle>
              <CardDescription>Tokens Z générés aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">2.50 Z</p>
               <p className="text-xs text-muted-foreground mt-1">Prochaine distribution dans 6h</p>
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

        <Card>
            <CardHeader>
                <CardTitle>Performance sur 7 jours</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="w-full h-64">
                    <BarChart data={chartData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 5)}
                        />
                        <YAxis 
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="hashRate" fill="var(--color-hashRate)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        
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
                                            worker.status === 'Online' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
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
