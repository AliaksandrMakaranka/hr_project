/**
 * Данные вакансий.
 * 
 * Каждая вакансия содержит:
 * - id: уникальный идентификатор
 * - title: название должности
 * - company: название компании
 * - salary: зарплата
 * - city: город (ссылка на объект City)
 * - category: категория (ссылка на объект JobCategory)
 * - description: описание вакансии
 * - responsibilities: список обязанностей
 * - requirements: список требований
 * - benefits: список преимуществ
 * - employmentType: тип занятости
 * - experience: требуемый опыт
 * 
 * @module vacancies
 */

import type { JobCategory } from '../../types/jobCategory';
import { jobCategories } from '../categories/index';
import type { Vacancy } from '../../types/vacancy';
import { cities } from '../cities';

export const vacancies: Vacancy[] = [
  // Каменщики
  {
    id: 1,
    title: 'Каменщик-специалист по клинкеру',
    company: 'BUDOWLANKA Sp. z o.o.',
    location: {
      address: 'ul. Marszałkowska 1, 00-624 Warszawa',
      coordinates: {
        lat: 52.2297,
        lng: 21.0122
      }
    },
    salary: '5500-7500 PLN',
    city: cities[0], // Варшава
    category: jobCategories.find((c: JobCategory) => c.id === 2)!, // Каменщики
    description: 'Ищем опытного каменщика для работы с клинкерным кирпичом на престижных объектах в Варшаве. Работа с современными материалами, стабильная занятость.',
    responsibilities: [
      'Выполнение кладочных работ с клинкерным кирпичом',
      'Работа с различными видами кирпича и блоков',
      'Соблюдение техники безопасности',
      'Чтение и выполнение работ по чертежам'
    ],
    requirements: [
      'Опыт работы от 2 лет',
      'Знание технологии кладки клинкера',
      'Умение читать чертежи',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная зарплата',
      'Официальное трудоустройство',
      'Проживание предоставляется',
      'Медицинская страховка'
    ],
    contact: {
      email: 'anna@budowlanka.pl',
      phone: '+48 123 456 789'
    },
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: 2,
    title: 'Каменщик по пеноблокам',
    company: 'DOMBUD Sp. z o.o.',
    location: {
      address: 'ul. Krakowska 15, 31-062 Kraków',
      coordinates: {
        lat: 50.0647,
        lng: 19.9450
      }
    },
    salary: '5000-6500 PLN',
    city: cities[1], // Краков
    category: jobCategories.find((c: JobCategory) => c.id === 2)!, // Каменщики
    description: 'Требуется каменщик для работы с пеноблоками на строительстве жилых домов в Кракове.',
    responsibilities: [
      'Кладка стен из пеноблоков',
      'Подготовка раствора',
      'Соблюдение техники безопасности',
      'Работа с измерительными инструментами'
    ],
    requirements: [
      'Опыт работы от 1 года',
      'Знание технологии кладки пеноблоков',
      'Умение работать с инструментом',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Возможность карьерного роста',
      'Обучение'
    ],
    employmentType: 'full-time',
    experience: 'от 1 года'
  },
  // Сварщики
  {
    id: 3,
    title: 'Сварщик МИГ/МАГ',
    company: 'METALPOL Sp. z o.o.',
    location: {
      address: 'ul. Przemysłowa 5, 50-311 Wrocław',
      coordinates: {
        lat: 51.1079,
        lng: 17.0385
      }
    },
    salary: '6000-8000 PLN',
    city: cities[2], // Вроцлав
    category: jobCategories.find((c: JobCategory) => c.id === 3)!, // Сварщики
    description: 'Ищем опытного сварщика МИГ/МАГ для работы на производстве металлоконструкций.',
    responsibilities: [
      'Сварка металлоконструкций',
      'Контроль качества сварных швов',
      'Работа с чертежами',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 2 лет',
      'Удостоверение сварщика МИГ/МАГ',
      'Знание технологии сварки',
      'Умение читать чертежи'
    ],
    benefits: [
      'Высокая зарплата',
      'Официальное трудоустройство',
      'Медицинская страховка',
      'Возможность карьерного роста'
    ],
    employmentType: 'full-time',
    experience: 'от 2 лет'
  },
  {
    id: 4,
    title: 'Сварщик TIG',
    company: 'PRECISION WELDING Sp. z o.o.',
    location: {
      address: 'ul. Techniczna 10, 61-138 Poznań',
      coordinates: {
        lat: 52.4064,
        lng: 16.9252
      }
    },
    salary: '6500-8500 PLN',
    city: cities[3], // Познань
    category: jobCategories.find((c: JobCategory) => c.id === 3)!, // Сварщики
    description: 'Требуется сварщик TIG для работы с нержавеющей сталью и алюминием.',
    responsibilities: [
      'Сварка TIG нержавеющей стали и алюминия',
      'Контроль качества сварных швов',
      'Работа с чертежами',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 3 лет',
      'Удостоверение сварщика TIG',
      'Знание технологии сварки нержавеющей стали и алюминия',
      'Умение читать чертежи'
    ],
    benefits: [
      'Высокая зарплата',
      'Официальное трудоустройство',
      'Медицинская страховка',
      'Возможность карьерного роста'
    ],
    employmentType: 'full-time',
    experience: 'от 3 лет'
  },
  // Электрики
  {
    id: 5,
    title: 'Электрик-монтажник',
    company: 'ELEKTROBUD Sp. z o.o.',
    location: {
      address: 'ul. Elektryczna 8, 00-001 Warszawa',
      coordinates: {
        lat: 52.2297,
        lng: 21.0122
      }
    },
    salary: '5500-7500 PLN',
    city: cities[0], // Варшава
    category: jobCategories.find((c: JobCategory) => c.id === 4)!, // Электрики
    description: 'Ищем электрика-монтажника для работы на строительных объектах в Варшаве.',
    responsibilities: [
      'Монтаж электропроводки',
      'Подключение электрооборудования',
      'Установка щитов и автоматов',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 2 лет',
      'Удостоверение электрика',
      'Знание электромонтажных работ',
      'Умение читать схемы'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Медицинская страховка',
      'Возможность карьерного роста'
    ],
    employmentType: 'full-time',
    experience: 'от 2 лет'
  },
  // Отделочники
  {
    id: 6,
    title: 'Отделочник-плиточник',
    company: 'WYKOŃCZENIA Sp. z o.o.',
    location: {
      address: 'ul. Remontowa 12, 31-002 Kraków',
      coordinates: {
        lat: 50.0647,
        lng: 19.9450
      }
    },
    salary: '5000-7000 PLN',
    city: cities[1], // Краков
    category: jobCategories.find((c: JobCategory) => c.id === 5)!, // Отделочники
    description: 'Требуется опытный плиточник для работы на объектах в Кракове.',
    responsibilities: [
      'Укладка керамической плитки',
      'Подготовка поверхностей',
      'Работа с различными материалами',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 2 лет',
      'Знание технологий укладки плитки',
      'Умение работать с инструментом',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Возможность карьерного роста',
      'Обучение'
    ],
    employmentType: 'full-time',
    experience: 'от 2 лет'
  },
  // Подсобные рабочие
  {
    id: 7,
    title: 'Подсобный рабочий на стройке',
    company: 'BUDOWLANKA Sp. z o.o.',
    location: {
      address: 'ul. Budowlana 5, 50-001 Wrocław',
      coordinates: {
        lat: 51.1079,
        lng: 17.0385
      }
    },
    salary: '4000-5500 PLN',
    city: cities[2], // Вроцлав
    category: jobCategories.find((c: JobCategory) => c.id === 6)!, // Подсобные рабочие
    description: 'Ищем подсобного рабочего для работы на строительной площадке.',
    responsibilities: [
      'Разгрузка материалов',
      'Подготовка рабочего места',
      'Уборка территории',
      'Помощь специалистам'
    ],
    requirements: [
      'Физическая выносливость',
      'Базовое знание польского языка',
      'Умение работать в команде',
      'Ответственность'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Проживание предоставляется',
      'Медицинская страховка'
    ],
    employmentType: 'full-time',
    experience: 'без опыта'
  },
  // Кровельщики
  {
    id: 8,
    title: 'Кровельщик по металлочерепице',
    company: 'DACHBUD Sp. z o.o.',
    location: {
      address: 'ul. Dachowa 3, 61-001 Poznań',
      coordinates: {
        lat: 52.4064,
        lng: 16.9252
      }
    },
    salary: '5500-7500 PLN',
    city: cities[3], // Познань
    category: jobCategories.find((c: JobCategory) => c.id === 7)!, // Кровельщики
    description: 'Требуется кровельщик для работы с металлочерепицей.',
    responsibilities: [
      'Монтаж кровли из металлочерепицы',
      'Гидроизоляция',
      'Работа на высоте',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 1 года',
      'Знание технологии монтажа кровли',
      'Умение работать на высоте',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Медицинская страховка',
      'Возможность карьерного роста'
    ],
    employmentType: 'full-time',
    experience: 'от 1 года'
  },
  // Сантехники
  {
    id: 9,
    title: 'Сантехник-монтажник',
    company: 'HYDROBUD Sp. z o.o.',
    location: {
      address: 'ul. Wodna 7, 00-001 Warszawa',
      coordinates: {
        lat: 52.2297,
        lng: 21.0122
      }
    },
    salary: '5000-7000 PLN',
    city: cities[0], // Варшава
    category: jobCategories.find((c: JobCategory) => c.id === 8)!, // Сантехники
    description: 'Ищем сантехника-монтажника для работы на строительных объектах.',
    responsibilities: [
      'Монтаж сантехнических систем',
      'Подключение сантехники',
      'Устранение протечек',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 2 лет',
      'Знание сантехнических работ',
      'Умение читать схемы',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Медицинская страховка',
      'Возможность карьерного роста'
    ],
    employmentType: 'full-time',
    experience: 'от 2 лет'
  },
  {
    id: 10,
    title: 'Бетонщик',
    company: 'CONCRETE PRO',
    city: cities[3], // Познань
    salary: 'от 24 PLN/час',
    description: 'Ищем квалифицированных бетонщиков для работы с бетонными конструкциями. Требуется опыт работы с различными марками бетона.',
    category: jobCategories.find((c: JobCategory) => c.id === 9)!, // Монолитные работы
    tags: ['Бетон', 'Строительство', 'Познань'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: 11,
    title: 'Арматурщик',
    company: 'STEEL CONSTRUCTION',
    city: cities[4], // Гданьск
    salary: 'от 25 PLN/час',
    description: 'Требуется опытный арматурщик для работы с металлической арматурой. Необходим опыт вязки арматуры и работы с чертежами.',
    category: jobCategories.find((c: JobCategory) => c.id === 9)!, // Монолитные работы
    tags: ['Арматура', 'Строительство', 'Гданьск'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  }
]; 