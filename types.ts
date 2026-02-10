
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TENANT = 'TENANT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  occupancy: number;
  revenue: number;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  type: 'STUDIO' | '1BR' | '2BR' | '3BR' | 'COMMERCIAL';
  rentAmount: number;
  status: 'VACANT' | 'OCCUPIED' | 'MAINTENANCE';
}

export interface Lease {
  id: string;
  tenantId: string;
  unitId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
}

export interface Invoice {
  id: string;
  tenantId: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  description: string;
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  type: 'MPESA' | 'PESALINK' | 'CARD' | 'WALLET';
  lastFour?: string;
  isDefault: boolean;
}
