'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, LogOut, ShieldCheck } from 'lucide-react';
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
