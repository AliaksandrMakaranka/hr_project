import type { City } from './city';
import type { JobCategory } from './jobCategory';

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  salary: string;
  description: string;
  experience: string;
  employmentType: string;
  city?: City;
  category?: JobCategory;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  location?: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact?: {
    email?: string;
    phone?: string;
  };
  workingHours?: {
    from: string;
    to: string;
    days?: string[];
  };
} 