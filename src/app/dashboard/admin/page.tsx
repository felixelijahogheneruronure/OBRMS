"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell
} from 'recharts';
import { 
  Download, Filter, Map, Users, TrendingUp, Bell, Search, Activity, 
  Baby, PlusCircle, Menu, ShieldCheck, AlertTriangle, UserPlus, Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RegistrationForm } from "@/components/dashboard/registration-form";
import { RealTimeBirthHistogram } from "@/components/dashboard/real-time-birth-histogram";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { HOSPITALS } from "@/lib/hospitals";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const stateData = [
  { name: 'Lagos', births: 4200, growth: 2.1 },
  { name: 'Kano', births: 3800, growth: 1.8 },
  { name: 'Oyo', births: 2400, growth: 0.5 },
  { name: 'Rivers', births: 2100, growth: 3.1 },
  { name: 'FCT', births: 1800, growth: 4.2 },
  { name: 'Kaduna', births: 1600, growth: -0.2 },
  { name: 'Anambra', births: 1400, growth: 1.1 },
];

const monthlyTrend = [
  { month: 'Jan', count: 12000 },
  { month: 'Feb', count: 13500 },
  { month: 'Mar', count: 12800 },
  { month: 'Apr', count: 14200 },
  { month: 'May', count: 15100 },
  { month: 'Jun', count: 14800 },
];

const recentSubmissions = [
  { facility: "Lagos Island Maternity Hospital", location: "Lagos State", id: "LG-BR-2024-1001", time: "12 mins ago" },
  { facility: "NIMASA SAR Base Clinic", location: "Lagos State", id: "LG-BR-2024-1002", time: "24 mins ago" },
  { facility: "AB Health Consortium Ltd", location: "Rivers State", id: "RV-BR-2024-5512", time: "36 mins ago" },
  { facility: "King's Care Hospital Limited", location: "Abuja (FCT)", id: "FC-BR-2024-2201", time: "48 mins ago" },
  { facility: "BU Clinic/Hospital Ltd", location: "Delta State", id: "DT-BR-2024-8849", time: "55 mins ago" },
];

const mockUsers = [
  { name: "Adekunle Olawale", role: "Master Admin", email: "a.olawale@obrms.gov.ng", status: "Active" },
  { name: "Chioma Okoro", role: "Zonal Supervisor", email: "c.okoro@obrms.gov.ng", status: "Active" },
  { name: "Musa Ibrahim", role: "Verification Officer", email: "m.ibrahim@obrms.gov.ng", status: "Away" },
];

const mockAlerts = [
  { type: "Security", message: "Failed login attempt detected from IP 192.168.1.45", time: "2 hours ago", severity: "high" },
  { type: "System", message: "Database maintenance scheduled for Sunday 2AM WAT", time: "5 hours ago", severity: "medium" },
  { type: "Data", message: "Discrepancy in reporting volume for Kano North Zone", time: "1 day ago", severity: "low" },
];

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onItemClick?: () => void;
}

const SidebarNav = ({ activeTab, setActiveTab, onItemClick }: NavProps) => (
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
        className={`justify-start gap-3 ${activeTab === "overview" ? "bg-primary/10 text-primary" : ""}`}
        onClick={() => {
          setActiveTab("overview");
          onItemClick?.();
        }}
      >
        <TrendingUp className="h-4 w-4" /> National Analytics
      </Button>
      <Button 
        variant={activeTab === "registration" ? "secondary" : "ghost"} 
        className={`justify-start gap-3 ${activeTab === "registration" ? "bg-primary/10 text-primary" : ""}`}
        onClick={() => {
          setActiveTab("registration");
          onItemClick?.();
        }}
      >
        <PlusCircle className="h-4 w-4" /> New Registration
      </Button>
      <Button 
        variant={activeTab === "states" ? "secondary" : "ghost"} 
        className={`justify-start gap-3 ${activeTab === "states" ? "bg-primary/10 text-primary" : ""}`}
        onClick={() => {
          setActiveTab("states");
          onItemClick?.();
        }}
      >
        <Map className="h-4 w-4" /> State Breakdown
      </Button>
      <Button 
        variant={activeTab === "users" ? "secondary" : "ghost"} 
        className={`justify-start gap-3 ${activeTab === "users" ? "bg-primary/10 text-primary" : ""}`}
        onClick={() => {
          setActiveTab("users");
          onItemClick?.();
        }}
      >
        <Users className="h-4 w-4" /> User Management
      </Button>
      <Button 
        variant={activeTab === "alerts" ? "secondary" : "ghost"} 
        className={`justify-start gap-3 ${activeTab === "alerts" ? "bg-primary/10 text-primary" : ""}`}
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
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">AD</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Adekunle O.</p>
              <p className="text-[10px] uppercase text-muted-foreground truncate">Master Admin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const triggerRandomNotification = () => {
      const randomHospital = HOSPITALS[Math.floor(Math.random() * HOSPITALS.length)];
      const randomGender = Math.random() > 0.5 ? "Male" : "Female";
      
      toast({
        title: "New Birth Registration",
        description: `A ${randomGender} child was just registered at ${randomHospital.name} (${randomHospital.zone} Zone).`,
      });
    };

    const intervalId = setInterval(triggerRandomNotification, 15000 + Math.random() * 10000);
    return () => clearInterval(intervalId);
  }, [toast]);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:flex flex-col p-6 overflow-y-auto">
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-border bg-card/50 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
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
                  onItemClick={() => setIsMobileMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet>
            <div className="hidden sm:flex items-center gap-4 w-full">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records, states, or IDs..." className="border-none bg-transparent h-10 px-0 focus-visible:ring-0" />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background" />
            </Button>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-headline font-bold">OBRMS National Dashboard</h1>
                  <p className="text-muted-foreground text-sm lg:text-base">Comprehensive real-time birthrate monitoring for Nigeria.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20">LIVE</Badge>
                  <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <RealTimeBirthHistogram />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                  { label: "Total Births (YTD)", value: "1,248,932", icon: TrendingUp, color: "text-primary", trend: "+12.4%" },
                  { label: "Active Facilities", value: "14,281", icon: Activity, color: "text-accent", trend: "98.2%" },
                  { label: "Certificates Issued", value: "892,122", icon: Baby, color: "text-accent", trend: "71% verified" },
                  { label: "Today's Forecast", value: "~1,150", icon: ShieldCheck, color: "text-primary", trend: "Stable" },
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-headline">Birth Volume by State</CardTitle>
                    <CardDescription>Top states reporting births in the current quarter.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] lg:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#6b7280" fontSize={12} />
                        <YAxis axisLine={false} tickLine={false} stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                          itemStyle={{ color: 'hsl(var(--primary))' }}
                        />
                        <Bar dataKey="births" radius={[4, 4, 0, 0]}>
                          {stateData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline">Monthly Trend</CardTitle>
                    <CardDescription>Aggregate national trends.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] lg:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#6b7280" fontSize={12} />
                        <YAxis axisLine={false} tickLine={false} stroke="#6b7280" fontSize={12} hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                          itemStyle={{ color: 'hsl(var(--primary))' }}
                        />
                        <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="overflow-x-auto">
                <CardHeader>
                  <CardTitle className="font-headline">Recent OBRMS Submissions</CardTitle>
                  <CardDescription>Drill-down view of the latest verified birth records.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Facility Name</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead>Record ID</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="text-right">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSubmissions.map((sub, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{sub.facility}</TableCell>
                          <TableCell className="hidden md:table-cell">{sub.location}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{sub.id}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="bg-primary/20 text-primary border-none">Verified</Badge>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground text-xs">{sub.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "registration" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <RegistrationForm />
            </div>
          )}

          {activeTab === "states" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold">State Distribution</h1>
                  <p className="text-muted-foreground">Detailed demographic performance by Federation units.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Download Report</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stateData.map((state, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="font-headline">{state.name}</CardTitle>
                        <Badge variant="secondary">{state.growth > 0 ? `+${state.growth}%` : `${state.growth}%`}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-4xl font-headline font-bold">{state.births.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Registrations</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(state.births / 5000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold">User Management</h1>
                  <p className="text-muted-foreground">Manage administrative and field personnel access.</p>
                </div>
                <Button className="gap-2"><UserPlus className="h-4 w-4" /> Add New User</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden md:table-cell">Email Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-bold">{user.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-primary/20 text-primary">{user.role}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={cn("h-2 w-2 rounded-full", user.status === "Active" ? "bg-accent" : "bg-orange-400")} />
                              <span className="text-sm">{user.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold">System Alerts</h1>
                  <p className="text-muted-foreground">Monitor system health and security integrity.</p>
                </div>
                <Button variant="outline" size="sm">Mark all as Read</Button>
              </div>

              <div className="grid gap-4">
                {mockAlerts.map((alert, i) => (
                  <Card key={i} className={cn(
                    "border-l-4",
                    alert.severity === "high" ? "border-l-destructive" : 
                    alert.severity === "medium" ? "border-l-orange-400" : "border-l-accent"
                  )}>
                    <CardHeader className="flex flex-row items-center gap-4 py-4">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        alert.severity === "high" ? "bg-destructive/10 text-destructive" : 
                        alert.severity === "medium" ? "bg-orange-100 text-orange-600" : "bg-accent/10 text-accent"
                      )}>
                        {alert.severity === "high" ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-bold">{alert.type} Notification</CardTitle>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <CardDescription className="text-foreground">{alert.message}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">Dismiss</Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
