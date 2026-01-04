
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, Copy, DollarSign, Users, Shield, Wallet } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { coreTeamWallet } from '@/lib/chat-data';
import { useMemo } from 'react';

const recentUsers = [
    { id: 'user-001', email: 'test1@gmail.com', kycStatus: 'Vérifié' },
    { id: 'user-002', email: 'test2@gmail.com', kycStatus: 'En attente' },
    { id: 'user-003', email: 'test3@gmail.com', kycStatus: 'Rejeté' },
];

export default function AdminPage() {
    const router = useRouter();

    const handleManageUser = (email: string) => {
        router.push(`/verification?email=${encodeURIComponent(email)}`);
    }

    const coreTeamBalance = useMemo(() => {
        // Now reads directly from the centralized data source
        return coreTeamWallet.balance;
    }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Solde Core Team
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{coreTeamBalance.toLocaleString('fr-FR')} SAHEL</div>
                    <p className="text-xs text-muted-foreground mt-1">Solde total incluant les frais collectés</p>
                    <Link href="/wallet">
                        <Button variant="outline" size="sm" className="mt-4">
                            <Wallet className="mr-2 h-4 w-4" />
                            Gérer le portefeuille
                        </Button>
                    </Link>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Utilisateurs Total
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+1,234</div>
                    <p className="text-xs text-muted-foreground">
                        +18.1% depuis le mois dernier
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Portefeuille Core Team</CardTitle>
                    <CardDescription>Adresse unique pour la collecte des frais de transaction et de service.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
                         <Shield className="h-4 w-4 text-primary" />
                        <p className="text-sm font-mono text-primary flex-grow truncate">{coreTeamWallet.address}</p>
                        <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(coreTeamWallet.address)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {coreTeamWallet.chains.map(chain => (
                             <span key={chain} className="px-2 py-1 text-xs rounded-full bg-secondary">{chain}</span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        
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
                                    }`}>
                                        {user.kycStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleManageUser(user.email)}>
                                        Gérer
                                        <ArrowUpRight className="h-4 w-4 ml-2" />
                                    </Button>
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
