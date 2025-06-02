import { describe, it, expect, vi } from 'vitest';
import { 
  filterVacancies, 
  countVacanciesByCategory, 
  countVacanciesByCity,
  updateCategoriesWithVacancyCounts,
  updateCitiesWithVacancyCounts
} from './filters';
import type { Vacancy, JobCategory, City } from '../types';

// Mock logger to avoid console output during tests
vi.mock('./logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('filters', () => {
  const mockVacancies: Vacancy[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      category: { 
        id: 1, 
        name: 'IT',
        description: 'IT jobs',
        vacanciesCount: 0,
        popularSkills: ['JavaScript', 'TypeScript', 'React'],
        averageSalary: '15000 PLN'
      },
      city: { 
        id: 1, 
        name: 'Warsaw',
        coordinates: { lat: 52.2297, lng: 21.0122 },
        vacanciesCount: 0,
        vacancies: []
      },
      company: 'Tech Corp',
      salary: '10000 PLN',
      employmentType: 'full-time',
      description: 'Frontend developer position',
      responsibilities: ['Develop UI', 'Write tests'],
      requirements: ['React', 'TypeScript'],
      benefits: ['Remote work', 'Health insurance'],
      experience: '3+ years',
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Backend Developer',
      category: { 
        id: 1, 
        name: 'IT',
        description: 'IT jobs',
        vacanciesCount: 0,
        popularSkills: ['JavaScript', 'TypeScript', 'React'],
        averageSalary: '15000 PLN'
      },
      city: { 
        id: 2, 
        name: 'Krakow',
        coordinates: { lat: 50.0647, lng: 19.9450 },
        vacanciesCount: 0,
        vacancies: []
      },
      company: 'Tech Corp',
      salary: '12000 PLN',
      employmentType: 'full-time',
      description: 'Backend developer position',
      responsibilities: ['Develop API', 'Write tests'],
      requirements: ['Node.js', 'TypeScript'],
      benefits: ['Remote work', 'Health insurance'],
      experience: '3+ years',
      createdAt: new Date()
    },
  ];

  const mockCategories: JobCategory[] = [
    { 
      id: 1, 
      name: 'IT', 
      description: 'IT jobs',
      vacanciesCount: 0,
      popularSkills: ['JavaScript', 'TypeScript', 'React'],
      averageSalary: '15000 PLN'
    },
    { 
      id: 2, 
      name: 'Marketing', 
      description: 'Marketing jobs',
      vacanciesCount: 0,
      popularSkills: ['SEO', 'Social Media', 'Content Creation'],
      averageSalary: '12000 PLN'
    },
  ];

  const mockCities: City[] = [
    { 
      id: 1, 
      name: 'Warsaw', 
      coordinates: { lat: 52.2297, lng: 21.0122 },
      vacanciesCount: 0,
      vacancies: []
    },
    { 
      id: 2, 
      name: 'Krakow', 
      coordinates: { lat: 50.0647, lng: 19.9450 },
      vacanciesCount: 0,
      vacancies: []
    },
  ];

  describe('filterVacancies', () => {
    const mockVacancy: Vacancy = {
      id: 1,
      title: 'Test Vacancy',
      description: 'Test Description',
      salary: '1000',
      experience: '1-3 years',
      employmentType: 'Full-time',
      company: 'Test Company',
      createdAt: new Date(),
      category: {
        id: 1,
        name: 'Test Category',
        vacanciesCount: 1,
        description: 'Test Description',
        popularSkills: ['Test Skill'],
        averageSalary: '1000'
      },
      city: {
        id: 1,
        name: 'Test City',
        coordinates: {
          lat: 0,
          lng: 0
        }
      },
      location: {
        address: 'Test Address',
        coordinates: {
          lat: 0,
          lng: 0
        }
      }
    };

    it('should return all vacancies when no filters are provided', () => {
      const result = filterVacancies([mockVacancy]);
      expect(result).toEqual([mockVacancy]);
    });

    it('should filter by category', () => {
      const result = filterVacancies([mockVacancy], 1);
      expect(result).toEqual([mockVacancy]);
    });

    it('should filter by city', () => {
      const result = filterVacancies([mockVacancy], null, 1);
      expect(result).toEqual([mockVacancy]);
    });

    it('should filter by both category and city', () => {
      const result = filterVacancies([mockVacancy], 1, 1);
      expect(result).toEqual([mockVacancy]);
    });

    it('should return empty array when no vacancies match filters', () => {
      const result = filterVacancies([mockVacancy], 2);
      expect(result).toEqual([]);
    });
  });

  describe('countVacanciesByCategory', () => {
    it('should count vacancies by category', () => {
      const count = countVacanciesByCategory(mockVacancies, 1);
      expect(count).toBe(2);
    });

    it('should return 0 for non-existent category', () => {
      const count = countVacanciesByCategory(mockVacancies, 999);
      expect(count).toBe(0);
    });

    it('should handle invalid input', () => {
      const count = countVacanciesByCategory(undefined as unknown as Vacancy[], 1);
      expect(count).toBe(0);
    });
  });

  describe('countVacanciesByCity', () => {
    it('should count vacancies by city', () => {
      const count = countVacanciesByCity(mockVacancies, 1);
      expect(count).toBe(1);
    });

    it('should return 0 for non-existent city', () => {
      const count = countVacanciesByCity(mockVacancies, 999);
      expect(count).toBe(0);
    });

    it('should handle invalid input', () => {
      const count = countVacanciesByCity(undefined as unknown as Vacancy[], 1);
      expect(count).toBe(0);
    });
  });

  describe('updateCategoriesWithVacancyCounts', () => {
    it('should update categories with vacancy counts', () => {
      const result = updateCategoriesWithVacancyCounts(mockCategories, mockVacancies);
      expect(result).toHaveLength(2);
      expect(result[0].vacanciesCount).toBe(2);
      expect(result[1].vacanciesCount).toBe(0);
    });

    it('should handle invalid input', () => {
      const result = updateCategoriesWithVacancyCounts(undefined as unknown as JobCategory[], mockVacancies);
      expect(result).toEqual([]);
    });
  });

  describe('updateCitiesWithVacancyCounts', () => {
    it('should update cities with vacancy counts', () => {
      const result = updateCitiesWithVacancyCounts(mockCities, mockVacancies);
      expect(result).toHaveLength(2);
      expect(result[0].vacanciesCount).toBe(1);
      expect(result[1].vacanciesCount).toBe(1);
      expect(result[0].vacancies).toHaveLength(1);
      expect(result[1].vacancies).toHaveLength(1);
    });

    it('should handle invalid input', () => {
      const result = updateCitiesWithVacancyCounts(undefined as unknown as City[], mockVacancies);
      expect(result).toEqual([]);
    });
  });
}); 