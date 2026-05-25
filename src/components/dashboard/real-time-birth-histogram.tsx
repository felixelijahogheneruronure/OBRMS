
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface DataPoint {
  time: string;
  births: number;
}

export function RealTimeBirthHistogram() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Initialize with some mock history
    const initialData: DataPoint[] = Array.from({ length: 20 }, (_, i) => ({
      time: `${20 - i}s ago`,
      births: Math.floor(Math.random() * 5) + 1
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData(currentData => {
        const nextData = [...currentData.slice(1)];
        nextData.push({
          time: 'Now',
          births: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
        });
        
        // Update time labels
        return nextData.map((d, i) => ({
          ...d,
          time: i === nextData.length - 1 ? 'Now' : `${(nextData.length - 1 - i) * 2}s ago`
        }));
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full bg-card border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary animate-pulse" />
            Live National Birth Pulse
          </CardTitle>
          <CardDescription>Real-time frequency of birth events (updated every 2s)</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                stroke="#6b7280" 
                fontSize={10}
                interval={4}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                stroke="#6b7280" 
                fontSize={10} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(45, 220, 143, 0.1)' }}
                contentStyle={{ 
                  backgroundColor: '#0F1A15', 
                  border: '1px solid #1f2937', 
                  borderRadius: '8px' 
                }}
                itemStyle={{ color: '#2DDC8F' }}
              />
              <Bar dataKey="births" radius={[2, 2, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === data.length - 1 ? '#2DDC8F' : '#2DDC8F40'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
