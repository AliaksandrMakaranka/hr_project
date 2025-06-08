import { makeAutoObservable } from 'mobx';
import { VacanciesRepository } from '../api/vacancies';
import { Vacancy, VacancyFilters } from '../types/vacancy';
import { ErrorHandler } from '../utils/ErrorHandler';

interface VacancyState {
  items: Vacancy[];
  total: number;
  loading: boolean;
  error: string | null;
  filters: VacancyFilters;
}

export class VacancyStore {
  private errorHandler: ErrorHandler;
  public repository: VacanciesRepository;
  state: VacancyState;

  constructor() {
    makeAutoObservable(this);
    this.errorHandler = ErrorHandler.getInstance();
    this.repository = new VacanciesRepository();
    this.state = {
      items: [],
      total: 0,
      loading: false,
      error: null,
      filters: {}
    };
  }

  setFilters(filters: Partial<VacancyFilters>) {
    this.state.filters = { ...this.state.filters, ...filters };
  }

  async fetchVacancies() {
    this.state.loading = true;
    this.state.error = null;
    try {
      const response = await this.repository.getAll(this.state.filters);
      if (!response.items || response.items.length === 0) {
        this.state.items = [];
        this.state.total = 0;
        return;
      }
      this.state.items = response.items;
      this.state.total = response.total;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch vacancies';
      this.state.error = errorMessage;
      this.state.items = [];
      this.state.total = 0;
      this.errorHandler.handleError(error);
    } finally {
      this.state.loading = false;
    }
  }

  // async createVacancy(data: Partial<Vacancy>) {
  //   this.state.loading = true;
  //   this.state.error = null;
  //   try {
  //     const vacancy = await this.repository.create(data); // Assuming create method exists in mock repo
  //     this.state.items = [...this.state.items, vacancy];
  //     this.state.total += 1;
  //     return vacancy;
  //   } catch (error) {
  //     this.state.error = error instanceof Error ? error.message : 'Failed to create vacancy';
  //     this.errorHandler.handleError(error);
  //     throw error;
  //   } finally {
  //     this.state.loading = false;
  //   }
  // }

  // async updateVacancy(id: number, data: Partial<Vacancy>) {
  //   this.state.loading = true;
  //   this.state.error = null;
  //   try {
  //     const vacancy = await this.repository.update(id, data); // Assuming update method exists in mock repo
  //     this.state.items = this.state.items.map(item =>
  //       item.id === id ? vacancy : item
  //     );
  //     return vacancy;
  //   } catch (error) {
  //     this.state.error = error instanceof Error ? error.message : 'Failed to update vacancy';
  //     this.errorHandler.handleError(error);
  //     throw error;
  //   } finally {
  //     this.state.loading = false;
  //   }
  // }

  // async deleteVacancy(id: number) {
  //   this.state.loading = true;
  //   this.state.error = null;
  //   try {
  //     await this.repository.delete(id); // Assuming delete method exists in mock repo
  //     this.state.items = this.state.items.filter(item => item.id !== id);
  //     this.state.total -= 1;
  //   } catch (error) {
  //     this.state.error = error instanceof Error ? error.message : 'Failed to delete vacancy';
  //     this.errorHandler.handleError(error);
  //     throw error;
  //   } finally {
  //     this.state.loading = false;
  //   }
  // }

  async applyForVacancy(vacancyId: number) {
    this.state.loading = true;
    this.state.error = null;
    try {
      // В моковом репозитории метод `apply` ожидает VacancyApplicationData, 
      // но для имитации можно передать пустой объект, если логика заполнения данных
      // отклика не реализована на фронте.
      await this.repository.apply(vacancyId, { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to apply for vacancy';
      this.errorHandler.handleError(error);
      throw error;
    } finally {
      this.state.loading = false;
    }
  }
} 