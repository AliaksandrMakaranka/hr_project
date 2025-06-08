import { Vacancy } from '../types';
import { VacancyFilters } from '../types/api';
import { BaseRepository } from './BaseRepository';

export class VacanciesRepository extends BaseRepository<Vacancy> {
    constructor() {
        super('/vacancies');
    }

    async getVacancies(filters?: VacancyFilters): Promise<Vacancy[]> {
        const queryParams = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });
        }
        const queryString = queryParams.toString();
        return this.get<Vacancy[]>(queryString ? `?${queryString}` : '');
    }

    async getVacancyById(id: number): Promise<Vacancy> {
        return this.get<Vacancy>(`/${id}`);
    }

    async createVacancy(data: Partial<Vacancy>): Promise<Vacancy> {
        return this.post<Vacancy>('', data);
    }

    async updateVacancy(id: number, data: Partial<Vacancy>): Promise<Vacancy> {
        return this.put<Vacancy>(`/${id}`, data);
    }

    async deleteVacancy(id: number): Promise<void> {
        return this.delete<void>(`/${id}`);
    }

    async applyForVacancy(vacancyId: number): Promise<void> {
        return this.post<void>(`/${vacancyId}/apply`, {});
    }
} 