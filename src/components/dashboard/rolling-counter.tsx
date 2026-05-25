
"use client";

import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface RollingCounterProps {
  value: number;
  className?: string;
  minDigits?: number;
}

const RollingDigit = ({ digit }: { digit: string }) => {
  const num = parseInt(digit);
  return (
    <div className="odometer-digit relative w-[0.6em]">
      <div 
        className="odometer-digit-inner"
        style={{ transform: `translateY(-${num * 10}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="flex h-full items-center justify-center">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
};

export const RollingCounter = ({ value, className, minDigits = 6 }: RollingCounterProps) => {
  // Use minimumIntegerDigits to ensure padding if specified
  const formattedValue = value.toLocaleString('en-US', { 
    useGrouping: false, 
    minimumIntegerDigits: minDigits 
  });
  const digits = formattedValue.split('');

  return (
    <div className={cn("flex font-headline font-bold items-center justify-center", className)}>
      {digits.map((digit, i) => (
        <React.Fragment key={i}>
          <RollingDigit digit={digit} />
          { (digits.length - i - 1) % 3 === 0 && i !== digits.length - 1 && (
            <span className="mx-0.5">,</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
