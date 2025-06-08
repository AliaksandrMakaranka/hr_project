import type { City } from './city';
import type { JobCategory } from './jobCategory';

export interface VacancyFilters {
  cityId?: number;
  categoryId?: number;
  salaryFrom?: number;
  salaryTo?: number;
  employmentType?: string;
  experience?: string;
  searchTerm?: string;
  sortBy?: 'date' | 'salary';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  tags?: string[];
  isActive?: boolean;
}

export interface VacancyLocation {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface VacancyContact {
  email?: string;
  phone?: string;
}

export interface VacancyWorkingHours {
  from: string;
  to: string;
  days?: string[];
}

export interface Vacancy {
  id: number;
  title: string;
  company: string;
  salary: string;
  salaryPerHour?: number;
  currency?: string;
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
  location?: VacancyLocation;
  contact?: VacancyContact;
  workingHours?: VacancyWorkingHours;
}

// Type guards
export function isVacancy(obj: unknown): obj is Vacancy {
  if (!obj || typeof obj !== 'object') return false;

  const vacancy = obj as Vacancy;
  return (
    typeof vacancy.id === 'number' &&
    typeof vacancy.title === 'string' &&
    typeof vacancy.company === 'string' &&
    typeof vacancy.salary === 'string' &&
    typeof vacancy.description === 'string' &&
    typeof vacancy.experience === 'string' &&
    typeof vacancy.employmentType === 'string'
  );
}

export function isVacancyLocation(obj: unknown): obj is VacancyLocation {
  if (!obj || typeof obj !== 'object') return false;

  const location = obj as VacancyLocation;
  return (
    typeof location.address === 'string' &&
    typeof location.coordinates === 'object' &&
    typeof location.coordinates.lat === 'number' &&
    typeof location.coordinates.lng === 'number'
  );
}

export function isVacancyContact(obj: unknown): obj is VacancyContact {
  if (!obj || typeof obj !== 'object') return false;

  const contact = obj as VacancyContact;
  return (
    (!contact.email || typeof contact.email === 'string') &&
    (!contact.phone || typeof contact.phone === 'string')
  );
}

export function isVacancyWorkingHours(obj: unknown): obj is VacancyWorkingHours {
  if (!obj || typeof obj !== 'object') return false;

  const hours = obj as VacancyWorkingHours;
  return (
    typeof hours.from === 'string' &&
    typeof hours.to === 'string' &&
    (!hours.days || Array.isArray(hours.days))
  );
} 