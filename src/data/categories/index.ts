/**
 * Данные категорий профессий.
 * 
 * Каждая категория содержит:
 * - id: уникальный идентификатор
 * - name: название категории
 * - description: описание категории
 * - vacanciesCount: количество вакансий
 * - icon: эмодзи-иконка категории
 * - popularSkills: список популярных навыков
 * - averageSalary: средняя зарплата
 * - subcategories: подкатегории с количеством вакансий
 * 
 * @module categories
 */

import type { JobCategory } from '../../types';

export const jobCategories: JobCategory[] = [
  {
    id: 1,
    name: 'Строительство',
    description: 'Работа в строительной отрасли: от отделочных работ до управления проектами',
    vacanciesCount: 245,
    icon: '🏗️',
    popularSkills: ['Отделочные работы', 'Штукатурка', 'Плитка', 'Малярные работы', 'Строительные инструменты'],
    averageSalary: '5000-7000 PLN',
    subcategories: [
      { id: 101, name: 'Отделочные работы', vacanciesCount: 120 },
      { id: 102, name: 'Строительные работы', vacanciesCount: 85 },
      { id: 103, name: 'Сантехника', vacanciesCount: 40 }
    ]
  },
  {
    id: 2,
    name: 'Общественное питание',
    description: 'Работа в ресторанах, кафе и отелях Польши',
    vacanciesCount: 189,
    icon: '🍽️',
    popularSkills: ['Приготовление блюд', 'Обслуживание гостей', 'Знание польской кухни', 'Работа с кассой'],
    averageSalary: '4000-6000 PLN',
    subcategories: [
      { id: 201, name: 'Повара', vacanciesCount: 95 },
      { id: 202, name: 'Официанты', vacanciesCount: 65 },
      { id: 203, name: 'Бариста', vacanciesCount: 29 }
    ]
  },
  {
    id: 3,
    name: 'Логистика',
    description: 'Работа в сфере транспорта и логистики',
    vacanciesCount: 156,
    icon: '🚚',
    popularSkills: ['Вождение', 'Знание ПДД', 'Работа с документами', 'Погрузка/разгрузка'],
    averageSalary: '4500-6500 PLN',
    subcategories: [
      { id: 301, name: 'Водители', vacanciesCount: 90 },
      { id: 302, name: 'Курьеры', vacanciesCount: 45 },
      { id: 303, name: 'Складские работники', vacanciesCount: 21 }
    ]
  },
  {
    id: 4,
    name: 'Продажи',
    description: 'Работа в сфере розничной торговли и продаж',
    vacanciesCount: 132,
    icon: '🛍️',
    popularSkills: ['Общение с клиентами', 'Работа с кассой', 'Выкладка товара', 'Знание польского языка'],
    averageSalary: '3500-5000 PLN',
    subcategories: [
      { id: 401, name: 'Продавцы', vacanciesCount: 75 },
      { id: 402, name: 'Консультанты', vacanciesCount: 35 },
      { id: 403, name: 'Кассиры', vacanciesCount: 22 }
    ]
  },
  {
    id: 5,
    name: 'Производство',
    description: 'Работа на производственных предприятиях',
    vacanciesCount: 98,
    icon: '🏭',
    popularSkills: ['Работа на станках', 'Контроль качества', 'Сборка', 'Упаковка'],
    averageSalary: '4000-5500 PLN',
    subcategories: [
      { id: 501, name: 'Операторы станков', vacanciesCount: 45 },
      { id: 502, name: 'Сборщики', vacanciesCount: 35 },
      { id: 503, name: 'Контролеры качества', vacanciesCount: 18 }
    ]
  }
]; 