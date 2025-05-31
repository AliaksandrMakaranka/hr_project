import type { Vacancy } from './vacancy';

export interface City {
  id: number;
  name: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  vacanciesCount?: number;
  vacancies?: Vacancy[];
} 