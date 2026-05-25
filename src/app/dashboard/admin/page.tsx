"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell
} from 'recharts';
import { Download, Filter, Map, Users, TrendingUp, Bell, Search, Activity, Baby, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RegistrationForm } from "@/components/dashboard/registration-form";
import { RealTimeBirthHistogram } from "@/components/dashboard/real-time-birth-histogram";

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:flex flex-col p-6 gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center">
            <Activity className="text-background h-5 w-5" />
          </div>
          <span className="text-xl font-headline font-bold text-primary tracking-tight">OBRMS</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Button 
            variant={activeTab === "overview" ? "secondary" : "ghost"} 
            className={`justify-start gap-3 ${activeTab === "overview" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <TrendingUp className="h-4 w-4" /> National Analytics
          </Button>
          <Button 
            variant={activeTab === "registration" ? "secondary" : "ghost"} 
            className={`justify-start gap-3 ${activeTab === "registration" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("registration")}
          >
            <PlusCircle className="h-4 w-4" /> New Registration
          </Button>
          <Button variant="ghost" className="justify-start gap-3">
            <Map className="h-4 w-4" /> State Breakdown
          </Button>
          <Button variant="ghost" className="justify-start gap-3">
            <Users className="h-4 w-4" /> User Management
          </Button>
          <Button variant="ghost" className="justify-start gap-3">
            <Bell className="h-4 w-4" /> System Alerts
          </Button>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-border bg-card/50 px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-4 max-w-md w-full">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records, states, or IDs..." className="border-none bg-transparent h-10 px-0 focus-visible:ring-0" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export Summary
            </Button>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background" />
            </Button>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold">OBRMS National Dashboard</h1>
                  <p className="text-muted-foreground">Comprehensive real-time birthrate monitoring for Nigeria.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20">LIVE: Reporting active</Badge>
                  <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
                </div>
              </div>

              {/* Real-time Histogram Section */}
              <div className="grid grid-cols-1 gap-8">
                <RealTimeBirthHistogram />
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs uppercase font-bold tracking-widest text-primary">Total Births (YTD)</CardDescription>
                    <CardTitle className="text-4xl font-headline">1,248,932</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-primary">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-bold">+12.4% vs last year</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs uppercase font-bold tracking-widest text-emerald-600">Active Facilities</CardDescription>
                    <CardTitle className="text-4xl font-headline">14,281</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm font-bold">98.2% connectivity</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs uppercase font-bold tracking-widest text-emerald-600">Certificates Issued</CardDescription>
                    <CardTitle className="text-4xl font-headline">892,122</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Baby className="h-4 w-4" />
                      <span className="text-sm font-bold">71% total births verified</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-primary/20">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs uppercase font-bold tracking-widest text-primary">Today's Forecast</CardDescription>
                    <CardTitle className="text-4xl font-headline">~1,150</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-primary">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-bold">Slightly above average</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-headline">Birth Volume by State</CardTitle>
                    <CardDescription>Top 7 states reporting births in the current quarter.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
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

                {/* Side Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline">Monthly Growth Trend</CardTitle>
                    <CardDescription>National aggregate trends over the past 6 months.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
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

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Recent OBRMS Submissions</CardTitle>
                  <CardDescription>Drill-down view of the latest verified birth records.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Facility Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSubmissions.map((sub, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{sub.facility}</TableCell>
                          <TableCell>{sub.location}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{sub.id}</TableCell>
                          <TableCell>
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
        </div>
      </main>
    </div>
  );
}
