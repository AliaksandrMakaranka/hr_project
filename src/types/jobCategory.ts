export interface JobCategory {
  id: number;
  name: string;
  title?: string;
  slug?: string;
  vacanciesCount: number;
  description: string;
  icon?: string;
  popularSkills: string[];
  averageSalary: string;
  subcategories?: {
    id: number;
    name: string;
    vacanciesCount: number;
  }[];
} 