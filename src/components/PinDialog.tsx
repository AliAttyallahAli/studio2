
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { X, Delete } from 'lucide-react';

interface PinInputProps {
  onPinComplete: (pin: string) => void;
}

export const PinInput = ({ onPinComplete }: PinInputProps) => {
  const [pin, setPin] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === '1234') { // PIN codé en dur pour la démo
        onPinComplete(pin);
      } else {
        toast({
          variant: 'destructive',
          title: 'Code PIN Incorrect',
          description: 'Veuillez réessayer.',
        });
        setPin('');
      }
    }
  }, [pin, onPinComplete, toast]);

  const handleKeyPress = (key: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + key);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const pinDisplay = Array(4).fill(0).map((_, i) => (
    <div
      key={i}
      className={cn('w-4 h-4 rounded-full border-2', pin.length > i ? 'bg-primary border-primary' : 'border-muted-foreground')}
    />
  ));

  const keypad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '', '0', 'delete'
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4">
        {pinDisplay}
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
        {keypad.map((key) => {
          if (key === '') return <div key="empty" />;
          return (
            <Button
              key={key}
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full text-xl"
              onClick={() => key === 'delete' ? handleDelete() : handleKeyPress(key)}
            >
              {key === 'delete' ? <Delete /> : key}
            </Button>
          );
        })}
      </div>
    </div>
  );
};


interface PinDialogProps {
  children: React.ReactNode;
  onPinSuccess: () => void;
}

export const PinDialog: React.FC<PinDialogProps> = ({ children, onPinSuccess }) => {
  const [open, setOpen] = useState(false);

  const handlePinComplete = (pin: string) => {
    onPinSuccess();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vérification du Code PIN</DialogTitle>
          <DialogDescription>
            Pour votre sécurité, veuillez entrer votre code PIN pour continuer.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <PinInput onPinComplete={handlePinComplete} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
