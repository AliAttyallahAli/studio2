
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, Copy, DollarSign, Shield, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const coreTeamWallet = {
    address: '0xCoreTeamZoudouAdminWalletAddress789XYZ',
    balance: '10,500,000.00 Z',
};

const recentUsers = [
    { id: 'user-001', email: 'test1@gmail.com', kycStatus: 'Vérifié' },
    { id: 'user-002', email: 'test2@gmail.com', kycStatus: 'En attente' },
    { id: 'user-003', email: 'test3@gmail.com', kycStatus: 'Rejeté' },
];

export default function AdminPage() {
    const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 sm:px-6 border-b shrink-0 bg-background">
         <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary"/>
            <h1 className="text-xl font-semibold">Panneau d'Administration</h1>
         </div>
         <Button onClick={() => router.push('/')}>Retour à l'application</Button>
      </header>

      <main className="p-4 sm:p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Solde Core Team
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{coreTeamWallet.balance}</div>
                    <p className="text-xs text-muted-foreground mt-1">Portefeuille principal de l'équipe</p>
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
                        +180.1% depuis le mois dernier
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Portefeuille Core Team</CardTitle>
                    <CardDescription>Adresse unique pour les fonds de l'équipe.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
                        <p className="text-sm font-mono text-primary flex-grow truncate">{coreTeamWallet.address}</p>
                        <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(coreTeamWallet.address)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <CardDescription>Consulter et gérer les utilisateurs récents.</CardDescription>
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
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        user.kycStatus === 'Vérifié' ? 'bg-green-900/50 text-green-400' :
                                        user.kycStatus === 'En attente' ? 'bg-yellow-900/50 text-yellow-400' :
                                        'bg-red-900/50 text-red-400'
                                    }`}>
                                        {user.kycStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
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
      </main>
    </div>
  );
}
