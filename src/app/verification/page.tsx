
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Camera, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const africanCountries = [
    "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroun", "République centrafricaine",
    "Tchad", "Comores", "Congo (Congo-Brazzaville)", "République Démocratique du Congo", "Côte d'Ivoire", "Djibouti",
    "Égypte", "Guinée équatoriale", "Érythrée", "Eswatini (fmr. Swaziland)", "Éthiopie", "Gabon", "Gambie", "Ghana",
    "Guinée", "Guinée-Bissau", "Kenya", "Lesotho", "Liberia", "Libye", "Madagascar", "Malawi", "Mali", "Mauritanie",
    "Maurice", "Maroc", "Mozambique", "Namibie", "Niger", "Nigeria", "Rwanda", "Sao Tomé-et-Principe", "Sénégal",
    "Seychelles", "Sierra Leone", "Somalie", "Afrique du Sud", "Soudan du Sud", "Soudan", "Tanzanie", "Togo", "Tunisie",
    "Ouganda", "Zambie", "Zimbabwe"
];


export default function VerificationPage() {
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({video: true});
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Accès à la caméra refusé',
            description: 'Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur pour continuer.',
          });
        }
      } else {
        setHasCameraPermission(false);
         toast({
            variant: 'destructive',
            title: 'Appareil non pris en charge',
            description: 'Votre navigateur ne prend pas en charge l\'accès à la caméra.',
          });
      }
    };

    getCameraPermission();

     return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);


  return (
    <AppLayout>
        <div className="space-y-6">
            <div className="text-left">
                <h1 className="text-3xl font-bold">Vérification de Compte</h1>
                <p className="text-muted-foreground">Sécurisez votre compte et débloquez toutes les fonctionnalités de l'écosystème.</p>
            </div>

            <Tabs defaultValue="kyc" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
                <TabsTrigger value="kyc">KYC (Utilisateur)</TabsTrigger>
                <TabsTrigger value="kyb">KYB (Vendeur / Entreprise)</TabsTrigger>
              </TabsList>

              <TabsContent value="kyc">
                <Card>
                    <CardHeader>
                        <CardTitle>Vérification d'Identité (KYC)</CardTitle>
                        <CardDescription>Statut : <span className="text-yellow-400 font-semibold">Non vérifié</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">Prénom</Label>
                                <Input id="first-name" placeholder="Ex: Jean" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Nom de famille</Label>
                                <Input id="last-name" placeholder="Ex: Dupont" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="birth-date">Date de naissance</Label>
                                <Input id="birth-date" type="date" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="birth-place">Lieu de naissance</Label>
                                <Input id="birth-place" placeholder="Ex: Dakar" />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Pays</Label>
                                <Select>
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Sélectionnez votre pays" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {africanCountries.map(country => (
                                            <SelectItem key={country} value={country}>{country}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="region">Région</Label>
                                <Input id="region" placeholder="Ex: Région de Dakar" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="city">Ville</Label>
                                <Input id="city" placeholder="Ex: Dakar" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">Quartier</Label>
                                <Input id="district" placeholder="Ex: Mermoz" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="doc-type">Type de pièce</Label>
                                <Select>
                                    <SelectTrigger id="doc-type">
                                        <SelectValue placeholder="Sélectionnez le type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nni">NNI</SelectItem>
                                        <SelectItem value="passport">Passeport</SelectItem>
                                        <SelectItem value="act">Acte de naissance</SelectItem>
                                        <SelectItem value="driving-license">Permis de conduire</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="doc-number">Numéro de pièce</Label>
                                <Input id="doc-number" placeholder="Ex: 123456789" />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="doc-front">Pièce d'identité (Recto)</Label>
                                <Input id="doc-front" type="file" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="doc-back">Pièce d'identité (Verso)</Label>
                                <Input id="doc-back" type="file" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Selfie Vidéo</Label>
                             <div className="p-2 border rounded-md bg-secondary aspect-video flex items-center justify-center">
                                <video ref={videoRef} className="w-full h-full rounded-md" autoPlay muted playsInline />
                            </div>
                             {hasCameraPermission === false && (
                                <Alert variant="destructive">
                                    <AlertTitle>Accès à la caméra requis</AlertTitle>
                                    <AlertDescription>
                                        Veuillez autoriser l'accès à la caméra pour utiliser cette fonctionnalité.
                                    </AlertDescription>
                                  </Alert>
                            )}
                            <Button className="w-full" disabled={!hasCameraPermission}>
                                <Camera className="mr-2 h-4 w-4" />
                                Capturer le Selfie
                            </Button>
                        </div>

                        <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour vérification KYC</Button>
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kyb">
                <Card>
                    <CardHeader>
                        <CardTitle>Vérification d'Entreprise (KYB)</CardTitle>
                        <CardDescription>Statut : <span className="text-yellow-400 font-semibold">Non vérifié</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="kyb-company-name">Nom de l'entreprise</Label>
                            <Input id="kyb-company-name" placeholder="Ex: Zoudou Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kyb-reg-number">Numéro d'enregistrement</Label>
                            <Input id="kyb-reg-number" placeholder="Ex: RC/DLA/2024/A/1234" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kyb-doc-upload">Documents légaux de l'entreprise</Label>
                            <Input id="kyb-doc-upload" type="file" />
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour vérification KYB</Button>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        </div>
    </AppLayout>
  );
}
