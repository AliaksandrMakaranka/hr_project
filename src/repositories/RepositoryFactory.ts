import { BaseRepository } from './BaseRepository';
import { VacanciesRepository } from './VacanciesRepository';
import { CitiesRepository } from './CitiesRepository';
import { CategoriesRepository } from './CategoriesRepository';
import { BaseApiClient } from '../api/base/ApiClient';
import { Logger } from '../utils/Logger';

export class RepositoryFactory {
  private static instance: RepositoryFactory;
  private readonly repositories: Map<string, BaseRepository<any>>;

  private constructor(
    private readonly apiClient: BaseApiClient,
    private readonly logger: Logger
  ) {
    this.repositories = new Map();
  }

  public static getInstance(apiClient: BaseApiClient, logger: Logger): RepositoryFactory {
    if (!RepositoryFactory.instance) {
      RepositoryFactory.instance = new RepositoryFactory(apiClient, logger);
    }
    return RepositoryFactory.instance;
  }

  public getVacanciesRepository(): VacanciesRepository {
    if (!this.repositories.has('vacancies')) {
      this.repositories.set(
        'vacancies',
        new VacanciesRepository(this.apiClient, this.logger)
      );
    }
    return this.repositories.get('vacancies') as VacanciesRepository;
  }

  public getCitiesRepository(): CitiesRepository {
    if (!this.repositories.has('cities')) {
      this.repositories.set(
        'cities',
        new CitiesRepository(this.apiClient, this.logger)
      );
    }
    return this.repositories.get('cities') as CitiesRepository;
  }

  public getCategoriesRepository(): CategoriesRepository {
    if (!this.repositories.has('categories')) {
      this.repositories.set(
        'categories',
        new CategoriesRepository(this.apiClient, this.logger)
      );
    }
    return this.repositories.get('categories') as CategoriesRepository;
  }
} 