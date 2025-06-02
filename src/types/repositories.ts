import type { Vacancy } from './vacancy';
import type { City } from './city';
import type { JobCategory } from './jobCategory';

export interface IVacancyRepository {
  getAll(): Promise<Vacancy[]>;
  getById(id: number): Promise<Vacancy | null>;
  getByCategory(categoryId: number): Promise<Vacancy[]>;
  getByCity(cityId: number): Promise<Vacancy[]>;
  search(query: string): Promise<Vacancy[]>;
  create(vacancy: Omit<Vacancy, 'id'>): Promise<Vacancy>;
  update(id: number, vacancy: Partial<Vacancy>): Promise<Vacancy>;
  delete(id: number): Promise<boolean>;
  getActive(): Promise<Vacancy[]>;
  getByFilters(filters: {
    categoryId?: number;
    cityId?: number;
    searchQuery?: string;
    employmentType?: string;
    experience?: string;
  }): Promise<Vacancy[]>;
}

export interface ICityRepository {
  getAll(): Promise<City[]>;
  getById(id: number): Promise<City | null>;
  getByName(name: string): Promise<City | null>;
  create(city: Omit<City, 'id'>): Promise<City>;
  update(id: number, city: Partial<City>): Promise<City>;
  delete(id: number): Promise<boolean>;
  getWithVacancyCounts(): Promise<(City & { vacanciesCount: number })[]>;
  getPopularCities(limit?: number): Promise<City[]>;
}

export interface ICategoryRepository {
  getAll(): Promise<JobCategory[]>;
  getById(id: number): Promise<JobCategory | null>;
  getBySlug(slug: string): Promise<JobCategory | null>;
  create(category: Omit<JobCategory, 'id'>): Promise<JobCategory>;
  update(id: number, category: Partial<JobCategory>): Promise<JobCategory>;
  delete(id: number): Promise<boolean>;
  getWithVacancyCounts(): Promise<(JobCategory & { vacanciesCount: number })[]>;
  getPopularCategories(limit?: number): Promise<JobCategory[]>;
  getSubcategories(parentId: number): Promise<JobCategory[]>;
} 