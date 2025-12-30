
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Handshake } from 'lucide-react';
import { useState } from 'react';

function AppLogo() {
  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
      <Handshake className="w-8 h-8 text-primary-foreground" />
    </div>
  );
}

// Pour la simulation, nous utilisons une liste d'utilisateurs existants.
// Dans une application réelle, cela serait vérifié côté serveur.
const existingUsers = ['jean.dupont@exemple.com', 'test@gmail.com'];

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<'initial' | 'login' | 'signup'>('initial');
  const [email, setEmail] = useState('');
  
  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingUsers.includes(email.toLowerCase())) {
        setStep('login');
    } else {
        setStep('signup');
    }
  }

  const handleAuth = () => {
    // La logique pour gérer l'authentification (connexion ou inscription) irait ici.
    // Par exemple, appeler une API Firebase.
    // Pour cette démo, nous redirigeons simplement vers la page d'accueil.
    router.push('/');
  };

  const resetFlow = () => {
    setStep('initial');
    setEmail('');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <AppLogo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 'login' && 'Connexion'}
              {step === 'signup' && 'Créer un compte'}
              {step === 'initial' && 'Bienvenue sur SAHEL'}
            </CardTitle>
            <CardDescription>
                {step === 'initial' && 'Entrez votre email pour commencer.'}
                {step === 'login' && `Content de vous revoir !`}
                {step === 'signup' && 'Finalisez la création de votre compte.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'initial' && (
                 <form onSubmit={handleInitialSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-initial">Email</Label>
                    <Input 
                        id="email-initial" 
                        type="email" 
                        placeholder="nom@exemple.com" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Continuer
                  </Button>
                </form>
            )}

            {step === 'login' && (
                 <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" type="email" value={email} readOnly className="bg-secondary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Mot de passe</Label>
                    <Input id="password-login" type="password" required autoFocus />
                  </div>
                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                   <Button variant="link" size="sm" className="w-full" onClick={resetFlow}>
                    Utiliser un autre compte
                  </Button>
                </form>
            )}

            {step === 'signup' && (
                <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name-signup">Prénom</Label>
                      <Input id="first-name-signup" placeholder="Jean" required autoFocus/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name-signup">Nom de famille</Label>
                      <Input id="last-name-signup" placeholder="Dupont" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" value={email} required readOnly className="bg-secondary"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Créer un mot de passe</Label>
                    <Input id="password-signup" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Créer le compte
                  </Button>
                   <Button variant="link" size="sm" className="w-full" onClick={resetFlow}>
                    Vous avez déjà un compte ? Se connecter
                  </Button>
                </form>
            )}

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
