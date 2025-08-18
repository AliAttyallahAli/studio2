
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function P2PPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold">Échange P2P</h1>
            <p className="text-muted-foreground">Achetez et vendez des tokens Z directement avec d'autres utilisateurs.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Mettre en Vente des Tokens</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="amount-sell">Montant</Label>
                        <Input id="amount-sell" type="number" placeholder="100.00"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Prix en USD</Label>
                        <Input id="price" type="number" placeholder="50.00" />
                    </div>
                    <Button className="w-full sm:w-auto">Mettre en vente</Button>
                </form>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
