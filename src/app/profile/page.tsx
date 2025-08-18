'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, LogOut, ShieldCheck, Copy, Gift } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        // Logout logic here
        router.push('/auth');
    }

  return (
    <AppLayout>
        <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="@username" data-ai-hint="profile avatar" />
                        <AvatarFallback>Z</AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">@NomUtilisateur</h1>
                    <p className="text-muted-foreground">utilisateur@exemple.com</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Mon Code de Parrainage</CardTitle>
                    <CardDescription>Partagez ce code avec vos amis !</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
                        <Gift className="h-5 w-5 text-primary" />
                        <p className="text-lg font-mono font-semibold text-primary flex-grow">ZOUDOU-1A2B3C</p>
                        <Button variant="ghost" size="icon">
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Utiliser un code de parrainage</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex items-center space-x-2">
                        <Input id="referral-code" placeholder="Entrez un code de parrainage" className="flex-grow" />
                        <Button type="submit" className="bg-accent hover:bg-accent/90">Valider</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Gérer le profil</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <Input id="username" defaultValue="@NomUtilisateur" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="utilisateur@exemple.com" />
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90">Sauvegarder</Button>
                    </form>
                </CardContent>
            </Card>
            
             <Button variant="outline" className="w-full justify-start text-base py-6" onClick={() => router.push('/verification')}>
                <ShieldCheck className="mr-4 h-5 w-5" />
                Vérification du compte (KYC/KYB)
            </Button>

            <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
            </Button>
        </div>
    </AppLayout>
  );
}
