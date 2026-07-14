
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ChevronRight, Building2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HOSPITALS } from "@/lib/hospitals";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const hospital = HOSPITALS[0]; // Agbor General Hospital

  const extractNameFromEmail = (email: string) => {
    const namePart = email.split('@')[0];
    const cleanedName = namePart.replace(/[0-9]/g, '');
    const parts = cleanedName.split(/[\._-]/).filter(Boolean);
    if (parts.length === 0) return "Administrator";
    return parts
      .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(' ');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userName = extractNameFromEmail(email);
    
    localStorage.setItem('obrms_user_name', userName);
    localStorage.setItem('obrms_user_email', email);
    localStorage.setItem('obrms_facility', hospital.name);
    localStorage.setItem('obrms_zone', hospital.zone);

    setTimeout(() => {
      router.push("/dashboard/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex flex-col items-center gap-6 mb-4">
            <div className="flex items-center gap-4">
               <div className="relative h-16 w-16">
                <Image 
                  src="/ng.png" 
                  alt="Federal Republic of Nigeria" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="relative h-16 w-16">
                <Image 
                  src="/logo.png" 
                  alt="OBRMS Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-headline font-bold text-primary block tracking-tight">OBRMS Staff Portal</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">National Population Commission</span>
            </div>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">{hospital.name}</h1>
            <p className="text-muted-foreground">Authorized Access Only</p>
          </div>
        </div>

        <Card className="border-border shadow-2xl bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Staff Authentication
            </CardTitle>
            <CardDescription>Enter your official credentials to access the registration vault.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Active Facility</p>
                  <p className="text-sm font-medium">{hospital.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{hospital.address}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Medical Officer Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@hospital.gov.ng" 
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Security Token / Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-12 pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold gap-2" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Authorize Session"}
                {!isLoading && <ChevronRight className="h-5 w-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-bold">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Federal Security Protocol v2.4 Active
        </div>
      </div>
    </div>
  );
}
