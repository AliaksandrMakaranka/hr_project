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
 * - employer: информация о работодателе
 * - employmentType: тип занятости
 * - experience: требуемый опыт
 * - education: требуемое образование
 * - createdAt: дата создания вакансии
 * 
 * @module vacancies
 */

import type { Vacancy } from '../../types';
import { cities } from '../cities';
import { jobCategories } from '../categories';

export const vacancies: Vacancy[] = [
  // Строительство
  {
    id: 1,
    title: 'Каменщик',
    company: 'BUDOWLANKA Sp. z o.o.',
    salary: '5500-7500 PLN',
    city: cities[0], // Варшава
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    description: 'Ищем опытного каменщика для работы на крупных строительных объектах в Варшаве. Работа с современными материалами, стабильная занятость.',
    responsibilities: [
      'Кладка кирпича и блоков',
      'Работа с раствором',
      'Чтение чертежей',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 2 лет',
      'Знание технологий кладки',
      'Умение работать с инструментом',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Возможность карьерного роста',
      'Обучение и повышение квалификации'
    ],
    employer: {
      name: 'BUDOWLANKA Sp. z o.o.',
      email: 'hr@budowlanka.pl',
      phone: '+48 123 456 789',
      website: 'www.budowlanka.pl'
    },
    employmentType: 'full-time',
    experience: 'от 2 лет',
    education: 'Среднее специальное',
    createdAt: '2024-03-15'
  },
  {
    id: 2,
    title: 'Отделочник',
    company: 'REMONTY POLSKA',
    salary: '5000-7000 PLN',
    city: cities[1], // Краков
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    description: 'Требуется отделочник для работы в Кракове. Работа с современными материалами, дружный коллектив.',
    responsibilities: [
      'Выполнение отделочных работ',
      'Подготовка поверхностей',
      'Работа с различными материалами',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 1 года',
      'Знание технологий отделки',
      'Умение работать с инструментом',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Возможность карьерного роста',
      'Обучение'
    ],
    employer: {
      name: 'REMONTY POLSKA',
      email: 'kariera@remonty.pl',
      phone: '+48 987 654 321',
      website: 'www.remonty.pl'
    },
    employmentType: 'full-time',
    experience: 'от 1 года',
    education: 'Среднее специальное',
    createdAt: '2024-03-14'
  },
  // Общественное питание
  {
    id: 3,
    title: 'Повар',
    company: 'RESTAURACJA POLSKA',
    salary: '4000-6000 PLN',
    city: cities[1], // Краков
    category: jobCategories.find(c => c.id === 2)!, // Общественное питание
    description: 'Требуется повар в ресторан польской кухни в центре Кракова. Работа в дружном коллективе, возможность творчества.',
    responsibilities: [
      'Приготовление блюд польской кухни',
      'Поддержание чистоты на рабочем месте',
      'Контроль качества блюд',
      'Работа с меню'
    ],
    requirements: [
      'Опыт работы поваром от 1 года',
      'Знание польской кухни',
      'Умение работать в команде',
      'Знание польского языка на базовом уровне'
    ],
    benefits: [
      'График работы 5/2',
      'Бесплатное питание',
      'Возможность карьерного роста',
      'Официальное трудоустройство'
    ],
    employer: {
      name: 'RESTAURACJA POLSKA',
      email: 'kariera@restauracja.pl',
      phone: '+48 987 654 321',
      website: 'www.restauracja.pl'
    },
    employmentType: 'full-time',
    experience: 'от 1 года',
    education: 'Среднее специальное',
    createdAt: '2024-03-14'
  },
  {
    id: 4,
    title: 'Официант',
    company: 'HOTEL KRAKOW',
    salary: '3500-4500 PLN',
    city: cities[1], // Краков
    category: jobCategories.find(c => c.id === 2)!, // Общественное питание
    description: 'Ищем официанта в отель в центре Кракова. Работа с международными гостями, возможность карьерного роста.',
    responsibilities: [
      'Обслуживание гостей',
      'Работа с кассой',
      'Поддержание чистоты',
      'Знание меню'
    ],
    requirements: [
      'Опыт работы от 6 месяцев',
      'Знание английского языка',
      'Умение работать в команде',
      'Приятная внешность'
    ],
    benefits: [
      'График работы 5/2',
      'Бесплатное питание',
      'Возможность карьерного роста',
      'Официальное трудоустройство'
    ],
    employer: {
      name: 'HOTEL KRAKOW',
      email: 'hr@hotelkrakow.pl',
      phone: '+48 123 789 456',
      website: 'www.hotelkrakow.pl'
    },
    employmentType: 'full-time',
    experience: 'от 6 месяцев',
    education: 'Среднее',
    createdAt: '2024-03-13'
  },
  // Логистика
  {
    id: 5,
    title: 'Водитель категории C',
    company: 'TRANSPORT POLSKA',
    salary: '4500-6500 PLN',
    city: cities[2], // Вроцлав
    category: jobCategories.find(c => c.id === 3)!, // Логистика
    description: 'Требуется водитель категории C для международных перевозок. Стабильная работа, хорошие условия.',
    responsibilities: [
      'Международные перевозки',
      'Погрузка/разгрузка',
      'Ведение документации',
      'Уход за автомобилем'
    ],
    requirements: [
      'Категория C',
      'Опыт работы от 1 года',
      'Знание ПДД',
      'Знание польского языка на базовом уровне'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Возможность карьерного роста',
      'Обучение'
    ],
    employer: {
      name: 'TRANSPORT POLSKA',
      email: 'hr@transport.pl',
      phone: '+48 123 456 789',
      website: 'www.transport.pl'
    },
    employmentType: 'full-time',
    experience: 'от 1 года',
    education: 'Среднее',
    createdAt: '2024-03-13'
  },
  {
    id: 6,
    title: 'Курьер',
    company: 'DOSTAWA EXPRESS',
    salary: '4000-5000 PLN',
    city: cities[3], // Познань
    category: jobCategories.find(c => c.id === 3)!, // Логистика
    description: 'Ищем курьера для доставки посылок по городу. Работа на своем автомобиле, гибкий график.',
    responsibilities: [
      'Доставка посылок',
      'Работа с документами',
      'Общение с клиентами',
      'Планирование маршрута'
    ],
    requirements: [
      'Личный автомобиль',
      'Опыт работы от 6 месяцев',
      'Знание города',
      'Знание польского языка'
    ],
    benefits: [
      'Гибкий график',
      'Официальное трудоустройство',
      'Бонусы за доставку',
      'Страховка'
    ],
    employer: {
      name: 'DOSTAWA EXPRESS',
      email: 'hr@dostawa.pl',
      phone: '+48 789 123 456',
      website: 'www.dostawa.pl'
    },
    employmentType: 'full-time',
    experience: 'от 6 месяцев',
    education: 'Среднее',
    createdAt: '2024-03-11'
  },
  // Продажи
  {
    id: 7,
    title: 'Продавец-консультант',
    company: 'SKLEP MODA',
    salary: '3500-4500 PLN',
    city: cities[4], // Гданьск
    category: jobCategories.find(c => c.id === 4)!, // Продажи
    description: 'Требуется продавец-консультант в магазин одежды. Работа с клиентами, дружный коллектив.',
    responsibilities: [
      'Обслуживание клиентов',
      'Работа с кассой',
      'Выкладка товара',
      'Консультации по товару'
    ],
    requirements: [
      'Опыт работы от 6 месяцев',
      'Знание польского языка',
      'Умение работать в команде',
      'Приятная внешность'
    ],
    benefits: [
      'График работы 5/2',
      'Скидки на товары',
      'Возможность карьерного роста',
      'Официальное трудоустройство'
    ],
    employer: {
      name: 'SKLEP MODA',
      email: 'kariera@sklepmoda.pl',
      phone: '+48 321 654 987',
      website: 'www.sklepmoda.pl'
    },
    employmentType: 'full-time',
    experience: 'от 6 месяцев',
    education: 'Среднее',
    createdAt: '2024-03-10'
  },
  // Производство
  {
    id: 8,
    title: 'Оператор станков с ЧПУ',
    company: 'FABRYKA POLSKA',
    salary: '4000-5500 PLN',
    city: cities[5], // Лодзь
    category: jobCategories.find(c => c.id === 5)!, // Производство
    description: 'Ищем оператора станков с ЧПУ. Работа на современном оборудовании, обучение.',
    responsibilities: [
      'Работа на станках с ЧПУ',
      'Контроль качества',
      'Ведение документации',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 1 года',
      'Знание программ ЧПУ',
      'Умение читать чертежи',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Обучение',
      'Возможность карьерного роста'
    ],
    employer: {
      name: 'FABRYKA POLSKA',
      email: 'hr@fabryka.pl',
      phone: '+48 654 321 987',
      website: 'www.fabryka.pl'
    },
    employmentType: 'full-time',
    experience: 'от 1 года',
    education: 'Среднее специальное',
    createdAt: '2024-03-09'
  },
  // Дополнительные вакансии в Варшаве
  {
    id: 9,
    title: 'Сварщик',
    company: 'METAL POLSKA',
    salary: '5000-7000 PLN',
    city: cities[0], // Варшава
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    description: 'Требуется сварщик для работы на строительных объектах в Варшаве. Работа с современным оборудованием.',
    responsibilities: [
      'Выполнение сварочных работ',
      'Чтение чертежей',
      'Контроль качества',
      'Соблюдение техники безопасности'
    ],
    requirements: [
      'Опыт работы от 2 лет',
      'Удостоверение сварщика',
      'Знание технологий сварки',
      'Базовое знание польского языка'
    ],
    benefits: [
      'Стабильная работа',
      'Официальное трудоустройство',
      'Обучение',
      'Возможность карьерного роста'
    ],
    employer: {
      name: 'METAL POLSKA',
      email: 'hr@metal.pl',
      phone: '+48 987 321 654',
      website: 'www.metal.pl'
    },
    employmentType: 'full-time',
    experience: 'от 2 лет',
    education: 'Среднее специальное',
    createdAt: '2024-03-08'
  },
  // Дополнительные вакансии в Кракове
  {
    id: 10,
    title: 'Бариста',
    company: 'CAFE KRAKOW',
    salary: '3500-4500 PLN',
    city: cities[1], // Краков
    category: jobCategories.find(c => c.id === 2)!, // Общественное питание
    description: 'Ищем баристу в кофейню в центре Кракова. Работа в дружной команде, возможность творчества.',
    responsibilities: [
      'Приготовление кофе',
      'Обслуживание гостей',
      'Работа с кассой',
      'Поддержание чистоты'
    ],
    requirements: [
      'Опыт работы от 6 месяцев',
      'Знание кофе',
      'Умение работать в команде',
      'Знание польского языка'
    ],
    benefits: [
      'График работы 5/2',
      'Бесплатные напитки',
      'Возможность карьерного роста',
      'Официальное трудоустройство'
    ],
    employer: {
      name: 'CAFE KRAKOW',
      email: 'kariera@cafekrakow.pl',
      phone: '+48 321 987 654',
      website: 'www.cafekrakow.pl'
    },
    employmentType: 'full-time',
    experience: 'от 6 месяцев',
    education: 'Среднее',
    createdAt: '2024-03-07'
  }
]; 