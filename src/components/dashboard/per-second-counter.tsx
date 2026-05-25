"use client";

import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export function PerSecondCounter() {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const cycleDuration = 4200; // Estimated 4.2 seconds per birth in Nigeria
      const elapsed = (Date.now() - startTime) % cycleDuration;
      setProgress((elapsed / cycleDuration) * 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return <div className="h-10" />;

  return (
    <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-1000 py-2">
      <div className="w-40 h-1 bg-secondary/50 rounded-full overflow-hidden border border-primary/20">
        <div 
          className="h-full bg-primary shadow-[0_0_12px_rgba(45,220,143,0.6)] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/80">
        <Activity className="h-3 w-3 animate-pulse" />
        <span>Live Birth Pulse: 1 every 4.2s</span>
      </div>
    </div>
  );
}
