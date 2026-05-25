"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HOSPITALS } from "@/lib/hospitals";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facility, setFacility] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      router.push("/dashboard/admin");
    }, 1500);
  };

  const zones = ["Western", "Eastern", "Central", "Northern"];

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
                  src="/npc.png" 
                  alt="National Population Commission" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-headline font-bold text-primary block tracking-tight">OBRMS Administration</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">National Population Commission</span>
            </div>
          </Link>
          <h1 className="text-3xl font-headline font-bold">Authorized Access</h1>
          <p className="text-muted-foreground">Secure gateway for medical and administrative personnel.</p>
        </div>

        <Card className="border-border shadow-2xl bg-card">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Select your facility and enter your administrative credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="facility">Medical Facility / Clinic</Label>
                <Select onValueChange={setFacility} required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Search registered facilities..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {zones.map(zone => (
                      <SelectGroup key={zone}>
                        <SelectLabel className="bg-primary/5 text-primary sticky top-0 z-10">{zone} Zone</SelectLabel>
                        {HOSPITALS.filter(h => h.zone === zone).map(h => (
                          <SelectItem key={h.name} value={h.name}>
                            <div className="flex flex-col text-left">
                              <span className="font-medium">{h.name}</span>
                              <span className="text-[10px] text-muted-foreground uppercase">{h.address}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Administrative Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@obrms.gov.ng" 
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Security Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold gap-2" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Access Dashboard"}
                {!isLoading && <ChevronRight className="h-5 w-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-bold">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Federal Security Protocol Active
        </div>
      </div>
    </div>
  );
}
