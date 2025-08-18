'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function VerificationPage() {
  return (
    <AppLayout>
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Vérification de Compte</h1>
                <p className="text-muted-foreground">Sécurisez votre compte et débloquez toutes les fonctionnalités.</p>
            </div>

            <Tabs defaultValue="kyc" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="kyc">KYC (Individu)</TabsTrigger>
                <TabsTrigger value="kyb">KYB (Entreprise)</TabsTrigger>
                <TabsTrigger value="kya">KYA (Administration)</TabsTrigger>
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
                                <Label htmlFor="kyc-fullname">Nom(s) et Prénom(s)</Label>
                                <Input id="kyc-fullname" placeholder="Ex: Jean Dupont" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kyc-birthdate">Date de naissance</Label>
                                <Input id="kyc-birthdate" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kyc-birthplace">Lieu de naissance</Label>
                                <Input id="kyc-birthplace" placeholder="Ex: Douala" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="kyc-address">Adresse</Label>
                                <Input id="kyc-address" placeholder="Ex: 123, Rue de la Liberté" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="kyc-profession">Profession</Label>
                                <Input id="kyc-profession" placeholder="Ex: Développeur" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kyc-doc-type">Type de document</Label>
                                <Input id="kyc-doc-type" placeholder="Ex: Carte d'identité, Passeport" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="kyc-doc-number">Numéro du document</Label>
                                <Input id="kyc-doc-number" placeholder="Ex: 123456789" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="kyc-doc-upload-recto">Document (Recto)</Label>
                                <Input id="kyc-doc-upload-recto" type="file" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="kyc-doc-upload-verso">Document (Verso)</Label>
                                <Input id="kyc-doc-upload-verso" type="file" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kyc-selfie">Selfie</Label>
                                <Input id="kyc-selfie" type="file" />
                            </div>
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
                            <Label htmlFor="kyb-doc-upload">Document d'enregistrement de l'entreprise</Label>
                            <Input id="kyb-doc-upload" type="file" />
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour vérification KYB</Button>
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kya">
                <Card>
                    <CardHeader>
                        <CardTitle>Vérification d'Administration (KYA)</CardTitle>
                         <CardDescription>Statut : <span className="text-yellow-400 font-semibold">Non vérifié</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="kya-admin-name">Nom de l'administration</Label>
                            <Input id="kya-admin-name" placeholder="Ex: Mairie de la ville" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kya-doc-type">Type de document justificatif</Label>
                            <Input id="kya-doc-type" placeholder="Ex: Lettre officielle, Décret" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="kya-doc-upload">Télécharger le document justificatif</Label>
                            <Input id="kya-doc-upload" type="file" />
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90">Soumettre pour vérification KYA</Button>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        </div>
    </AppLayout>
  );
}
