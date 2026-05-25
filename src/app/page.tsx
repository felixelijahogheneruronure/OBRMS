import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Baby, Activity, ShieldCheck, Map, Users, Download, ArrowRight, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { RollingCounter } from "@/components/dashboard/rolling-counter";
import { LiveTicker } from "@/components/dashboard/live-ticker";
import { PerSecondCounter } from "@/components/dashboard/per-second-counter";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-nigeria');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image 
                src="/logo.png" 
                alt="OBRMS Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-headline font-bold tracking-tight text-primary">OBRMS</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Nigeria Birth Registry</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/analytics" className="text-sm font-medium hover:text-primary transition-colors">National Analytics</Link>
            <Link href="/portal/parents" className="text-sm font-medium hover:text-primary transition-colors">Parent Portal</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Administration Login</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/admin">New Registration</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              <Activity className="h-3 w-3" />
              Live Population Monitor
            </div>
            
            <PerSecondCounter />

            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Nigeria’s Pulse, <br />
              <span className="text-primary">Digitized.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Real-time monitoring of national birthrates across all 36 states. Ensuring every child is accounted for through secure, high-integrity data via OBRMS.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-secondary/30 border-primary/20">
              <CardHeader>
                <CardDescription className="uppercase tracking-widest text-primary font-bold text-xs">National Birth Counter</CardDescription>
                <CardTitle className="text-4xl font-headline mt-2">Today&apos;s Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <RollingCounter value={842} className="text-7xl md:text-9xl text-primary" />
                <p className="text-center text-muted-foreground mt-4 font-medium">Estimated births as of 12:00 PM WAT</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <Baby className="h-6 w-6 text-accent mb-2" />
                  <CardTitle className="text-3xl font-headline">124k</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-medium text-muted-foreground uppercase">This Month</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <Activity className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-3xl font-headline">2.4%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-medium text-muted-foreground uppercase">Growth Rate</p>
                </CardContent>
              </Card>
              <Card className="bg-card col-span-2">
                <CardHeader className="pb-2">
                  <ShieldCheck className="h-6 w-6 text-emerald-400 mb-2" />
                  <CardTitle className="text-lg font-headline">Verified Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">12,842</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">+42 today</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <LiveTicker />

      {/* Portal Grid */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold mb-4">Access Portals</h2>
            <p className="text-muted-foreground">Tailored interfaces for healthcare providers, parents, and administrators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:border-primary transition-all cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-background transition-colors">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline">Administration Portal</CardTitle>
                <CardDescription>Reporting portal for registered hospitals and primary health centers.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 text-primary group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    Report Birth Data <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary transition-all cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-background transition-colors">
                  <Download className="h-6 w-6 text-accent group-hover:text-background" />
                </div>
                <CardTitle className="font-headline">Parent Self-Service</CardTitle>
                <CardDescription>Retrieve, verify and download birth certificates using registration IDs.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 text-accent group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/portal/parents" className="flex items-center gap-2">
                    Get Certificate <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary transition-all cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-background transition-colors">
                  <Map className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline">Admin Analytics</CardTitle>
                <CardDescription>Deep insights into demographic trends for government health officials.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 text-primary group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/dashboard/admin" className="flex items-center gap-2">
                    Open Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image 
                  src="/logo.png" 
                  alt="OBRMS Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-headline font-bold text-primary">OBRMS</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 grayscale opacity-70">
                <Image 
                  src="/ng.png" 
                  alt="Nigeria National Seal" 
                  fill 
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground">© 2026 Federal Ministry of Health, Nigeria. <br />Digital Identity & Vital Statistics Division.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Documentation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
