
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Delete } from 'lucide-react';

interface PinInputProps {
  onPinComplete: (pin: string) => void;
  title: string;
}

export const PinInput = ({ onPinComplete, title }: PinInputProps) => {
  const [pin, setPin] = useState('');
  
  useEffect(() => {
    if (pin.length === 4) {
        onPinComplete(pin);
    }
  }, [pin, onPinComplete]);

  const handleKeyPress = (key: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + key);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };
  
  const handleClear = () => {
    setPin('');
  }

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
    'clear', '0', 'delete'
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-lg font-semibold">{title}</h3>
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
              onClick={() => key === 'delete' ? handleDelete() : key === 'clear' ? handleClear() : handleKeyPress(key)}
            >
              {key === 'delete' ? <Delete /> : key === 'clear' ? <span className="text-xs">EFFACER</span> : key}
            </Button>
          );
        })}
      </div>
    </div>
  );
};


interface PinDialogProps {
  children?: React.ReactNode;
  onPinSuccess: (pin?: string) => void;
  isTrigger?: boolean;
}

export const PinDialog: React.FC<PinDialogProps> = ({ children, onPinSuccess, isTrigger = true }) => {
  const [open, setOpen] = useState(!isTrigger);
  const { toast } = useToast();

  const handlePinComplete = (pin: string) => {
    const storedPin = localStorage.getItem('user_pin');
    if (pin === storedPin) {
      toast({ title: 'Succès', description: 'Action confirmée.'});
      onPinSuccess(pin);
      if(isTrigger) setOpen(false);
    } else {
        toast({
          variant: 'destructive',
          title: 'Code PIN Incorrect',
          description: 'Veuillez réessayer.',
        });
    }
  };

  const content = (
    <>
      <DialogHeader>
        <DialogTitle>Vérification du Code PIN</DialogTitle>
        <DialogDescription>
          Pour votre sécurité, veuillez entrer votre code PIN pour continuer.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <PinInput onPinComplete={handlePinComplete} title="Entrez votre PIN" />
      </div>
    </>
  );

  if (!isTrigger) {
    return <>{content}</>
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {content}
      </DialogContent>
    </Dialog>
  );
};
