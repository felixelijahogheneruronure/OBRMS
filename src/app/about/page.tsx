"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Baby, BookOpen, ShieldCheck, FileText, Phone, Mail, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 px-8 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/"><ArrowLeft className="h-4 w-4" /> Back to Home</Link>
          </Button>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-headline font-bold text-primary">Resources & Information</h1>
        </div>
      </header>

      <main className="container mx-auto p-8 space-y-12">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-4xl font-headline font-bold">Empowering Every Birth Registration</h2>
          <p className="text-muted-foreground text-lg">
            LUMEN NG is Nigeria's official digital initiative to ensure that every child born within the Federation is recognized, protected, and accounted for from day one.
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
              All registration data is encrypted and stored in high-security federal servers, compliant with national data protection regulations.
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
                <AccordionTrigger>Who can register a birth?</AccordionTrigger>
                <AccordionContent>
                  Either parent, the medical officer in charge of the facility, or a designated notifier can initiate the registration process through the Administration Login.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What if the birth happened at home?</AccordionTrigger>
                <AccordionContent>
                  Home births should be reported to the nearest Primary Health Center (PHC). The local health official will verify the details and register the child in the LUMEN NG system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How much does registration cost?</AccordionTrigger>
                <AccordionContent>
                  Standard registration within 60 days of birth is completely free of charge across all government-registered facilities in Nigeria.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I retrieve a lost certificate?</AccordionTrigger>
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
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@lumen.gov.ng</p>
                    <p className="text-xs text-muted-foreground mt-1">Response time: Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">National Helpdesk</p>
                    <p className="text-sm text-muted-foreground">0800-LUMEN-NG (Toll Free)</p>
                    <p className="text-xs text-muted-foreground mt-1">Available 8 AM - 4 PM WAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
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
        <div className="container mx-auto px-8 text-center">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            Federal Ministry of Health & Population - LUMEN NG DATA STREAMING v2.4
          </p>
        </div>
      </footer>
    </div>
  );
}
