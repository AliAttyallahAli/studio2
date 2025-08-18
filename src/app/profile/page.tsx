'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';


export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        // Logout logic here
        router.push('/');
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

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="kyc">KYC</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
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
              </TabsContent>
              <TabsContent value="kyc">
                <Card>
                    <CardHeader>
                        <CardTitle>Vérification KYC</CardTitle>
                        <CardDescription>Statut : <span className="text-yellow-400">Non vérifié</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="document-type">Type de document</Label>
                            <Input id="document-type" placeholder="Ex: Carte d'identité nationale" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="document-upload">Télécharger le document</Label>
                            <Input id="document-upload" type="file" />
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour vérification</Button>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
            </Button>
        </div>
    </AppLayout>
  );
}
