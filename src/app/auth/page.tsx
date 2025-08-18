'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ZLogo() {
  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
      <span className="text-4xl font-bold text-primary-foreground">Z</span>
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();

  const handleAuth = () => {
    // Logic to handle authentication would go here
    // For now, just navigate to the dashboard
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <ZLogo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bienvenue sur Zoudou</CardTitle>
            <CardDescription>Votre portefeuille de tokens sécurisé</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" type="email" placeholder="email@exemple.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Mot de passe</Label>
                    <Input id="password-login" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Se connecter
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" placeholder="email@exemple.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Mot de passe</Label>
                    <Input id="password-signup" type="password" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="password-confirm">Confirmer le mot de passe</Label>
                    <Input id="password-confirm" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    S'inscrire
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
