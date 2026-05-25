
"use client";

import React from 'react';
import { ShieldCheck, Baby } from 'lucide-react';
import Image from 'next/image';

interface BirthCertificateProps {
  data: {
    childName: string;
    dob: string;
    gender: string;
    placeOfBirth: string;
    motherName: string;
    fatherName: string;
    regId: string;
    dateRegistered: string;
  };
}

export const BirthCertificateDocument = ({ data }: BirthCertificateProps) => {
  return (
    <div className="bg-white text-black p-8 md:p-12 border-[10px] border-double border-primary/20 relative overflow-hidden font-serif max-w-4xl mx-auto printable-certificate">
      {/* Background Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <div className="relative h-[400px] w-[400px]">
           <Image src="/logo.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-10 space-y-6 md:space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b-2 border-primary/10 pb-6">
          <div className="relative h-16 w-16 md:h-20 md:w-20">
            <Image src="/ng.png" alt="Nigeria Seal" fill className="object-contain" />
          </div>
          <div className="text-center flex-1 px-4">
            <h1 className="text-lg md:text-2xl font-bold uppercase tracking-widest text-primary">Federal Republic of Nigeria</h1>
            <h2 className="text-md md:text-xl font-bold uppercase text-primary/80">National Population Commission</h2>
            <h3 className="text-sm md:text-lg font-medium italic mt-1 md:mt-2">Official Certificate of Birth</h3>
          </div>
          <div className="relative h-16 w-16 md:h-20 md:w-20">
            <Image src="/logo.png" alt="OBRMS Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 py-4 md:py-8">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Full Name of Child</label>
            <p className="text-lg md:text-xl font-bold border-b border-dashed border-gray-300 pb-1">{data.childName}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Registration ID</label>
            <p className="text-lg md:text-xl font-mono font-bold text-primary border-b border-dashed border-gray-300 pb-1">{data.regId}</p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Date of Birth</label>
            <p className="text-md md:text-lg font-bold border-b border-dashed border-gray-300 pb-1">{data.dob}</p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Gender</label>
            <p className="text-md md:text-lg font-bold border-b border-dashed border-gray-300 pb-1 uppercase">{data.gender}</p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Place of Birth (Medical Facility)</label>
            <p className="text-md md:text-lg font-bold border-b border-dashed border-gray-300 pb-1">{data.placeOfBirth}</p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Name of Mother</label>
            <p className="text-md md:text-lg font-bold border-b border-dashed border-gray-300 pb-1">{data.motherName}</p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Name of Father</label>
            <p className="text-md md:text-lg font-bold border-b border-dashed border-gray-300 pb-1">{data.fatherName}</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t-2 border-primary/10 mt-6 md:mt-8 gap-6 md:gap-0">
          <div className="text-center space-y-2">
            <div className="h-12 w-32 border-b border-black mx-auto"></div>
            <p className="text-[10px] font-bold uppercase">Signature of Registrar</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/5 p-3 rounded-xl border border-primary/20">
               <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <p className="text-[9px] font-bold text-center uppercase text-muted-foreground">Digital Security Hash<br />Verified By OBRMS v2.4</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Date of Registration</p>
            <p className="text-sm font-bold">{data.dateRegistered}</p>
          </div>
        </div>
      </div>
      
      {/* Decorative Seals */}
      <div className="absolute bottom-4 left-4 opacity-5 hidden md:block">
        <Baby className="h-16 w-16" />
      </div>
    </div>
  );
};
