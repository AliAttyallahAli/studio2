
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PinInput } from '@/components/PinDialog';
import { useToast } from '@/hooks/use-toast';

interface PinSetupProps {
  onPinSetupSuccess: () => void;
}

export const PinSetup: React.FC<PinSetupProps> = ({ onPinSetupSuccess }) => {
    const [step, setStep] = useState<'create' | 'confirm'>('create');
    const [firstPin, setFirstPin] = useState('');
    const { toast } = useToast();

    const handleFirstPin = (pin: string) => {
        setFirstPin(pin);
        setStep('confirm');
    };

    const handleConfirmPin = (pin: string) => {
        if (pin === firstPin) {
            localStorage.setItem('user_pin', pin); // Note: Ne jamais stocker de PIN en clair en production!
            toast({
                title: 'Code PIN Créé',
                description: 'Votre portefeuille est maintenant sécurisé.',
            });
            onPinSetupSuccess();
        } else {
            toast({
                variant: 'destructive',
                title: 'Les codes PIN ne correspondent pas',
                description: 'Veuillez recommencer.',
            });
            setFirstPin('');
            setStep('create');
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sécuriser votre Portefeuille</CardTitle>
                <CardDescription>
                    {step === 'create' 
                        ? 'Veuillez créer un code PIN à 4 chiffres pour protéger votre portefeuille.'
                        : 'Veuillez confirmer votre nouveau code PIN.'
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === 'create' ? (
                    <PinInput onPinComplete={handleFirstPin} title="Créez un PIN" />
                ) : (
                    <PinInput onPinComplete={handleConfirmPin} title="Confirmez le PIN" />
                )}
            </CardContent>
        </Card>
    );
};
