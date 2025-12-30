
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

const existingUsers = ['jean.dupont@exemple.com', 'test@gmail.com'];

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<'initial' | 'login' | 'signup'>('initial');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  
  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingUsers.includes(emailOrPhone.toLowerCase())) {
        setStep('login');
    } else {
        setStep('signup');
    }
  }

  const handleAuth = () => {
    // Logic to handle authentication would go here
    // For now, just navigate to the dashboard
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <AppLogo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bienvenue sur SAHEL</CardTitle>
            <CardDescription>
                {step === 'initial' && 'Entrez votre email ou téléphone pour commencer.'}
                {step === 'login' && `Content de vous revoir, ${emailOrPhone}!`}
                {step === 'signup' && 'Créez votre compte pour continuer.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'initial' && (
                 <form onSubmit={handleInitialSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-initial">Email ou numéro de téléphone</Label>
                    <Input id="email-initial" type="email" placeholder="email@exemple.com" required value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
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
                    <Input id="email-login" type="email" value={emailOrPhone} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Mot de passe</Label>
                    <Input id="password-login" type="password" required autoFocus />
                  </div>
                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                </form>
            )}

            {step === 'signup' && (
                <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name-signup">Prénom</Label>
                      <Input id="first-name-signup" placeholder="Jean" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name-signup">Nom de famille</Label>
                      <Input id="last-name-signup" placeholder="Dupont" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" value={emailOrPhone} required readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Mot de passe</Label>
                    <Input id="password-signup" type="password" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="password-confirm">Confirmer le mot de passe</Label>
                    <Input id="password-confirm" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    S'inscrire
                  </Button>
                </form>
            )}

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
