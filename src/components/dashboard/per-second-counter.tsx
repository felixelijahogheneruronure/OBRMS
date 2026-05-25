
"use client";

import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { RollingCounter } from './rolling-counter';

export function PerSecondCounter() {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Average birth rate: 1 every 4.2 seconds in Nigeria
    const birthInterval = 4200; 
    
    const calculateBirths = () => {
      const now = new Date();
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const secondsSinceMidnight = (now.getTime() - startOfDay.getTime()) / 1000;
      return Math.floor(secondsSinceMidnight / 4.2);
    };
    
    // Initial sync
    setCount(calculateBirths());

    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, birthInterval);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return <div className="h-10" />;

  return (
    <div className="flex flex-col items-center gap-1 animate-in fade-in slide-in-from-top-2 duration-1000 py-2">
      <div className="flex items-center gap-3 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 shadow-[0_0_20px_rgba(45,220,143,0.05)]">
        <Activity className="h-4 w-4 text-primary animate-pulse" />
        <RollingCounter value={count} minDigits={1} className="text-2xl text-primary tracking-tighter" />
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-primary/60 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        Live Est. Daily Births
      </div>
    </div>
  );
}
