"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Baby, BookOpen, ShieldCheck, FileText, Phone, Mail, ArrowLeft, Globe, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3 lg:gap-6">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/"><ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Home</span></Link>
          </Button>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image 
                src="/logo.png" 
                alt="OBRMS Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <h1 className="font-headline font-bold text-primary truncate">Resources & Info</h1>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader className="text-left mb-8">
              <SheetTitle className="font-headline font-bold text-primary">OBRMS Info</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6">
              <Link href="/" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-3">
                <ArrowLeft className="h-5 w-5" /> Back to Home
              </Link>
              <Link href="/analytics" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-3">
                <Globe className="h-5 w-5" /> National Analytics
              </Link>
              <Link href="/portal/parents" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-3">
                <Baby className="h-5 w-5" /> Parent Portal
              </Link>
              <hr className="border-border" />
              <Button asChild className="w-full">
                <Link href="/login">Administration Login</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="container mx-auto p-4 lg:p-8 space-y-12">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4 text-center lg:text-left mx-auto lg:mx-0">
          <h2 className="text-3xl lg:text-4xl font-headline font-bold">Empowering Every Birth Registration</h2>
          <p className="text-muted-foreground text-base lg:text-lg">
            OBRMS (Online Birthrate Monitoring System) is Nigeria's official digital initiative to ensure that every child born within the Federation is recognized, protected, and accounted for from day one.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="font-headline">Legal Framework</CardTitle>
              <CardDescription>Compulsory Registration Act</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Under the Births and Deaths Compulsory Registration Act, every birth in Nigeria must be registered within 60 days of the event.
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader>
              <Baby className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="font-headline">Child Rights</CardTitle>
              <CardDescription>Legal Identity & Protection</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              A birth certificate is a fundamental right. it provides access to healthcare, education, and protection against child labor and trafficking.
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="font-headline">Data Security</CardTitle>
              <CardDescription>Privacy and Integrity</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              All registration data in OBRMS is encrypted and stored in high-security federal servers, compliant with national data protection regulations.
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Accordion */}
          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" /> Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Who can register a birth?</AccordionTrigger>
                <AccordionContent>
                  Either parent, the medical officer in charge of the facility, or a designated notifier can initiate the registration process through the OBRMS Administration Login.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">What if the birth happened at home?</AccordionTrigger>
                <AccordionContent>
                  Home births should be reported to the nearest Primary Health Center (PHC). The local health official will verify the details and register the child in the OBRMS system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">How much does registration cost?</AccordionTrigger>
                <AccordionContent>
                  Standard registration within 60 days of birth is completely free of charge across all government-registered facilities in Nigeria.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">How do I retrieve a lost certificate?</AccordionTrigger>
                <AccordionContent>
                  You can use the Parent Portal with your Registration ID and the mother's surname to download a digital copy. For physical replacements, visit the NPopC office in your state.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-2">
              <Phone className="h-6 w-6 text-primary" /> Support & Contact
            </h3>
            <Card>
              <CardContent className="p-4 lg:p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Email Support</p>
                    <p className="text-sm text-muted-foreground break-all">support@obrms.gov.ng</p>
                    <p className="text-xs text-muted-foreground mt-1">Response time: Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">National Helpdesk</p>
                    <p className="text-sm text-muted-foreground">0800-OBRMS-NG (Toll Free)</p>
                    <p className="text-xs text-muted-foreground mt-1">Available 8 AM - 4 PM WAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Ministry Head Office</p>
                    <p className="text-sm text-muted-foreground">Federal Secretariat Complex, Phase III, Abuja, FCT.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="mt-24 border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <Image 
              src="/ng.png" 
              alt="Nigeria Seal" 
              fill 
              className="object-contain grayscale"
            />
          </div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest leading-relaxed">
            Federal Ministry of Health & Population - OBRMS Online Birthrate Monitoring System v2.4
          </p>
        </div>
      </footer>
    </div>
  );
}
