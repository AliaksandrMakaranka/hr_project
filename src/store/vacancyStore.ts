import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { VacanciesRepository } from '../api';
import type { Vacancy, City, JobCategory, VacancyFilters } from '../types';
import type { VacancyApplicationData } from '../types/api';

interface VacancyState {
  // State
  vacancies: Vacancy[];
  selectedVacancy: Vacancy | null;
  currentCity: City | null;
  currentCategory: JobCategory | null;
  filters: VacancyFilters;
  loading: boolean;
  error: string | null;
  
  // Actions
  setCurrentCity: (city: City | null) => void;
  setCurrentCategory: (category: JobCategory | null) => void;
  setSelectedVacancy: (vacancy: Vacancy | null) => void;
  setFilters: (filters: Partial<VacancyFilters>) => void;
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

export const useVacancyStore = create<VacancyState>()(
  devtools(
    (set, get) => ({
      // Initial state
      vacancies: [],
      selectedVacancy: null,
      currentCity: null,
      currentCategory: null,
      filters: {
        city: undefined,
        category: undefined,
        employmentType: undefined,
        salaryFrom: undefined,
        salaryTo: undefined,
        searchTerm: undefined,
        sortBy: undefined,
        sortOrder: undefined,
        page: 1,
        limit: 10,
      },
      loading: false,
      error: null,
      
      // Actions
      setCurrentCity: (city) => {
        set({ currentCity: city });
        get().fetchVacancies();
      },
      
      setCurrentCategory: (category) => {
        set({ currentCategory: category });
        get().fetchVacancies();
      },
      
      setSelectedVacancy: (vacancy) => set({ selectedVacancy: vacancy }),
      
      resetSelectedVacancy: () => set({ selectedVacancy: null }),
      
      setFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters }
        }));
        get().fetchVacancies();
      },

      fetchVacancies: async () => {
        const { filters } = get();
        set({ loading: true, error: null });
        
        try {
          const repository = new VacanciesRepository();
          const response = await repository.getAll(filters);
          
          if ('error' in response && response.error) {
            set({ 
              error: response.error.message,
              loading: false 
            });
            return;
          }
          
          set({ vacancies: response.data.items, loading: false });
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
          const response = await repository.getById(id);
          
          if (!response.data) {
            set({ 
              error: 'Vacancy not found',
              loading: false,
              selectedVacancy: null
            });
            return;
          }
          
          set({ selectedVacancy: response.data, loading: false });
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
          const applicationData: VacancyApplicationData = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            coverLetter: '',
            expectedSalary: '',
            availabilityDate: new Date().toISOString()
          };
          
          await repository.apply(vacancyId, applicationData);
          set({ loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to apply for vacancy',
            loading: false 
          });
          throw error;
        }
      },
      
      // Selectors
      getFilteredVacancies: () => {
        const { vacancies, filters } = get();
        return vacancies.filter(vacancy => {
          if (filters.category && vacancy.category?.id !== parseInt(filters.category)) {
            return false;
          }
          if (filters.city && vacancy.city?.id !== parseInt(filters.city)) {
            return false;
          }
          if (filters.searchTerm && !vacancy.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
            return false;
          }
          return true;
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
        return {
          total: vacancies.length,
          byCity: vacancies.reduce((acc, vacancy) => {
            if (vacancy.city?.id) {
              acc[vacancy.city.id] = (acc[vacancy.city.id] || 0) + 1;
            }
            return acc;
          }, {} as Record<number, number>),
          byCategory: vacancies.reduce((acc, vacancy) => {
            if (vacancy.category?.id) {
              acc[vacancy.category.id] = (acc[vacancy.category.id] || 0) + 1;
            }
            return acc;
          }, {} as Record<number, number>)
        };
      }
    }),
    { name: 'vacancy-store' }
  )
); 