'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';


function ZLogoAnimate() {
    return (
      <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-secondary mb-6 group">
         <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
         <div className="absolute inset-2 rounded-full bg-primary/30 animate-ping delay-200"></div>
        <div className="relative flex items-center justify-center w-full h-full rounded-full bg-secondary border-2 border-primary">
             <span className="text-7xl font-bold text-primary">Z</span>
        </div>
      </div>
    );
  }


export default function MiningPage() {
    const [isMining, setIsMining] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const startMining = () => {
        setIsMining(true);
        setCooldown(24 * 60 * 60); // 24 hours in seconds
    };

    useEffect(() => {
        if (isMining && cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (cooldown <= 0 && isMining) {
            setIsMining(false);
        }
    }, [isMining, cooldown]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const progress = isMining ? ((24 * 60 * 60 - cooldown) / (24 * 60 * 60)) * 100 : 0;

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        
        <ZLogoAnimate />
        
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Session de Minage</CardTitle>
                <CardDescription>
                    {isMining ? "Prochaine session dans :" : "Appuyez pour commencer à miner"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isMining ? (
                    <div className="relative w-40 h-40 mx-auto">
                       <CircularProgress value={progress} strokeWidth={10} />
                       <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-3xl font-mono font-bold text-primary">
                                {formatTime(cooldown)}
                            </div>
                       </div>
                    </div>
                ) : (
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90" onClick={startMining}>
                        <Zap className="mr-2 h-5 w-5" />
                        Commencer le Minage
                    </Button>
                )}
            </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground">
            <p>Taux de minage : +0.1 Z / heure</p>
            <p>Session active pendant 24 heures.</p>
        </div>

      </div>
    </AppLayout>
  );
}
