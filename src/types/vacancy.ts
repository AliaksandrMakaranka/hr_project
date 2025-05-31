import type { City } from './city';
import type { JobCategory } from './jobCategory';

export interface Vacancy {
  id: number;
  title: string;
  company: string;
  salary: string;
  city: City;
  category: JobCategory;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  employer: {
    name: string;
    email: string;
    phone: string;
    website?: string;
  };
  employmentType: 'full-time' | 'part-time' | 'contract';
  experience: string;
  education: string;
  createdAt: string;
} 