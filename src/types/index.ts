export interface City {
  id: number;
  name: string;
  vacanciesCount: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface JobCategory {
  id: number;
  name: string;
  vacanciesCount: number;
  description: string;
  icon?: string;
  popularSkills: string[];
  averageSalary: string;
  subcategories?: {
    id: number;
    name: string;
    vacanciesCount: number;
  }[];
}

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