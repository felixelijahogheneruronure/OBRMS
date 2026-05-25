"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CheckCircle2, Baby, Calendar, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    weight: '',
    dob: '',
    time: '',
    facility: '',
    state: '',
    lga: '',
    motherName: '',
    motherNin: '',
    fatherName: '',
    fatherNin: '',
  });
  const [generatedId, setGeneratedId] = useState("");
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveRegistration = () => {
    const prefix = formData.state?.slice(0, 2).toUpperCase() || "NG";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const newId = `${prefix}-BR-${year}-${randomNum}`;
    setGeneratedId(newId);

    const newRecord = {
      id: newId,
      childName: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob || new Date().toLocaleDateString(),
      gender: formData.gender,
      facility: formData.facility || localStorage.getItem('obrms_facility') || "General Hospital",
      motherName: formData.motherName,
      fatherName: formData.fatherName,
      dateRegistered: new Date().toISOString().split('T')[0],
      time: "Just now"
    };

    const existing = JSON.parse(localStorage.getItem('obrms_registrations') || '[]');
    localStorage.setItem('obrms_registrations', JSON.stringify([newRecord, ...existing]));
    
    // Dispatch custom event for real-time updates across components
    window.dispatchEvent(new Event('obrms_data_update'));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      saveRegistration();
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
          <CardDescription className="text-lg">Reference ID: {generatedId}</CardDescription>
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
          <Button variant="outline" className="w-full" onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(0);
            setFormData({
              firstName: '',
              lastName: '',
              gender: '',
              weight: '',
              dob: '',
              time: '',
              facility: '',
              state: '',
              lga: '',
              motherName: '',
              motherNin: '',
              fatherName: '',
              fatherNin: '',
            });
          }}>
            Start New Registration
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-2 md:py-6">
      <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:items-center justify-between px-2 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-headline font-bold text-primary">New Birth Registration</h2>
          <p className="text-muted-foreground text-xs md:text-sm">Official medical reporting intake.</p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Step {currentStep + 1} of {steps.length}</p>
          <h3 className="text-md md:text-lg font-headline font-bold">{steps[currentStep].title}</h3>
        </div>
      </div>

      <div className="mb-6 md:mb-8 flex gap-1 md:gap-2 px-2">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 md:h-2 flex-1 rounded-full transition-all duration-500",
              i <= currentStep ? "bg-primary shadow-[0_0_10px_rgba(45,220,143,0.3)]" : "bg-muted"
            )} 
          />
        ))}
      </div>

      <Card className="border-border shadow-2xl bg-card">
        <CardContent className="p-4 md:p-8 pt-6 md:pt-10">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter child's first name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Surname</Label>
                <Input id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter child's surname" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select onValueChange={(v) => handleSelectChange('gender', v)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Weight at Birth (kg)</Label>
                <Input id="weight" type="number" step="0.1" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 3.2" className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input id="dob" type="date" value={formData.dob} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Time of Birth</Label>
                <Input id="time" type="time" value={formData.time} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Place of Birth (Facility Name)</Label>
                <Input id="facility" value={formData.facility} onChange={handleInputChange} placeholder="Search medical facility..." className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>State of Birth</Label>
                <Select onValueChange={(v) => handleSelectChange('state', v)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lagos">Lagos</SelectItem>
                    <SelectItem value="Kano">Kano</SelectItem>
                    <SelectItem value="Rivers">Rivers</SelectItem>
                    <SelectItem value="Abuja">Abuja (FCT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>LGA of Birth</Label>
                <Input id="lga" value={formData.lga} onChange={handleInputChange} placeholder="Enter LGA" className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Mother's Full Name</Label>
                <Input id="motherName" value={formData.motherName} onChange={handleInputChange} placeholder="Enter mother's name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>NIN</Label>
                <Input id="motherNin" value={formData.motherNin} onChange={handleInputChange} placeholder="National Identity Number" className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Father's Full Name</Label>
                <Input id="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Enter father's name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>NIN</Label>
                <Input id="fatherNin" value={formData.fatherNin} onChange={handleInputChange} placeholder="National Identity Number" className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center py-6 md:py-12 text-center text-muted-foreground">
              <MapPin className="h-10 w-10 md:h-12 md:w-12 mb-4 opacity-20 text-primary" />
              <p className="text-sm md:text-base">Review and complete the registration process.</p>
              <div className="mt-6 md:mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10 w-full text-left">
                <p className="text-xs font-bold text-primary uppercase mb-2">Registration Summary</p>
                <p className="text-sm">Child: <strong>{formData.firstName} {formData.lastName}</strong></p>
                <p className="text-sm">Facility: <strong>{formData.facility || "System Default"}</strong></p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between p-4 md:p-8 border-t border-border bg-secondary/5 gap-3">
          <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0} className="w-full md:w-auto h-11 px-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} className="w-full md:w-auto h-11 px-8">
            {currentStep === steps.length - 1 ? 'Complete Registration' : 'Continue'} 
            {currentStep !== steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
