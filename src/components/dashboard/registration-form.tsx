
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CheckCircle2, Baby, Calendar, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  { id: 'child', title: 'Child Details', icon: Baby },
  { id: 'event', title: 'Birth Event', icon: Calendar },
  { id: 'mother', title: 'Mother Details', icon: User },
  { id: 'father', title: 'Father Details', icon: User },
  { id: 'notifier', title: 'Notifier', icon: MapPin },
];

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
      toast({
        title: "Registration Complete",
        description: "The birth record has been securely submitted to the national database.",
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md w-full mx-auto text-center py-12 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Registration Successful</CardTitle>
          <CardDescription className="text-lg">Reference ID: LG-BR-2024-88492</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The birth certificate has been generated and is ready for verification. You can now download the official copy or return to overview.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full h-12 text-lg">
            Download Certificate
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
            Start New Registration
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-12 flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-headline font-bold text-primary">New Birth Registration</h2>
          <p className="text-muted-foreground text-sm">Official medical reporting intake.</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Step {currentStep + 1} of {steps.length}</p>
          <h3 className="text-lg font-headline font-bold">{steps[currentStep].title}</h3>
        </div>
      </div>

      <div className="mb-8 flex gap-2 px-2">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-500",
              i <= currentStep ? "bg-primary shadow-[0_0_10px_rgba(45,220,143,0.3)]" : "bg-muted"
            )} 
          />
        ))}
      </div>

      <Card className="border-border shadow-2xl bg-card">
        <CardContent className="p-8 pt-10">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter child's first name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Surname</Label>
                <Input id="lastName" placeholder="Enter child's surname" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Weight at Birth (kg)</Label>
                <Input type="number" step="0.1" placeholder="e.g. 3.2" className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Time of Birth</Label>
                <Input type="time" className="h-11" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Place of Birth (Facility Name)</Label>
                <Input placeholder="Search medical facility..." className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>State of Birth</Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="rivers">Rivers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>LGA of Birth</Label>
                <Input placeholder="Enter LGA" className="h-11" />
              </div>
            </div>
          )}

          {currentStep > 1 && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <User className="h-12 w-12 mb-4 opacity-20" />
              <p>Additional sections for {steps[currentStep].title} follow standard demographic data requirements.</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Enter details" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label>NIN (Optional)</Label>
                  <Input placeholder="National Identity Number" className="h-11" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-8 border-t border-border bg-secondary/5">
          <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0} className="h-11 px-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} className="h-11 px-8">
            {currentStep === steps.length - 1 ? 'Complete Registration' : 'Continue'} 
            {currentStep !== steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
