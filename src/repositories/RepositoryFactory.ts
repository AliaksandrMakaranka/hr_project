import { CategoriesRepository } from './CategoriesRepository';
import { CitiesRepository } from './CitiesRepository';
import { VacanciesRepository } from './VacanciesRepository';

export class RepositoryFactory {
  private static instance: RepositoryFactory;
  private categoriesRepository: CategoriesRepository;
  private citiesRepository: CitiesRepository;
  private vacanciesRepository: VacanciesRepository;

  private constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.citiesRepository = new CitiesRepository();
    this.vacanciesRepository = new VacanciesRepository();
  }

  public static getInstance(): RepositoryFactory {
    if (!RepositoryFactory.instance) {
      RepositoryFactory.instance = new RepositoryFactory();
    }
    return RepositoryFactory.instance;
  }

  public getCategoriesRepository(): CategoriesRepository {
    return this.categoriesRepository;
  }

  public getCitiesRepository(): CitiesRepository {
    return this.citiesRepository;
  }

  public getVacanciesRepository(): VacanciesRepository {
    return this.vacanciesRepository;
  }
} 