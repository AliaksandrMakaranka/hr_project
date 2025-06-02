/**
 * Данные категорий строительных профессий.
 * 
 * Каждая категория содержит:
 * - id: уникальный идентификатор
 * - name: название категории
 * - description: описание категории
 * - vacanciesCount: количество вакансий
 * - icon: эмодзи-иконка категории
 * - popularSkills: список популярных навыков
 * - averageSalary: средняя зарплата
 * 
 * @module categories
 */

import type { JobCategory } from '../../types';

const jobCategories: JobCategory[] = [
  {
    id: 1,
    name: 'Общестроительные работы',
    description: 'Различные виды общестроительных работ, включая работу с деревом, бетоном, арматурой и монтажные работы.',
    vacanciesCount: 45,
    icon: '🪚',
    popularSkills: ['Работа с деревом', 'Чтение чертежей', 'Столярные работы', 'Монтаж опалубки'],
    averageSalary: '5000-7000 PLN'
  },
  {
    id: 2,
    name: 'Каменщики',
    description: 'Кладка кирпича, блоков и других строительных материалов',
    vacanciesCount: 38,
    icon: '🧱',
    popularSkills: ['Кирпичная кладка', 'Работа с растворами', 'Чтение чертежей', 'Отделка фасадов'],
    averageSalary: '5500-7500 PLN'
  },
  {
    id: 3,
    name: 'Сварщики',
    description: 'Сварка металлических конструкций и элементов',
    vacanciesCount: 42,
    icon: '⚡',
    popularSkills: ['Сварка МИГ/МАГ', 'Сварка TIG', 'Чтение чертежей', 'Контроль качества'],
    averageSalary: '6000-8000 PLN'
  },
  {
    id: 4,
    name: 'Электрики',
    description: 'Монтаж и обслуживание электрических систем',
    vacanciesCount: 35,
    icon: '⚡',
    popularSkills: ['Монтаж электропроводки', 'Подключение оборудования', 'Диагностика неисправностей'],
    averageSalary: '5500-7500 PLN'
  },
  {
    id: 5,
    name: 'Отделочники',
    description: 'Внутренняя и внешняя отделка помещений',
    vacanciesCount: 52,
    icon: '🎨',
    popularSkills: ['Штукатурка', 'Плиточные работы', 'Малярные работы', 'Гипсокартон'],
    averageSalary: '5000-7000 PLN'
  },
  {
    id: 6,
    name: 'Подсобные рабочие',
    description: 'Вспомогательные работы на строительной площадке',
    vacanciesCount: 65,
    icon: '👷',
    popularSkills: ['Разгрузка материалов', 'Подготовка рабочего места', 'Уборка территории'],
    averageSalary: '4000-5500 PLN'
  },
  {
    id: 7,
    name: 'Кровельщики',
    description: 'Монтаж и ремонт кровельных систем',
    vacanciesCount: 28,
    icon: '🏠',
    popularSkills: ['Монтаж кровли', 'Гидроизоляция', 'Работа на высоте', 'Металлочерепица'],
    averageSalary: '5500-7500 PLN'
  },
  {
    id: 8,
    name: 'Сантехники',
    description: 'Монтаж и обслуживание сантехнических систем',
    vacanciesCount: 32,
    icon: '🔧',
    popularSkills: ['Монтаж труб', 'Подключение сантехники', 'Устранение протечек'],
    averageSalary: '5000-7000 PLN'
  },
  {
    id: 9,
    name: 'Монолитные работы',
    description: 'Работы по устройству монолитных конструкций',
    vacanciesCount: 30,
    icon: '🏗️',
    popularSkills: ['Бетонные работы', 'Арматурные работы', 'Опалубочные работы', 'Контроль качества'],
    averageSalary: '5500-7500 PLN'
  },
  {
    id: 10,
    name: 'Инженерные специальности',
    description: 'Проектные, управляющие и технические должности в строительстве.',
    vacanciesCount: 0, // Will be updated based on vacancies
    icon: '🏗️', // Or a more suitable icon
    popularSkills: ['Управление проектами', 'Проектирование', 'Технический надзор', 'BIM'],
    averageSalary: '7000-10000+ PLN'
  }
];

export { jobCategories }; 