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
    <div className="bg-white text-black p-4 md:p-12 border-[6px] md:border-[10px] border-double border-primary/20 relative overflow-hidden font-serif max-w-4xl mx-auto printable-certificate shadow-2xl">
      {/* Background Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <div className="relative h-[250px] w-[250px] md:h-[400px] md:w-[400px]">
           <Image src="/logo.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-10 space-y-4 md:space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b-2 border-primary/10 pb-4 md:pb-6">
          <div className="relative h-12 w-12 md:h-20 md:w-20 shrink-0">
            <Image src="/ng.png" alt="Nigeria Seal" fill className="object-contain" />
          </div>
          <div className="text-center flex-1 px-2 md:px-4">
            <h1 className="text-xs md:text-2xl font-bold uppercase tracking-widest text-primary leading-tight">Federal Republic of Nigeria</h1>
            <h2 className="text-[10px] md:text-xl font-bold uppercase text-primary/80">National Population Commission</h2>
            <h3 className="text-[8px] md:text-lg font-medium italic mt-0.5 md:mt-2">Official Certificate of Birth</h3>
          </div>
          <div className="relative h-12 w-12 md:h-20 md:w-20 shrink-0">
            <Image src="/logo.png" alt="OBRMS Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-6 gap-x-12 py-2 md:py-8">
          <div className="space-y-0.5 md:space-y-1">
            <label className="text-[8px] md:text-[10px] font-bold uppercase text-muted-foreground">Full Name of Child</label>
            <p className="text-sm md:text-xl font-bold border-b border-dashed border-gray-300 pb-0.5 md:pb-1 truncate">{data.childName}</p>
          </div>
          
          <div className="space-y-0.5 md:space-y-1">
            <label className="text-[8px] md:text-[10px] font-bold uppercase text-muted-foreground">Registration ID</label>
            <p className="text-sm md:text-xl font-mono font-bold text-primary border-b border-dashed border-gray-300 pb-0.5 md:pb-1">{data.regId}</p>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            <label className="text-[8px] md:text-[10px] font-bold uppercase text-muted-foreground">Date of Birth</label>
            <p className="text-sm md:text-lg font-bold border-b border-dashed border-gray-300 pb-0.5 md:pb-1">{data.dob}</p>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            <label className="text-[8px] md:text-[10px] font-bold uppercase text-muted-foreground">Gender</label>
            <p className="text-sm md:text-lg font-bold border-b border-dashed border-gray-300 pb-0.5 md:pb-1 uppercase">{data.gender}</p>
          </div>

          <div className="space-y-0.5 md:space-y-1 md:col-span-2">
            <label className="text-[8px] md:text-[10px] font-bold uppercase text-muted-foreground">Place of Birth (Medical Facility)</label>
            <p className="text-sm md:text-lg font-bold border-b border-dashed border-gray-300 pb-0.5 md:pb-1">{data.placeOfBirth}</p>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            <label className="text-[8px] md:text-[10px] font-bold uppercase text-muted-foreground">Name of Mother</label>
            <p className="text-sm md:text-lg font-bold border-b border-dashed border-gray-300 pb-0.5 md:pb-1">{data.motherName}</p>
          </div>

          <div className="space-y-0.5 md:space-y-1">
            <label className="text-[8px] md:text-[10px] font-bold uppercase text-muted-foreground">Name of Father</label>
            <p className="text-sm md:text-lg font-bold border-b border-dashed border-gray-300 pb-0.5 md:pb-1">{data.fatherName}</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-4 md:pt-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t-2 border-primary/10 mt-2 md:mt-8 gap-4 md:gap-0">
          <div className="text-center space-y-1 md:space-y-2">
            <div className="h-8 md:h-12 w-24 md:w-32 border-b border-black mx-auto"></div>
            <p className="text-[8px] md:text-[10px] font-bold uppercase">Signature of Registrar</p>
          </div>
          
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <div className="bg-primary/5 p-1.5 md:p-3 rounded-lg md:rounded-xl border border-primary/20">
               <ShieldCheck className="h-5 w-5 md:h-8 md:w-8 text-primary" />
            </div>
            <p className="text-[7px] md:text-[9px] font-bold text-center uppercase text-muted-foreground">Digital Security Hash<br />Verified By OBRMS v2.4</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase">Date of Registration</p>
            <p className="text-xs md:text-sm font-bold">{data.dateRegistered}</p>
          </div>
        </div>
      </div>
      
      {/* Decorative Seals */}
      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 opacity-5 hidden sm:block">
        <Baby className="h-10 w-10 md:h-16 md:w-16" />
      </div>
    </div>
  );
};
