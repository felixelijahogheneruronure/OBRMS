"use client";

import React from 'react';
import { RealTimeBirthHistogram } from "@/components/dashboard/real-time-birth-histogram";
import { LiveTicker } from "@/components/dashboard/live-ticker";
import { PerSecondCounter } from "@/components/dashboard/per-second-counter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Baby, Map, TrendingUp, Users, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';

const stateDistribution = [
  { name: 'Lagos', value: 35, color: '#10b981' },
  { name: 'Kano', value: 25, color: '#10b98180' },
  { name: 'Rivers', value: 15, color: '#10b98160' },
  { name: 'Oyo', value: 12, color: '#10b98140' },
  { name: 'Others', value: 13, color: '#10b98120' },
];

export default function NationalAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <header className="border-b border-border bg-card/50 px-8 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
          </Button>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image 
                src="/logo.png" 
                alt="OBRMS Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <h1 className="font-headline font-bold text-primary">OBRMS Intelligence</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Federal Live Stream</span>
        </div>
      </header>

      <main className="container mx-auto p-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-bold">Nigeria's Demographic Pulse</h2>
            <p className="text-muted-foreground max-w-2xl">
              Real-time monitoring of population growth and birth activity across the Federation. Data sourced from 14,000+ verified medical facilities via OBRMS.
            </p>
          </div>
          <PerSecondCounter />
        </div>

        <LiveTicker />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Histogram */}
          <div className="lg:col-span-2">
            <RealTimeBirthHistogram />
          </div>

          {/* Side Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-headline">Geographic Distribution</CardTitle>
              <CardDescription>Live reporting volume by top zones</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stateDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stateDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {stateDistribution.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Reporting Efficiency", value: "94.2%", icon: Activity, trend: "+1.2%" },
            { label: "Daily Avg. Births", value: "20,582", icon: Baby, trend: "+45" },
            { label: "Growth Index", value: "2.58", icon: TrendingUp, trend: "Stable" },
            { label: "Medical Zones", value: "36 + FCT", icon: Map, trend: "Active" },
          ].map((stat, i) => (
            <Card key={i} className="bg-card">
              <CardHeader className="pb-2">
                <stat.icon className="h-4 w-4 text-primary mb-2" />
                <CardDescription className="text-xs uppercase font-bold tracking-widest">{stat.label}</CardDescription>
                <CardTitle className="text-3xl font-headline">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-xs font-bold text-primary">{stat.trend}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="mt-auto border-t border-border bg-card py-12">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="relative h-10 w-10">
              <Image 
                src="/ng.png" 
                alt="Nigeria Seal" 
                fill 
                className="object-contain grayscale"
              />
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              Federal Ministry of Health & Population - OBRMS INTEL v2.4
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">Documentation</Link>
            <Link href="/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
