"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Download, FileCheck, AlertCircle, Menu, Home, Globe, Info } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function ParentPortal() {
  const [regId, setRegId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        name: "Ifeanyi Chinedu Okeke",
        dob: "August 12, 2024",
        facility: "Enugu State University Teaching Hospital",
        regId: "EN-BR-2024-5512",
        status: "Verified"
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border py-4 px-4 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
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
              <span className="font-headline font-bold text-primary">OBRMS</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Parent Portal</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/">Back to Home</Link>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="font-headline font-bold text-primary">Parent Services</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-3">
                    <Home className="h-5 w-5" /> Home
                  </Link>
                  <Link href="/analytics" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-3">
                    <Globe className="h-5 w-5" /> National Analytics
                  </Link>
                  <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-3">
                    <Info className="h-5 w-5" /> Resources
                  </Link>
                  <hr className="border-border" />
                  <Button asChild className="w-full">
                    <Link href="/login">Administration Login</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl lg:text-4xl font-headline font-bold">Certificate Portal</h1>
            <p className="text-muted-foreground text-sm lg:text-base">Retrieve your child&apos;s official birth certificate using the OBRMS registration ID provided by your hospital.</p>
          </div>

          <Card className="border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Search Registration</CardTitle>
              <CardDescription>Enter the Registration ID and parent surname to verify and download.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="regId">Registration ID</Label>
                    <Input 
                      id="regId" 
                      placeholder="e.g. LG-BR-2024-XXXX" 
                      className="h-11"
                      value={regId}
                      onChange={(e) => setRegId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Mother&apos;s Surname</Label>
                    <Input id="parentName" placeholder="Enter surname" className="h-11" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-lg gap-2" disabled={isSearching}>
                  {isSearching ? "Searching Records..." : "Search Records"} <Search className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <Alert className="mb-6 border-primary/50 bg-primary/5">
                <FileCheck className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary font-bold">Record Found</AlertTitle>
                <AlertDescription>
                  Verification complete. Digital certificate is ready for download.
                </AlertDescription>
              </Alert>

              <Card className="bg-secondary/30 border-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/10 border-b border-primary/20">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <CardTitle className="font-headline text-xl lg:text-2xl">{result.name}</CardTitle>
                      <CardDescription className="font-medium text-primary">Registration: {result.regId}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary">OFFICIAL RECORD</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Date of Birth</p>
                      <p className="font-medium">{result.dob}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Issuing Facility</p>
                      <p className="font-medium text-sm lg:text-base">{result.facility}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-card/50 p-4 lg:p-6 flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:flex-1 h-12 gap-2 text-lg">
                    <Download className="h-5 w-5" /> Download Certificate
                  </Button>
                  <Button variant="outline" className="h-12 w-full sm:w-12 p-0">
                    <FileCheck className="h-6 w-6" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {!result && !isSearching && (
            <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg text-sm text-muted-foreground">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p>Common OBRMS IDs look like <span className="font-mono text-primary font-bold">ST-BR-2024-XXXX</span>. Check your hospital handout if you can&apos;t find it.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 border-t border-border bg-card flex flex-col items-center gap-4 text-center">
         <div className="relative h-10 w-10 grayscale opacity-70">
          <Image 
            src="/ng.png" 
            alt="Nigeria Seal" 
            fill 
            className="object-contain"
          />
        </div>
        <p className="text-xs text-muted-foreground px-4">
          &copy; 2026 OBRMS Population Intelligence System. Federal Republic of Nigeria.
        </p>
      </footer>
    </div>
  );
}
