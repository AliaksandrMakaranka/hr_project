import { create } from 'zustand';
import { VacanciesRepository } from '../api';
import type { Vacancy, City, JobCategory } from '../types';

interface VacancyState {
  // State
  vacancies: Vacancy[];
  selectedVacancy: Vacancy | null;
  currentCity: City | null;
  currentCategory: JobCategory | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setCurrentCity: (city: City | null) => void;
  setCurrentCategory: (category: JobCategory | null) => void;
  setSelectedVacancy: (vacancy: Vacancy | null) => void;
  fetchVacancies: () => Promise<void>;
  fetchVacancyById: (id: number) => Promise<void>;
  applyForVacancy: (vacancyId: number) => Promise<void>;
  resetSelectedVacancy: () => void;
  
  // Selectors
  getFilteredVacancies: () => Vacancy[];
  getVacancyById: (id: number) => Vacancy | undefined;
  getVacanciesByCity: (cityId: number) => Vacancy[];
  getVacanciesByCategory: (categoryId: number) => Vacancy[];
  getVacancyStats: () => {
    total: number;
    byCity: Record<number, number>;
    byCategory: Record<number, number>;
  };
}

export const useVacancyStore = create<VacancyState>((set, get) => ({
  // Initial state
  vacancies: [],
  selectedVacancy: null,
  currentCity: null,
  currentCategory: null,
  loading: false,
  error: null,
  
  // Actions
  setCurrentCity: (city) => {
    set({ currentCity: city });
    // Automatically refetch vacancies when city changes
    get().fetchVacancies();
  },
  
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
    // Automatically refetch vacancies when category changes
    get().fetchVacancies();
  },
  
  setSelectedVacancy: (vacancy) => set({ selectedVacancy: vacancy }),
  
  resetSelectedVacancy: () => set({ selectedVacancy: null }),
  
  fetchVacancies: async () => {
    const { currentCity, currentCategory } = get();
    set({ loading: true, error: null });
    
    try {
      const repository = new VacanciesRepository();
      const vacancies = await repository.getAll();
      
      // Apply filters based on current city and category
      const filteredVacancies = vacancies.filter(vacancy => {
        const cityMatch = !currentCity || vacancy.city?.id === currentCity.id;
        const categoryMatch = !currentCategory || vacancy.category?.id === currentCategory.id;
        return cityMatch && categoryMatch;
      });
      
      set({ vacancies: filteredVacancies, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vacancies',
        loading: false 
      });
    }
  },
  
  fetchVacancyById: async (id: number) => {
    set({ loading: true, error: null });
    
    try {
      const repository = new VacanciesRepository();
      const vacancy = await repository.getById(id);
      
      if (!vacancy) {
        set({ 
          error: 'Vacancy not found',
          loading: false,
          selectedVacancy: null
        });
        return;
      }
      
      set({ selectedVacancy: vacancy, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vacancy',
        loading: false,
        selectedVacancy: null
      });
    }
  },
  
  applyForVacancy: async (vacancyId: number) => {
    set({ loading: true, error: null });
    
    try {
      const repository = new VacanciesRepository();
      await repository.apply(vacancyId, {});
      set({ loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to apply for vacancy',
        loading: false 
      });
      throw error; // Re-throw to handle in the component
    }
  },
  
  // Selectors
  getFilteredVacancies: () => {
    const { vacancies, currentCity, currentCategory } = get();
    
    return vacancies.filter(vacancy => {
      const cityMatch = !currentCity || vacancy.city?.id === currentCity.id;
      const categoryMatch = !currentCategory || vacancy.category?.id === currentCategory.id;
      return cityMatch && categoryMatch;
    });
  },
  
  getVacancyById: (id: number) => {
    return get().vacancies.find(vacancy => vacancy.id === id);
  },
  
  getVacanciesByCity: (cityId: number) => {
    return get().vacancies.filter(vacancy => vacancy.city?.id === cityId);
  },
  
  getVacanciesByCategory: (categoryId: number) => {
    return get().vacancies.filter(vacancy => vacancy.category?.id === categoryId);
  },
  
  getVacancyStats: () => {
    const { vacancies } = get();
    const stats = {
      total: vacancies.length,
      byCity: {} as Record<number, number>,
      byCategory: {} as Record<number, number>
    };
    
    vacancies.forEach(vacancy => {
      if (vacancy.city?.id) {
        stats.byCity[vacancy.city.id] = (stats.byCity[vacancy.city.id] || 0) + 1;
      }
      if (vacancy.category?.id) {
        stats.byCategory[vacancy.category.id] = (stats.byCategory[vacancy.category.id] || 0) + 1;
      }
    });
    
    return stats;
  }
})); 