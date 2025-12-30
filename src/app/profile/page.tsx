
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Gift, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState, useRef } from 'react';

const leaderboard = [
    { rank: 1, user: '@CryptoKing', referrals: 152, active: 140 },
    { rank: 2, user: '@SahelUser', referrals: 128, active: 115 },
    { rank: 3, user: '@ZoudouFan', referrals: 98, active: 80 },
    { rank: 4, user: '@P2P_Master', referrals: 75, active: 75 },
    { rank: 5, user: '@QueenOfCoins', referrals: 62, active: 50 },
]

export default function ProfilePage() {
    const router = useRouter();
    
    const currentUser = {
        username: '@SahelUser',
        email: 'sahel.user@exemple.com',
        firstName: 'Sahel',
        lastName: 'User',
        avatar: 'https://picsum.photos/seed/sahel/100/100',
        bio: "Passionné par la révolution Web3 en Afrique. #SAHEL"
    };
    
    const referralLink = `https://sahel.app/join/${currentUser.username.replace('@','')}`;

    const [imagePreview, setImagePreview] = useState<string>(currentUser.avatar);
    const imageInputRef = useRef<HTMLInputElement>(null);


    const handleLogout = () => {
        // Logout logic here
        router.push('/auth');
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagePreview(URL.createObjectURL(file));
        }
    };

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
                            <AvatarImage src={imagePreview} alt={currentUser.username} data-ai-hint="profile avatar" />
                            <AvatarFallback>{currentUser.username.replace('@','').substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full" onClick={() => imageInputRef.current?.click()}>
                            <Camera className="h-4 w-4" />
                        </Button>
                        <input
                            type="file"
                            ref={imageInputRef}
                            className="hidden"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">{currentUser.username}</h1>
                        <p className="text-muted-foreground">{currentUser.email}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mettre à jour le profil</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">Prénom</Label>
                                <Input id="first-name" defaultValue={currentUser.firstName} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="last-name">Nom de famille</Label>
                                <Input id="last-name" defaultValue={currentUser.lastName} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <Input id="username" defaultValue={currentUser.username} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={currentUser.email} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bio">Biographie</Label>
                            <Textarea id="bio" placeholder="Parlez-nous un peu de vous..." defaultValue={currentUser.bio}/>
                        </div>
                        <Button className="w-full">Sauvegarder</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Parrainage & Classement</CardTitle>
                    <CardDescription>Invitez des amis, gagnez des bonus et montez dans le classement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>Votre lien de parrainage</Label>
                        <div className="flex items-center space-x-2 p-2 bg-secondary rounded-md mt-2">
                            <Gift className="h-5 w-5 text-primary"/>
                            <Input readOnly defaultValue={referralLink} className="flex-grow border-0 bg-transparent text-sm" />
                            <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(referralLink)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Classement des parrains</h4>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rang</TableHead>
                                    <TableHead>Utilisateur</TableHead>
                                    <TableHead>Parrainages</TableHead>
                                    <TableHead>Actifs</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaderboard.map(entry => (
                                    <TableRow key={entry.rank} className={entry.user === currentUser.username ? 'bg-primary/10' : ''}>
                                        <TableCell className="font-medium">{entry.rank}</TableCell>
                                        <TableCell>{entry.user}</TableCell>
                                        <TableCell>{entry.referrals}</TableCell>
                                        <TableCell className="text-green-400">{entry.active}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
