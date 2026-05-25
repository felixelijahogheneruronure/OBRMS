"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell
} from 'recharts';
import { 
  Download, Filter, Map, Users, TrendingUp, Bell, Search, Activity, 
  Baby, PlusCircle, Menu, ShieldCheck, AlertTriangle, UserPlus, Trash2, Printer, Eye, FileText, Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RegistrationForm } from "@/components/dashboard/registration-form";
import { RealTimeBirthHistogram } from "@/components/dashboard/real-time-birth-histogram";
import { BirthCertificateDocument } from "@/components/dashboard/birth-certificate-document";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { HOSPITALS } from "@/lib/hospitals";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const stateData = [
  { name: 'Lagos', births: 14200, growth: 2.1 },
  { name: 'Kano', births: 13800, growth: 1.8 },
  { name: 'Oyo', births: 8400, growth: 0.5 },
  { name: 'Rivers', births: 9100, growth: 3.1 },
  { name: 'FCT', births: 7800, growth: 4.2 },
  { name: 'Kaduna', births: 7600, growth: -0.2 },
  { name: 'Anambra', births: 6400, growth: 1.1 },
  { name: 'Abia', births: 4200, growth: 0.8 },
  { name: 'Adamawa', births: 3800, growth: 1.2 },
  { name: 'Akwa Ibom', births: 5900, growth: 1.5 },
  { name: 'Bauchi', births: 4100, growth: 0.9 },
  { name: 'Bayelsa', births: 2800, growth: 2.4 },
  { name: 'Benue', births: 4300, growth: 0.6 },
  { name: 'Borno', births: 3200, growth: -1.1 },
  { name: 'Cross River', births: 4500, growth: 1.0 },
  { name: 'Delta', births: 6200, growth: 1.7 },
  { name: 'Ebonyi', births: 3100, growth: 0.5 },
  { name: 'Edo', births: 5400, growth: 1.2 },
  { name: 'Ekiti', births: 2900, growth: 0.4 },
  { name: 'Enugu', births: 4800, growth: 1.1 },
  { name: 'Gombe', births: 3000, growth: 0.7 },
  { name: 'Imo', births: 5100, growth: 0.9 },
  { name: 'Jigawa', births: 3900, growth: 1.3 },
  { name: 'Katsina', births: 4400, growth: 1.0 },
  { name: 'Kebbi', births: 3600, growth: 0.8 },
  { name: 'Kogi', births: 3700, growth: 0.6 },
  { name: 'Kwara', births: 3800, growth: 0.5 },
  { name: 'Nasarawa', births: 3200, growth: 2.1 },
  { name: 'Niger', births: 4100, growth: 0.9 },
  { name: 'Ogun', births: 6800, growth: 1.9 },
  { name: 'Ondo', births: 4600, growth: 0.8 },
  { name: 'Osun', births: 4400, growth: 0.7 },
  { name: 'Plateau', births: 4200, growth: 1.1 },
  { name: 'Sokoto', births: 3800, growth: 0.9 },
  { name: 'Taraba', births: 2900, growth: 0.5 },
  { name: 'Yobe', births: 2700, growth: 0.4 },
  { name: 'Zamfara', births: 3100, growth: 0.6 },
];

const mockSubmissions = [
  { 
    facility: "Lagos Island Maternity Hospital", 
    location: "Lagos State", 
    id: "LG-BR-2024-1001", 
    time: "12 mins ago",
    childName: "Oluwaseun Adeyemi",
    dob: "February 24, 2026",
    gender: "Male",
    motherName: "Blessing Adeyemi",
    fatherName: "Olumide Adeyemi",
    dateRegistered: "2026-02-24",
    zone: "Western"
  },
  { 
    facility: "NIMASA SAR Base Clinic", 
    location: "Lagos State", 
    id: "LG-BR-2024-1002", 
    time: "24 mins ago",
    childName: "Chisom Okoro",
    dob: "February 23, 2026",
    gender: "Female",
    motherName: "Ifunanya Okoro",
    fatherName: "Chidi Okoro",
    dateRegistered: "2026-02-24",
    zone: "Western"
  },
  { 
    facility: "AB Health Consortium Ltd", 
    location: "Rivers State", 
    id: "RV-BR-2024-5512", 
    time: "36 mins ago",
    childName: "Ifeanyi Nwachukwu",
    dob: "February 22, 2026",
    gender: "Male",
    motherName: "Ngozi Nwachukwu",
    fatherName: "Emeka Nwachukwu",
    dateRegistered: "2026-02-23",
    zone: "Eastern"
  },
];

const mockUsers = [
  { name: "Adekunle Olawale", role: "Master Admin", email: "a.olawale@obrms.gov.ng", status: "Active" },
  { name: "Chioma Okoro", role: "Zonal Supervisor", email: "c.okoro@obrms.gov.ng", status: "Active" },
];

const mockAlerts = [
  { type: "Security", message: "Failed login attempt detected from IP 192.168.1.45", time: "2 hours ago", severity: "high" },
  { type: "Data", message: "Discrepancy in reporting volume for Kano North Zone", time: "1 day ago", severity: "low" },
];

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onItemClick?: () => void;
  userName: string;
}

const SidebarNav = ({ activeTab, setActiveTab, onItemClick, userName }: NavProps) => {
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
          <Image 
            src="/logo.png" 
            alt="OBRMS Logo" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-headline font-bold text-primary tracking-tight">OBRMS</span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Admin Panel</span>
        </div>
      </Link>
      
      <nav className="flex flex-col gap-2">
        <Button 
          variant={activeTab === "overview" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "overview" && "bg-primary/10 text-primary")}
          onClick={() => {
            setActiveTab("overview");
            onItemClick?.();
          }}
        >
          <TrendingUp className="h-4 w-4" /> National Analytics
        </Button>
        <Button 
          variant={activeTab === "registration" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "registration" && "bg-primary/10 text-primary")}
          onClick={() => {
            setActiveTab("registration");
            onItemClick?.();
          }}
        >
          <PlusCircle className="h-4 w-4" /> New Registration
        </Button>
        <Button 
          variant={activeTab === "certificates" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "certificates" && "bg-primary/10 text-primary")}
          onClick={() => {
            setActiveTab("certificates");
            onItemClick?.();
          }}
        >
          <FileText className="h-4 w-4" /> Issued Certificates
        </Button>
        <Button 
          variant={activeTab === "states" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "states" && "bg-primary/10 text-primary")}
          onClick={() => {
            setActiveTab("states");
            onItemClick?.();
          }}
        >
          <Map className="h-4 w-4" /> State Breakdown
        </Button>
        <Button 
          variant={activeTab === "users" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "users" && "bg-primary/10 text-primary")}
          onClick={() => {
            setActiveTab("users");
            onItemClick?.();
          }}
        >
          <Users className="h-4 w-4" /> User Management
        </Button>
        <Button 
          variant={activeTab === "alerts" ? "secondary" : "ghost"} 
          className={cn("justify-start gap-3", activeTab === "alerts" && "bg-primary/10 text-primary")}
          onClick={() => {
            setActiveTab("alerts");
            onItemClick?.();
          }}
        >
          <Bell className="h-4 w-4" /> System Alerts
        </Button>
      </nav>

      <div className="mt-auto pt-6 border-t border-border flex flex-col gap-6">
        <div className="flex items-center justify-center grayscale opacity-50">
           <div className="relative h-12 w-12">
            <Image 
              src="/ng.png" 
              alt="Nigeria Seal" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
        <Card className="bg-secondary/50 border-none">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-3">Administrator Access</p>
            <div className="flex items-center gap-3 text-left">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs shrink-0">{initials}</div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{userName}</p>
                <p className="text-[10px] uppercase text-muted-foreground truncate">Admin Officer</p>
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
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [userName, setUserName] = useState("Administrator");
  const { toast } = useToast();

  const loadData = () => {
    const saved = JSON.parse(localStorage.getItem('obrms_registrations') || '[]');
    setAllSubmissions([...saved, ...mockSubmissions]);
  };

  useEffect(() => {
    setIsMounted(true);
    const storedName = localStorage.getItem('obrms_user_name');
    if (storedName) {
      setUserName(storedName);
    }
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('obrms_data_update', handleUpdate);
    return () => window.removeEventListener('obrms_data_update', handleUpdate);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const triggerRandomNotification = () => {
      const randomHospital = HOSPITALS[Math.floor(Math.random() * HOSPITALS.length)];
      const randomGender = Math.random() > 0.5 ? "Male" : "Female";
      
      toast({
        title: "Live Activity Monitor",
        description: `Incoming report: A ${randomGender} child registered at ${randomHospital.name}.`,
      });
    };

    const intervalId = setInterval(triggerRandomNotification, 40000 + Math.random() * 20000);
    return () => clearInterval(intervalId);
  }, [isMounted, toast]);

  const filteredSubmissions = useMemo(() => {
    return allSubmissions.filter(sub => {
      const matchesSearch = 
        sub.childName.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        sub.id.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        sub.facility.toLowerCase().includes(globalSearchQuery.toLowerCase());
      
      const matchesZone = selectedZones.length === 0 || selectedZones.includes(sub.zone || "Western");

      return matchesSearch && matchesZone;
    });
  }, [allSubmissions, globalSearchQuery, selectedZones]);

  if (!isMounted) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  const openCertificate = (record: any) => {
    setSelectedRecord(record);
    setIsCertOpen(true);
  };

  const toggleZone = (zone: string) => {
    setSelectedZones(prev => 
      prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]
    );
  };

  const sortedStates = [...stateData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:flex flex-col p-6 overflow-y-auto print:hidden">
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} userName={userName} />
      </aside>

      {/* Main Content */}
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
                  onItemClick={() => setIsMobileMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet>
            <div className="hidden sm:flex items-center gap-4 w-full">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Real-time search across records..." 
                className="border-none bg-transparent h-10 px-0 focus-visible:ring-0" 
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-border">
                  <h4 className="font-headline font-bold">Recent System Alerts</h4>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {mockAlerts.map((alert, i) => (
                    <div key={i} className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setActiveTab("alerts")}>
                      <div className="flex justify-between items-start mb-1">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider",
                          alert.severity === 'high' ? "text-destructive" : "text-primary"
                        )}>
                          {alert.type}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-xs text-foreground font-medium">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        <div className="p-4 lg:p-8 print:p-0">
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500 print:hidden">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-headline font-bold">OBRMS National Dashboard</h1>
                  <p className="text-muted-foreground text-sm lg:text-base">Comprehensive real-time birthrate monitoring for Nigeria.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20">LIVE MONITORING</Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={selectedZones.length > 0 ? "default" : "outline"} size="sm" className="gap-2">
                        <Filter className="h-4 w-4" /> 
                        {selectedZones.length > 0 ? `${selectedZones.length} Zones` : "Filters"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4">
                      <h4 className="font-bold mb-4 text-sm">Filter by Zone</h4>
                      <div className="space-y-2">
                        {["Western", "Eastern", "Central", "Northern"].map(zone => (
                          <div 
                            key={zone} 
                            className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer text-sm"
                            onClick={() => toggleZone(zone)}
                          >
                            <span>{zone}</span>
                            {selectedZones.includes(zone) && <Check className="h-4 w-4 text-primary" />}
                          </div>
                        ))}
                      </div>
                      {selectedZones.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-4 h-8 text-xs text-destructive"
                          onClick={() => setSelectedZones([])}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <RealTimeBirthHistogram />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                  { label: "Total Births (YTD)", value: (1248932 + allSubmissions.length).toLocaleString(), icon: TrendingUp, color: "text-primary", trend: "+12.4%" },
                  { label: "Active Facilities", value: "14,281", icon: Activity, color: "text-accent", trend: "98.2%" },
                  { label: "Certificates Issued", value: (892122 + allSubmissions.length).toLocaleString(), icon: Baby, color: "text-accent", trend: "71% verified" },
                  { label: "Filtered Results", value: filteredSubmissions.length.toString(), icon: ShieldCheck, color: "text-primary", trend: "Real-time" },
                ].map((stat, i) => (
                  <Card key={i} className="bg-card">
                    <CardHeader className="pb-2">
                      <CardDescription className={cn("text-xs uppercase font-bold tracking-widest", stat.color)}>{stat.label}</CardDescription>
                      <CardTitle className="text-3xl lg:text-4xl font-headline">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={cn("flex items-center gap-2", stat.color)}>
                        <stat.icon className="h-4 w-4" />
                        <span className="text-sm font-bold">{stat.trend}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="overflow-x-auto">
                <CardHeader>
                  <CardTitle className="font-headline">Recent OBRMS Submissions</CardTitle>
                  <CardDescription>
                    {globalSearchQuery || selectedZones.length > 0 
                      ? `Showing ${filteredSubmissions.length} matches for your filters.`
                      : "Drill-down view of the latest verified birth records."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Child Name</TableHead>
                        <TableHead className="hidden md:table-cell">Facility</TableHead>
                        <TableHead>Record ID</TableHead>
                        <TableHead className="hidden sm:table-cell">Zone</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.slice(0, 15).map((sub, i) => (
                          <TableRow key={i} className="animate-in fade-in duration-300">
                            <TableCell className="font-bold">{sub.childName}</TableCell>
                            <TableCell className="hidden md:table-cell text-xs">{sub.facility}</TableCell>
                            <TableCell className="font-mono text-[10px] text-muted-foreground">{sub.id}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase">{sub.zone || "Western"}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 gap-2 text-primary"
                                onClick={() => openCertificate(sub)}
                              >
                                <Printer className="h-4 w-4" />
                                <span className="hidden sm:inline">Print</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                            No records matching your search or filters.
                          </TableCell>
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
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold">Issued Certificates</h1>
                  <p className="text-muted-foreground">Manage and reprint official OBRMS birth certificates.</p>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Record ID</TableHead>
                        <TableHead>Child's Full Name</TableHead>
                        <TableHead className="hidden md:table-cell">Mother's Name</TableHead>
                        <TableHead className="hidden lg:table-cell">Facility</TableHead>
                        <TableHead className="hidden sm:table-cell">Reg. Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map((cert, i) => (
                          <TableRow key={i} className="group hover:bg-primary/5 transition-colors">
                            <TableCell className="font-mono text-xs font-bold text-primary">{cert.id}</TableCell>
                            <TableCell className="font-bold">{cert.childName}</TableCell>
                            <TableCell className="hidden md:table-cell text-sm">{cert.motherName}</TableCell>
                            <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{cert.facility}</TableCell>
                            <TableCell className="hidden sm:table-cell text-xs">{cert.dateRegistered}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => openCertificate(cert)} className="h-8 gap-2">
                                  <Eye className="h-4 w-4" /> <span className="hidden xl:inline">View</span>
                                </Button>
                                <Button size="sm" onClick={() => openCertificate(cert)} className="h-8 gap-2">
                                  <Printer className="h-4 w-4" /> <span className="hidden xl:inline">Print</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                            No records found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "states" && (
            <div className="space-y-8 animate-in fade-in duration-500 print:hidden">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold">State Distribution</h1>
                  <p className="text-muted-foreground">Comprehensive demographic performance for all 36 states and the FCT.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedStates.map((state, i) => (
                  <Card key={i} className="hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="font-headline text-lg">{state.name}</CardTitle>
                        <Badge variant="secondary" className={cn(
                          state.growth > 0 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                        )}>
                          {state.growth > 0 ? `+${state.growth}%` : `${state.growth}%`}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-3xl font-headline font-bold">{state.births.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total Reg.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-8 animate-in fade-in duration-500 print:hidden">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold">User Management</h1>
                  <p className="text-muted-foreground">Manage administrative access levels.</p>
                </div>
                <Button className="gap-2"><UserPlus className="h-4 w-4" /> Add Officer</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-headline">Authorized Personnel</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUsers.map((user, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-bold">{user.name}</TableCell>
                            <TableCell className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{user.role}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-8 animate-in fade-in duration-500 print:hidden">
              <h1 className="text-3xl font-headline font-bold">System Security Alerts</h1>
              <div className="grid grid-cols-1 gap-4">
                {mockAlerts.map((alert, i) => (
                  <Card key={i} className={cn(
                    "border-l-4",
                    alert.severity === 'high' ? "border-l-destructive" : "border-l-primary"
                  )}>
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {alert.severity === 'high' ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <ShieldCheck className="h-5 w-5 text-primary" />}
                          <CardTitle className="text-lg font-headline">{alert.type} Notification</CardTitle>
                        </div>
                        <Badge variant="outline" className="text-[10px]">{alert.time}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm">{alert.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Certificate Modal */}
      <Dialog open={isCertOpen} onOpenChange={setIsCertOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-muted/30">
          <DialogHeader className="p-6 bg-card border-b sticky top-0 z-50 flex flex-row items-center justify-between space-y-0 print:hidden">
            <div>
              <DialogTitle className="font-headline text-xl">Official Birth Certificate Preview</DialogTitle>
              <p className="text-sm text-muted-foreground">Verified Record: {selectedRecord?.id}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePrint} className="gap-2">
                <Printer className="h-4 w-4" /> Print Document
              </Button>
            </div>
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
