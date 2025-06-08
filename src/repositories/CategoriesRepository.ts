import { JobCategory } from '../types';
import { BaseRepository } from './BaseRepository';

export class CategoriesRepository extends BaseRepository<JobCategory> {
    constructor() {
        super('/categories');
    }

    async getAll(): Promise<JobCategory[]> {
        return this.get<JobCategory[]>('');
    }

    async getById(id: number): Promise<JobCategory> {
        return this.get<JobCategory>(`/${id}`);
    }
} 