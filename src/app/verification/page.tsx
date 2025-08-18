
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
import { Camera } from 'lucide-react';


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
            <div className="text-center">
                <h1 className="text-3xl font-bold">Vérification de Compte</h1>
                <p className="text-muted-foreground">Sécurisez votre compte et débloquez toutes les fonctionnalités.</p>
            </div>

            <Tabs defaultValue="kyc" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
                <TabsTrigger value="kyc">KYC (Individu)</TabsTrigger>
                <TabsTrigger value="kyb">KYB (Entreprise)</TabsTrigger>
              </TabsList>

              <TabsContent value="kyc">
                <Card>
                    <CardHeader>
                        <CardTitle>Vérification d'Identité (KYC)</CardTitle>
                        <CardDescription>Statut : <span className="text-yellow-400 font-semibold">Non vérifié</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="kyc-doc-type">Type de document</Label>
                            <Input id="kyc-doc-type" placeholder="Ex: Carte d'identité, Passeport" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kyc-doc-upload">Télécharger le document (Recto et Verso si applicable)</Label>
                            <Input id="kyc-doc-upload" type="file" />
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


                        <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour vérification</Button>
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
                            <Label htmlFor="kyb-doc-upload">Document d'enregistrement de l'entreprise</Label>
                            <Input id="kyb-doc-upload" type="file" />
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour vérification</Button>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        </div>
    </AppLayout>
  );
}
