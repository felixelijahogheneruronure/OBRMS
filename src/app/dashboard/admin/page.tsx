
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, Filter, Map, Users, TrendingUp, Bell, Search, Activity, 
  Baby, PlusCircle, Menu, ShieldCheck, AlertTriangle, UserPlus, Trash2, Printer, Eye, FileText, Check, Building2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RegistrationForm } from "@/components/dashboard/registration-form";
import { RealTimeBirthHistogram } from "@/components/dashboard/real-time-birth-histogram";
import { BirthCertificateDocument } from "@/components/dashboard/birth-certificate-document";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { exportToCSV } from "@/lib/export-utils";
import Image from "next/image";
import Link from "next/link";

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onItemClick?: () => void;
  userName: string;
  hospitalName: string;
}

const SidebarNav = ({ activeTab, setActiveTab, onItemClick, userName, hospitalName }: NavProps) => {
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || "AD";

  return (
    <div className="flex flex-col h-full gap-8">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image src="/logo.png" alt="OBRMS Logo" fill className="object-contain" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-headline font-bold text-primary tracking-tight">OBRMS</span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Facility Dashboard</span>
        </div>
      </Link>
      
      <nav className="flex flex-col gap-2">
        <Button 
          variant={activeTab === "overview" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "overview" && "bg-primary/10 text-primary")}
          onClick={() => { setActiveTab("overview"); onItemClick?.(); }}
        >
          <TrendingUp className="h-4 w-4" /> Hospital Overview
        </Button>
        <Button 
          variant={activeTab === "registration" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "registration" && "bg-primary/10 text-primary")}
          onClick={() => { setActiveTab("registration"); onItemClick?.(); }}
        >
          <PlusCircle className="h-4 w-4" /> New Registration
        </Button>
        <Button 
          variant={activeTab === "certificates" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "certificates" && "bg-primary/10 text-primary")}
          onClick={() => { setActiveTab("certificates"); onItemClick?.(); }}
        >
          <FileText className="h-4 w-4" /> Issued Certificates
        </Button>
      </nav>

      <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
        <div className="px-2">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Secure Staff Access</span>
          </div>
          <p className="text-xs font-bold text-foreground leading-tight">{hospitalName}</p>
        </div>
        
        <Card className="bg-secondary/50 border-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">{initials}</div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{userName}</p>
                <p className="text-[10px] uppercase text-muted-foreground truncate">Medical Officer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [allSubmissions, setAllSubmissions] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [userName, setUserName] = useState("Administrator");
  const [hospitalName, setHospitalName] = useState("Agbor General Hospital");
  const { toast } = useToast();

  const loadData = () => {
    const saved = JSON.parse(localStorage.getItem('obrms_registrations') || '[]');
    setAllSubmissions(saved);
  };

  useEffect(() => {
    setIsMounted(true);
    const storedName = localStorage.getItem('obrms_user_name');
    const storedHospital = localStorage.getItem('obrms_facility');
    if (storedName) setUserName(storedName);
    if (storedHospital) setHospitalName(storedHospital);
    
    loadData();
    window.addEventListener('obrms_data_update', loadData);
    return () => window.removeEventListener('obrms_data_update', loadData);
  }, []);

  const filteredSubmissions = useMemo(() => {
    return allSubmissions.filter(sub => {
      const matchesSearch = 
        sub.childName?.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        sub.id?.toLowerCase().includes(globalSearchQuery.toLowerCase());
      
      const matchesHospital = sub.facility === hospitalName;
      return matchesSearch && matchesHospital;
    });
  }, [allSubmissions, globalSearchQuery, hospitalName]);

  const handlePrint = () => window.print();

  const handleExport = () => {
    const date = new Date().toISOString().split('T')[0];
    exportToCSV(filteredSubmissions, `${hospitalName.replace(/\s+/g, '_')}_Records_${date}`);
    toast({
      title: "Export Successful",
      description: `CSV file with ${filteredSubmissions.length} records generated.`,
    });
  };

  const openCertificate = (record: any) => {
    setSelectedRecord(record);
    setIsCertOpen(true);
  };

  if (!isMounted) return null;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <aside className="w-64 border-r border-border bg-card hidden lg:flex flex-col p-6 overflow-y-auto print:hidden">
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} userName={userName} hospitalName={hospitalName} />
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-border bg-card/50 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md print:hidden">
          <div className="flex items-center gap-4 max-w-md w-full">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-6 w-64">
                <SidebarNav 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  userName={userName}
                  hospitalName={hospitalName}
                  onItemClick={() => setIsMobileMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet>
            <div className="hidden sm:flex items-center gap-4 w-full">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={`Search records in ${hospitalName}...`} 
                className="border-none bg-transparent h-10 px-0 focus-visible:ring-0" 
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" onClick={handleExport}>
              <Download className="h-4 w-4" /> Export Facility Data
            </Button>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              {filteredSubmissions.length > 0 && <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background" />}
            </Button>
          </div>
        </header>

        <div className="p-4 lg:p-8 print:p-0">
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500 print:hidden">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-headline font-bold">{hospitalName}</h1>
                  <p className="text-muted-foreground text-sm lg:text-base">Managing local birth registrations and reporting.</p>
                </div>
                <Badge variant="outline" className="px-3 py-1 bg-emerald-50 text-emerald-700 border-emerald-200 uppercase tracking-widest font-bold text-[10px]">
                  Official Zonal Registry
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                  { label: "Total Hospital Births", value: filteredSubmissions.length.toLocaleString(), icon: TrendingUp, color: "text-primary" },
                  { label: "Daily Registrations", value: filteredSubmissions.filter(s => s.dateRegistered === new Date().toISOString().split('T')[0]).length.toString(), icon: Activity, color: "text-accent" },
                  { label: "Certificates Printed", value: filteredSubmissions.length.toString(), icon: Baby, color: "text-accent" },
                  { label: "Security Status", value: "Locked", icon: ShieldCheck, color: "text-primary" },
                ].map((stat, i) => (
                  <Card key={i} className="bg-card">
                    <CardHeader className="pb-2">
                      <CardDescription className={cn("text-xs uppercase font-bold tracking-widest", stat.color)}>{stat.label}</CardDescription>
                      <CardTitle className="text-3xl font-headline">{stat.value}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Recent Verified Records</CardTitle>
                  <CardDescription>Verified birth registrations originating from {hospitalName}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Child Name</TableHead>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.slice(0, 5).map((sub, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-bold">{sub.childName}</TableCell>
                            <TableCell className="font-mono text-xs text-primary">{sub.id}</TableCell>
                            <TableCell><Badge variant="outline" className="text-[10px] uppercase">{sub.gender}</Badge></TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => openCertificate(sub)} className="h-8 gap-2">
                                <Printer className="h-4 w-4" /> Print
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">No local records found. Start a new registration.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "registration" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 print:hidden">
              <RegistrationForm />
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-8 animate-in fade-in duration-500 print:hidden">
              <h1 className="text-3xl font-headline font-bold">Issued Certificates</h1>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Record ID</TableHead>
                        <TableHead>Child's Full Name</TableHead>
                        <TableHead>Reg. Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map((cert, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-mono text-xs font-bold text-primary">{cert.id}</TableCell>
                            <TableCell className="font-bold">{cert.childName}</TableCell>
                            <TableCell className="text-xs">{cert.dateRegistered}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" onClick={() => openCertificate(cert)} className="h-8 gap-2">
                                <Printer className="h-4 w-4" /> Print
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">No certificates found to list.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isCertOpen} onOpenChange={setIsCertOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-muted/30">
          <DialogHeader className="p-6 bg-card border-b sticky top-0 z-50 flex flex-row items-center justify-between space-y-0 print:hidden">
            <div>
              <DialogTitle className="font-headline text-xl">Official Certificate Preview</DialogTitle>
              <p className="text-sm text-muted-foreground">Facility: {hospitalName}</p>
            </div>
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" /> Print Document
            </Button>
          </DialogHeader>
          <div className="p-4 md:p-8 bg-muted/20">
            {selectedRecord && (
              <BirthCertificateDocument 
                data={{
                  childName: selectedRecord.childName,
                  dob: selectedRecord.dob,
                  gender: selectedRecord.gender,
                  placeOfBirth: selectedRecord.facility,
                  motherName: selectedRecord.motherName,
                  fatherName: selectedRecord.fatherName,
                  regId: selectedRecord.id,
                  dateRegistered: selectedRecord.dateRegistered
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
