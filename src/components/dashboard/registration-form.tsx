"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, CheckCircle2, Baby, Calendar, User, MapPin, Printer, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { BirthCertificateDocument } from "./birth-certificate-document";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const steps = [
  { id: 'child', title: 'Child Details', icon: Baby },
  { id: 'event', title: 'Birth Event', icon: Calendar },
  { id: 'mother', title: 'Mother Details', icon: User },
  { id: 'father', title: 'Father Details', icon: User },
  { id: 'review', title: 'Review', icon: CheckCircle2 },
];

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hospitalContext, setHospitalContext] = useState({ name: '', zone: '' });
  
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

  useEffect(() => {
    const name = localStorage.getItem('obrms_facility') || "General Hospital";
    const zone = localStorage.getItem('obrms_zone') || "Western";
    setHospitalContext({ name, zone });
    setFormData(prev => ({ ...prev, facility: name }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveRegistration = () => {
    const prefix = hospitalContext.name.slice(0, 2).toUpperCase() || "NG";
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
      facility: hospitalContext.name,
      motherName: formData.motherName,
      fatherName: formData.fatherName,
      dateRegistered: new Date().toISOString().split('T')[0],
      time: "Just now",
      zone: hospitalContext.zone
    };

    const existing = JSON.parse(localStorage.getItem('obrms_registrations') || '[]');
    localStorage.setItem('obrms_registrations', JSON.stringify([newRecord, ...existing]));
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
        description: "Official record saved to National Database.",
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Card className="max-w-md w-full mx-auto text-center py-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">Record Verified</CardTitle>
            <CardDescription className="text-lg">Ref: {generatedId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Official birth certificate for <strong>{formData.firstName} {formData.lastName}</strong> is ready for issuance at {hospitalContext.name}.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full h-12 text-lg gap-2" onClick={() => setIsPreviewOpen(true)}>
              <Printer className="h-5 w-5" /> Print Certificate
            </Button>
            <Button variant="outline" className="w-full" onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
              setFormData(prev => ({ ...prev, firstName: '', lastName: '', weight: '', dob: '', time: '', motherName: '', motherNin: '', fatherName: '', fatherNin: '' }));
            }}>
              New Registration
            </Button>
          </CardFooter>
        </Card>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-5xl w-[95vw] h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-muted/30">
            <DialogHeader className="p-6 bg-card border-b sticky top-0 z-50 flex flex-row items-center justify-between space-y-0 print:hidden">
              <DialogTitle className="font-headline text-xl">Verified Certificate Issuance</DialogTitle>
              <Button onClick={() => window.print()} className="gap-2">
                <Printer className="h-4 w-4" /> Print Document
              </Button>
            </DialogHeader>
            <div className="p-4 md:p-8 bg-muted/20">
              <BirthCertificateDocument 
                data={{
                  childName: `${formData.firstName} ${formData.lastName}`,
                  dob: formData.dob || new Date().toLocaleDateString(),
                  gender: formData.gender,
                  placeOfBirth: hospitalContext.name,
                  motherName: formData.motherName,
                  fatherName: formData.fatherName,
                  regId: generatedId,
                  dateRegistered: new Date().toISOString().split('T')[0]
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-2">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between px-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-headline font-bold text-primary">Birth Intake Form</h2>
            <p className="text-muted-foreground text-xs">{hospitalContext.name}</p>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Step {currentStep + 1} of {steps.length}</p>
          <h3 className="text-md font-headline font-bold">{steps[currentStep].title}</h3>
        </div>
      </div>

      <div className="mb-8 flex gap-2 px-2">
        {steps.map((_, i) => (
          <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= currentStep ? "bg-primary" : "bg-muted")} />
        ))}
      </div>

      <Card className="border-border shadow-2xl bg-card">
        <CardContent className="p-6 pt-10">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Child First Name</Label>
                <Input id="firstName" value={formData.firstName} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Child Surname</Label>
                <Input id="lastName" value={formData.lastName} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select onValueChange={(v) => handleSelectChange('gender', v)}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Birth Weight (kg)</Label>
                <Input id="weight" type="number" step="0.1" value={formData.weight} onChange={handleInputChange} className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input id="dob" type="date" value={formData.dob} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Time of Birth</Label>
                <Input id="time" type="time" value={formData.time} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Assigned Medical Facility</Label>
                <Input value={hospitalContext.name} disabled className="h-11 bg-muted cursor-not-allowed" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Mother's Full Legal Name</Label>
                <Input id="motherName" value={formData.motherName} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Mother's NIN</Label>
                <Input id="motherNin" value={formData.motherNin} onChange={handleInputChange} placeholder="11-digit NIN" className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Father's Full Legal Name</Label>
                <Input id="fatherName" value={formData.fatherName} onChange={handleInputChange} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Father's NIN</Label>
                <Input id="fatherNin" value={formData.fatherNin} onChange={handleInputChange} placeholder="11-digit NIN" className="h-11" />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Final Submission Review</h4>
                <p className="text-muted-foreground text-sm">Review details before uploading to National Population Commission.</p>
              </div>
              <div className="bg-secondary/20 p-6 rounded-xl text-left grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Child</p>
                  <p className="text-sm font-bold">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Facility</p>
                  <p className="text-sm font-bold">{hospitalContext.name}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Mother</p>
                  <p className="text-sm font-bold">{formData.motherName}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-6 border-t bg-secondary/5">
          <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0} className="h-11 px-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} className="h-11 px-8 font-bold">
            {currentStep === steps.length - 1 ? 'Authorize & Submit' : 'Next Step'} 
            {currentStep !== steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
