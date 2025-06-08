import { City } from '../types';
import { BaseRepository } from './BaseRepository';

export class CitiesRepository extends BaseRepository<City> {
    constructor() {
        super('/cities');
    }

    async getAll(): Promise<City[]> {
        return this.get<City[]>('');
    }

    async getById(id: number): Promise<City> {
        return this.get<City>(`/${id}`);
    }
} 