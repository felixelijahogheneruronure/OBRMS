
"use client";

import React from 'react';
import { Activity, Baby, MapPin } from 'lucide-react';

const regions = [
  { name: "Lagos", count: 42, trend: "+2.4%" },
  { name: "Kano", count: 38, trend: "+1.8%" },
  { name: "Oyo", count: 21, trend: "+0.5%" },
  { name: "Rivers", count: 19, trend: "+3.1%" },
  { name: "Abuja (FCT)", count: 15, trend: "+4.2%" },
  { name: "Kaduna", count: 24, trend: "-0.2%" },
  { name: "Anambra", count: 12, trend: "+1.1%" },
  { name: "Enugu", count: 10, trend: "+0.8%" },
  { name: "Delta", count: 14, trend: "+2.2%" },
];

export const LiveTicker = () => {
  return (
    <div className="bg-secondary/50 border-y border-border overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {regions.map((region) => (
              <div key={region.name} className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{region.name}:</span>
                <span className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Baby className="h-4 w-4 text-accent" />
                  {region.count}
                </span>
                <span className={cn(
                  "text-xs font-mono",
                  region.trend.startsWith('+') ? "text-primary" : "text-destructive"
                )}>
                  {region.trend}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";
