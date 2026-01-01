
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
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

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
  const searchParams = useSearchParams();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

   const [kycForm, setKycForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    country: '',
    region: '',
    city: '',
    district: '',
    docType: '',
    docNumber: '',
    docFront: null,
    docBack: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setKycForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setKycForm(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const userEmail = searchParams.get('email');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [searchParams]);

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

  const handleCaptureSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL('image/png');
      setSelfiePreview(dataUrl);
      toast({
        title: 'Selfie capturé!',
        description: 'L\'image a été prise et est prête à être soumise.',
      });
    }
  };

  const handleSubmitKyc = () => {
    const requiredFields: (keyof typeof kycForm)[] = [
      'firstName', 'lastName', 'birthDate', 'birthPlace', 'country', 'region', 'city', 'district', 'docType', 'docNumber'
    ];
    
    for (const field of requiredFields) {
      if (!kycForm[field as keyof typeof kycForm]) {
        toast({
          variant: 'destructive',
          title: 'Champ manquant',
          description: `Veuillez remplir tous les champs avant de soumettre. Le champ "${field}" est requis.`,
        });
        return;
      }
    }

     if (!selfiePreview) {
        toast({
          variant: 'destructive',
          title: 'Selfie manquant',
          description: 'Veuillez capturer un selfie vidéo avant de soumettre.',
        });
        return;
    }

    toast({
      title: 'Soumission Réussie',
      description: 'Vos informations KYC ont été soumises pour vérification.',
    });
  };

  const handleApprove = () => {
    toast({
      title: 'KYC Approuvé',
      description: `La vérification pour ${email} a été approuvée avec succès.`,
      className: 'bg-green-500 text-white',
    });
  };

  const handleReject = () => {
     toast({
      variant: 'destructive',
      title: 'KYC Rejeté',
      description: `La vérification pour ${email} a été rejetée.`,
    });
  };


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
                        {email && (
                             <div className="space-y-2">
                                <Label htmlFor="email">Email de l'utilisateur</Label>
                                <Input id="email" type="email" value={email} readOnly className="bg-secondary" />
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom</Label>
                                <Input id="firstName" placeholder="Ex: Jean" required value={kycForm.firstName} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nom de famille</Label>
                                <Input id="lastName" placeholder="Ex: Dupont" required value={kycForm.lastName} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="birthDate">Date de naissance</Label>
                                <Input id="birthDate" type="date" required value={kycForm.birthDate} onChange={handleInputChange} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="birthPlace">Lieu de naissance</Label>
                                <Input id="birthPlace" placeholder="Ex: Dakar" required value={kycForm.birthPlace} onChange={handleInputChange} />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Pays</Label>
                                <Select required value={kycForm.country} onValueChange={(v) => handleSelectChange('country', v)}>
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
                                <Input id="region" placeholder="Ex: Région de Dakar" required value={kycForm.region} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="city">Ville</Label>
                                <Input id="city" placeholder="Ex: Dakar" required value={kycForm.city} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">Quartier</Label>
                                <Input id="district" placeholder="Ex: Mermoz" required value={kycForm.district} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="docType">Type de pièce</Label>
                                <Select required value={kycForm.docType} onValueChange={(v) => handleSelectChange('docType', v)}>
                                    <SelectTrigger id="docType">
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
                                <Label htmlFor="docNumber">Numéro de pièce</Label>
                                <Input id="docNumber" placeholder="Ex: 123456789" required value={kycForm.docNumber} onChange={handleInputChange} />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="doc-front">Pièce d'identité (Recto)</Label>
                                <Input id="doc-front" type="file" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="doc-back">Pièce d'identité (Verso)</Label>
                                <Input id="doc-back" type="file" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Selfie Vidéo</Label>
                             <div className="p-2 border rounded-md bg-secondary aspect-video flex items-center justify-center">
                                <video ref={videoRef} className="w-full h-full rounded-md" autoPlay muted playsInline />
                            </div>
                            <canvas ref={canvasRef} className="hidden" />
                             {hasCameraPermission === false && (
                                <Alert variant="destructive">
                                    <AlertTitle>Accès à la caméra requis</AlertTitle>
                                    <AlertDescription>
                                        Veuillez autoriser l'accès à la caméra pour utiliser cette fonctionnalité.
                                    </AlertDescription>
                                  </Alert>
                            )}
                            {selfiePreview && (
                                <div className="space-y-2">
                                    <Label>Aperçu du selfie</Label>
                                    <div className="p-2 border rounded-md bg-secondary flex justify-center">
                                        <Image src={selfiePreview} alt="Aperçu du selfie" width={200} height={150} className="rounded-md" />
                                    </div>
                                </div>
                            )}
                            <Button className="w-full" disabled={!hasCameraPermission} onClick={handleCaptureSelfie}>
                                <Camera className="mr-2 h-4 w-4" />
                                Capturer le Selfie
                            </Button>
                        </div>

                        {email && (
                            <div className="flex gap-2">
                                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleApprove}>Approuver</Button>
                                <Button className="w-full" variant="destructive" onClick={handleReject}>Rejeter</Button>
                            </div>
                        )}
                        <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleSubmitKyc}>Soumettre pour vérification KYC</Button>

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
