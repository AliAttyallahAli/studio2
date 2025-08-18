'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, LogOut, ShieldCheck, Copy, Gift } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function ProfilePage() {
    const router = useRouter();
    const referralLink = "https://cryptosen.tinal/join/CryptoMiner";

    const handleLogout = () => {
        // Logout logic here
        router.push('/auth');
    }

  return (
    <AppLayout>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                    <CardDescription>Gérez vos informations personnelles et paramètres.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center pt-6 space-y-4">
                    <div className="relative">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="@username" data-ai-hint="profile avatar" />
                            <AvatarFallback>CS</AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                            <Camera className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">@CryptoMiner</h1>
                        <p className="text-muted-foreground">miner@example.com</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mettre à jour le profil</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <Input id="username" defaultValue="@CryptoMiner" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="miner@example.com" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bio">Biographie</Label>
                            <Textarea id="bio" placeholder="Parlez-nous un peu de vous..." defaultValue="Passionné de crypto et d'optimisation de la performance."/>
                        </div>
                        <Button className="w-full">Sauvegarder</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Parrainage</CardTitle>
                    <CardDescription>Invitez des amis et gagnez des récompenses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
                        <Gift className="h-5 w-5 text-primary"/>
                        <Input readOnly defaultValue={referralLink} className="flex-grow border-0 bg-transparent text-sm" />
                        <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(referralLink)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
