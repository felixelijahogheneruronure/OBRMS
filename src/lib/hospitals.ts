
export type HospitalZone = 'Western' | 'Eastern' | 'Central' | 'Northern';

export interface Hospital {
  name: string;
  address: string;
  zone: HospitalZone;
}

export const HOSPITALS: Hospital[] = [
  { 
    name: "Agbor General Hospital", 
    address: "Agbor-Abavo Road, Agbor, Delta State", 
    zone: "Central" 
  }
];
